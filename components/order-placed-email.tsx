import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
    Link,
    Row,
    Column,
} from "@react-email/components";
import * as React from "react";

interface OrderPlacedEmailProps {
    firstName: string;
    orderId: string;
    otp: string;
    restaurantName: string;
    totalAmount: string;
    items: string[];
}

export const OrderPlacedEmail = ({
    firstName,
    orderId,
    otp,
    restaurantName,
    totalAmount,
    items,
}: OrderPlacedEmailProps) => (
    <Html>
        <Head />
        <Preview>Order Confirmed! Your OTP is {otp}</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={header}>
                    <Heading style={logo}>
                        Yum<span style={{ color: "#FF5200" }}>zio</span>
                    </Heading>
                </Section>

                <Section style={content}>
                    <Heading style={h1}>Order Placed! 🚀</Heading>
                    <Text style={text}>
                        Hi {firstName}, your order from <strong>{restaurantName}</strong> has been received and is being prepared.
                    </Text>

                    <Section style={otpSection}>
                        <Text style={otpTitle}>Delivery Confirmation OTP</Text>
                        <Heading style={otpValue}>{otp}</Heading>
                        <Text style={otpSub}>Please share this OTP with the delivery partner only at the time of delivery.</Text>
                    </Section>

                    <Section style={detailsSection}>
                        <Text style={sectionTitle}>Order Details</Text>
                        <Text style={detailText}><strong>Order ID:</strong> #{orderId}</Text>
                        <Hr style={smallHr} />
                        {items.map((item, index) => (
                            <Row key={index} style={itemRow}>
                                <Column>
                                    <Text style={itemText}>{item}</Text>
                                </Column>
                            </Row>
                        ))}
                        <Hr style={smallHr} />
                        <Row>
                            <Column>
                                <Text style={totalLabel}>Total Amount Paid</Text>
                            </Column>
                            <Column align="right">
                                <Text style={totalValue}>{totalAmount}</Text>
                            </Column>
                        </Row>
                    </Section>

                    <Text style={infoText}>
                        Our delivery partner will reach you shortly. You can track your order in the Yumzio app.
                    </Text>

                    <Hr style={hr} />

                    <Text style={footerText}>
                        Thanks for choosing Yumzio! <br />
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

export default OrderPlacedEmail;

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

const otpSection = {
    backgroundColor: "#FFF5F0",
    borderRadius: "16px",
    padding: "30px",
    margin: "30px 0",
    textAlign: "center" as const,
    border: "2px solid #FF5200",
};

const otpTitle = {
    fontSize: "14px",
    color: "#FF5200",
    fontWeight: "700",
    textTransform: "uppercase" as const,
    letterSpacing: "1px",
    margin: "0 0 10px 0",
};

const otpValue = {
    fontSize: "42px",
    color: "#2B1E16",
    fontWeight: "800",
    margin: "0",
    letterSpacing: "4px",
};

const otpSub = {
    fontSize: "13px",
    color: "#8898aa",
    margin: "15px 0 0 0",
};

const detailsSection = {
    backgroundColor: "#fcfcfc",
    borderRadius: "12px",
    padding: "20px",
    border: "1px solid #f0f0f0",
    margin: "30px 0",
};

const sectionTitle = {
    fontSize: "16px",
    fontWeight: "700",
    color: "#2B1E16",
    margin: "0 0 15px 0",
};

const detailText = {
    fontSize: "14px",
    color: "#525f7f",
    margin: "0",
};

const itemRow = {
    margin: "8px 0",
};

const itemText = {
    fontSize: "14px",
    color: "#2B1E16",
    margin: "0",
};

const totalLabel = {
    fontSize: "16px",
    fontWeight: "700",
    color: "#2B1E16",
    margin: "10px 0 0 0",
};

const totalValue = {
    fontSize: "18px",
    fontWeight: "800",
    color: "#FF5200",
    margin: "10px 0 0 0",
};

const infoText = {
    color: "#8898aa",
    fontSize: "14px",
    textAlign: "center" as const,
};

const smallHr = {
    borderColor: "#f0f0f0",
    margin: "15px 0",
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
}
