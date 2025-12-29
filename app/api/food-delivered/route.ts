import { FoodDeliveredEmail } from '@/components/food-delivered-email';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { firstName, email, orderId } = body;

        const { data, error } = await resend.emails.send({
            from: 'Yumzio <onboarding@resend.dev>', // Update with your verified domain in production
            to: [email],
            subject: `Delivered! Enjoy your meal from Yumzio`,
            react: FoodDeliveredEmail({ 
                firstName, 
                orderId 
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
