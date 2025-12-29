import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
    Link,
} from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
    firstName: string;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "";

export const EmailTemplate = ({ firstName }: EmailTemplateProps) => (
    <Html>
        <Head />
        <Preview>Welcome to Yumzio – Taste Happiness in Your City!</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={header}>
                    <Heading style={logo}>
                        Yum<span style={{ color: "#FF5200" }}>zio</span>
                    </Heading>
                </Section>

                <Section style={content}>
                    <Heading style={h1}>Welcome aboard, {firstName}! 👋</Heading>
                    <Text style={text}>
                        We're thrilled to have you join the Yumzio family. Your favorite flavors from across Narsinghpur & Cuttack are now just a few taps away.
                    </Text>

                    <Section style={promoContent}>
                        <Text style={promoText}>
                            Enjoy <span style={bold}>50% OFF</span> on your first order!
                        </Text>
                        <Text style={codeText}>Use Code: <span style={code}>WELCOME50</span></Text>
                    </Section>

                    <Section style={buttonContainer}>
                        <Button style={button} href="https://yumzio.in">
                            Order Your First Meal
                        </Button>
                    </Section>

                    <Text style={text}>
                        From spicy biryanis and rolls to hot pizzas and street food, explore the best of local restaurants delivered fast and fresh.
                    </Text>

                    <Hr style={hr} />

                    <Text style={footerText}>
                        Stay hungry, <br />
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

export default EmailTemplate;

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

const text = {
    color: "#525f7f",
    fontSize: "16px",
    lineHeight: "26px",
    textAlign: "center" as const,
};

const promoContent = {
    backgroundColor: "#FFF5F0",
    borderRadius: "16px",
    padding: "30px",
    margin: "30px 0",
    textAlign: "center" as const,
    border: "1px dashed #FF5200",
};

const promoText = {
    fontSize: "18px",
    color: "#2B1E16",
    margin: "0 0 10px 0",
};

const codeText = {
    fontSize: "14px",
    color: "#525f7f",
    margin: "0",
};

const code = {
    backgroundColor: "#FF5200",
    color: "#ffffff",
    padding: "4px 10px",
    borderRadius: "6px",
    fontWeight: "700",
    fontSize: "16px",
};

const bold = {
    fontWeight: "700",
    color: "#FF5200",
};

const buttonContainer = {
    textAlign: "center" as const,
    margin: "30px 0",
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
