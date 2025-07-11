import type { Metadata } from "next";
import { Inter, Aldrich } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../context/AuthContext";

// Keep Inter as a fallback font
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

// Main font for the project
const aldrich = Aldrich({ 
  weight: '400',
  subsets: ["latin"], 
  variable: '--font-aldrich',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Portfolio | Full Stack Developer",
  description: "A creative portfolio showcasing full-stack and front-end development skills",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${aldrich.variable} font-aldrich`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
