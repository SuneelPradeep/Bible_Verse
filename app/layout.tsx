import type { Metadata } from "next";
import { Inter } from "next/font/google";
import StyledComponentsRegistry from '../lib/registry';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Bible Verses Generator",
  description: "A nextjs AWS project to create bible verses",
 icons : '/bible.png'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
       <StyledComponentsRegistry>
       {children}
       </StyledComponentsRegistry>
        
        </body>
    </html>
  );
}
