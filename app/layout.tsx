import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "Yumzio - Your Favorite Food, Delivered Fast in Narsinghpur & Cuttack",
  description: "Order from local restaurants you love in Narsinghpur & Cuttack. Hot, fresh, and delivered on time with Yumzio. Download the app today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} font-outfit antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

