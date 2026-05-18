import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "UniFixed — AI College Counseling",
  description:
    "AI-powered college predictor for JoSAA, CSAB, MCC and more. Predict your college, compare options, and make confident decisions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} antialiased`}>
      <body style={{ fontFamily: "var(--font-outfit, 'Outfit', sans-serif)" }}>
        {children}
      </body>
    </html>
  );
}
