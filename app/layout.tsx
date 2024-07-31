import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Head from 'next/head';
const inter = Inter({ subsets: ["latin"] });
import { Montserrat } from 'next/font/google';
const montserrat = Montserrat({
  weight: ['400', '600', '700'], // Regular, SemiBold, and Bold
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${montserrat.className} bg-background flex flex-col min-h-screen`}>
        <main className="flex-grow">
          {children}
        </main>
        <div className="relative w-1500 sm:w-full  h-7 sm:h-12 mt-7 ">
          <Image src="/Vectors.svg" alt="My SVG Icon" layout="fill" fill={true} />
        </div>
      </body>
    </html>
  );
}
