import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
    Link,
} from "@react-email/components";
import * as React from "react";

interface FoodDeliveredEmailProps {
    firstName: string;
    orderId: string;
}

export const FoodDeliveredEmail = ({
    firstName,
    orderId,
}: FoodDeliveredEmailProps) => (
    <Html>
        <Head />
        <Preview>Your Yumzio order #{orderId} has been delivered!</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={header}>
                    <Heading style={logo}>
                        Yum<span style={{ color: "#FF5200" }}>zio</span>
                    </Heading>
                </Section>

                <Section style={content}>
                    <Heading style={h1}>Delivered! 😋</Heading>
                    <Text style={text}>
                        Hi {firstName}, hope you're ready to eat! Your order <strong>#{orderId}</strong> has been successfully delivered.
                    </Text>

                    <Section style={feedbackSection}>
                        <Heading style={h2}>How was your meal?</Heading>
                        <Text style={subText}>Your feedback helps us and the restaurant improve.</Text>
                        <Section style={buttonContainer}>
                            <Button style={button} href={`https://yumzio.in/review/${orderId}`}>
                                Rate Your Experience
                            </Button>
                        </Section>
                    </Section>

                    <Text style={text}>
                        If you have any issues with your order, please reach out to our support team immediately.
                    </Text>

                    <Hr style={hr} />

                    <Text style={footerText}>
                        Enjoy your meal! <br />
                        <strong>Team Yumzio</strong>
                    </Text>
                </Section>

                <Section style={footer}>
                    <Text style={attribution}>
                        Made with ❤️ By <Link href="https://trivyaa.in" style={link}>Trivyaa</Link>
                    </Text>
                    <Text style={subFooter}>
                        Serving Happiness in Narsinghpur & Cuttack
                    </Text>
                </Section>
            </Container>
        </Body>
    </Html>
);

export default FoodDeliveredEmail;

const main = {
    backgroundColor: "#f9f9f9",
    fontFamily: '"Outfit", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
    margin: "0 auto",
    padding: "40px 20px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    maxWidth: "580px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
};

const header = {
    padding: "20px 0",
    textAlign: "center" as const,
};

const logo = {
    fontSize: "32px",
    fontWeight: "800",
    color: "#2B1E16",
    margin: "0",
    letterSpacing: "-1px",
};

const content = {
    padding: "20px 0",
};

const h1 = {
    color: "#2B1E16",
    fontSize: "24px",
    fontWeight: "700",
    textAlign: "center" as const,
    margin: "30px 0",
};

const h2 = {
    color: "#2B1E16",
    fontSize: "20px",
    fontWeight: "700",
    textAlign: "center" as const,
    margin: "0 0 10px 0",
};

const text = {
    color: "#525f7f",
    fontSize: "16px",
    lineHeight: "26px",
    textAlign: "center" as const,
};

const subText = {
    color: "#8898aa",
    fontSize: "14px",
    textAlign: "center" as const,
    margin: "0 0 20px 0",
};

const feedbackSection = {
    backgroundColor: "#f9f9f9",
    borderRadius: "16px",
    padding: "30px",
    margin: "30px 0",
    textAlign: "center" as const,
};

const buttonContainer = {
    textAlign: "center" as const,
    margin: "20px 0",
};

const button = {
    backgroundColor: "#FF5200",
    borderRadius: "12px",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    textDecoration: "none",
    textAlign: "center" as const,
    display: "inline-block",
    padding: "16px 32px",
    boxShadow: "0 4px 14px 0 rgba(255, 82, 0, 0.39)",
};

const hr = {
    borderColor: "#e6ebf1",
    margin: "40px 0",
};

const footerText = {
    color: "#8898aa",
    fontSize: "14px",
    lineHeight: "24px",
    textAlign: "center" as const,
};

const footer = {
    padding: "30px 0",
    textAlign: "center" as const,
};

const attribution = {
    fontSize: "12px",
    color: "#8898aa",
    margin: "0",
};

const subFooter = {
    fontSize: "12px",
    color: "#cbd5e0",
    margin: "5px 0 0 0",
};

const link = {
    color: "#FF5200",
    textDecoration: "underline",
    fontWeight: "600",
};
