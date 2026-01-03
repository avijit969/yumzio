import { OrderPlacedEmail } from '@/components/order-placed-email';
import { Resend } from 'resend';
import { createClient } from '@/utils/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { orderId } = body;

        if (!orderId) {
            return Response.json({ error: 'Missing orderId' }, { status: 400 });
        }
        console.log('Order ID:', orderId);
        const supabase = await createClient();
        const ADMIN_ID = '28e38aaf-17fb-4eee-a619-d1c4b3df269e';

        // 1. Fetch Order Details
        const { data: order, error: orderError } = await supabase
            .from('orders')
            .select('user_id, restaurant_id, total_amount, otp')
            .eq('id', orderId)
            .single();
            console.log('Order:', order);
            console.log('Order Error:', orderError);
        if (orderError || !order) {
            return Response.json({ error: 'Order not found' }, { status: 404 });
        }

        let { user_id: userId, restaurant_id: restaurantId, total_amount: totalAmount, otp } = order as any;

        if (!otp) {
            otp = Math.floor(100000 + Math.random() * 900000).toString();
            await supabase
                .from('orders')
                .update({ otp } as any)
                .eq('id', orderId);
            console.log('Generated new OTP:', otp);
        }

        // 2. Fetch User Details
        const { data: user } = await supabase
            .from('users')
            .select('full_name, email')
            .eq('id', userId)
            .single();
            console.log('User:', user);

        const firstName = user?.full_name?.split(' ')[0] || 'Customer';
        const email = user?.email || '';

        // 3. Fetch Restaurant Details
        const { data: restaurant } = await supabase
            .from('restaurants')
            .select('name')
            .eq('id', restaurantId)
            .single();

        const restaurantName = restaurant?.name || 'Yumzio Restaurant';

        // 4. Fetch Order Items
        const { data: dbItems } = await supabase
            .from('order_items')
            .select('quantity, menu_items(name, price)')
            .eq('order_id', orderId);

        const items: string[] = dbItems?.map((item: any) => 
            `${item.quantity} x ${item.menu_items?.name} (₹${item.menu_items?.price})`
        ) || [];
        
        // 5. Fetch Push Tokens
        const { data: devices } = await supabase
            .from('logged_in_devices')
            .select('token, user_id')
            .or(`user_id.eq.${userId},user_id.eq.${ADMIN_ID}`);

        const adminTokens = devices?.filter(d => d.user_id === ADMIN_ID).map(d => d.token).filter(Boolean) || [];
        const userTokens = devices?.filter(d => d.user_id === userId).map(d => d.token).filter(Boolean) || [];
        console.log('Admin tokens:', adminTokens);
        console.log('User tokens:', userTokens);
        const adminNotifications = adminTokens.map(token => ({
            to: token,
            sound: 'default',
            title: 'New Order Received! 🚨',
            body: `New order #${orderId} from ${firstName} for ₹${totalAmount}`,
            data: { orderId, screen: 'admin/orders' }
        }));

        const userNotifications = userTokens.map(token => ({
            to: token,
            sound: 'default',
            title: 'Order Placed Successfully! 🎉',
            body: `Your order from ${restaurantName} has been placed. #${orderId}`,
            data: { orderId, screen: 'order-details' }
        }));

        const sendPush = async (batch: any[]) => {
             if (batch.length === 0) return;
             const response = await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(batch),
            });
            const responseData = await response.json();
            console.log('Push notification response:', responseData);
             if (!response.ok) {
                 console.error('Expo Push Error Details:', JSON.stringify(responseData, null, 2));
            }
        };

        await Promise.all([
            sendPush(adminNotifications),
            sendPush(userNotifications)
        ]);

        console.log(`Sent ${adminNotifications.length + userNotifications.length} push notifications`);
        
        // 2. send email to user
        const { data, error } = await resend.emails.send({
            from: 'Yumzio <zumzio@trivyaa.in>', // Update with your verified domain in production
            to: [email],
            subject: `Order Confirmed - #${orderId}`,
            react: OrderPlacedEmail({ 
                firstName, 
                orderId, 
                otp, 
                restaurantName, 
                totalAmount, 
                items 
            }),
        });
        
        if (error) {
            return Response.json({ error }, { status: 500 });
        }
        
        return Response.json(data);
    } catch (error) {
        return Response.json({ error: (error as Error).message }, { status: 500 });
    }
}
