import { OrderPlacedEmail } from '@/components/order-placed-email';
import { Resend } from 'resend';
import { createClient } from '@/utils/supabase/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        let { firstName, email, orderId, otp, restaurantName, totalAmount, items, userId } = body;
        
        // 1. send push notification to user and admin
        const supabase = await createClient();
        const ADMIN_ID = '28e38aaf-17fb-4eee-a619-d1c4b3df269e';
        
        const { data: devices } = await supabase
            .from('logged_in_devices')
            .select('token, user_id')
            .or(`user_id.eq.${userId},user_id.eq.${ADMIN_ID}`);

        // Fallback: Fetch items if missing (handling race condition from DB triggers)
        if (!items || items.length === 0) {
            const { data: dbItems } = await supabase
                .from('order_items')
                .select('quantity, menu_items(name, price)')
                .eq('order_id', orderId);
            
            if (dbItems) {
                items = dbItems.map((item: any) => ({
                    name: item.menu_items?.name,
                    price: item.menu_items?.price,
                    quantity: item.quantity
                }));
            }
        }

        const adminTokens = devices?.filter(d => d.user_id === ADMIN_ID).map(d => d.token).filter(Boolean) || [];
        const userTokens = devices?.filter(d => d.user_id === userId).map(d => d.token).filter(Boolean) || [];
        console.log('Admin tokens:', adminTokens);
        console.log('User tokens:', userTokens);
        const notifications = [
            ...adminTokens.map(token => ({
                to: token,
                sound: 'default',
                title: 'New Order Received! 🚨',
                body: `New order #${orderId} from ${firstName} for ₹${totalAmount}`,
                data: { orderId, screen: 'admin/orders' }
            })),
            ...userTokens.map(token => ({
                to: token,
                sound: 'default',
                title: 'Order Placed Successfully! 🎉',
                body: `Your order from ${restaurantName} has been placed. #${orderId}`,
                data: { orderId, screen: 'order-details' }
            }))
        ];

        if (notifications.length > 0) {
            await fetch('https://exp.host/--/api/v2/push/send', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Accept-encoding': 'gzip, deflate',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(notifications),
            });
        }

        console.log(`Sent ${notifications.length} push notifications`);
        
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
