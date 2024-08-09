import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { Montserrat } from 'next/font/google';
import { ApolloWrapper } from './lib/ApolloWrapper';

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  weight: ['400', '600', '700'],
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
      <body className={`${inter.className} ${montserrat.className} bg-background min-h-screen`}>
        <ApolloWrapper>
          <main className="container mx-auto min-h-screen">
            {children}
          </main>
          <div className="relative w-full h-7 sm:h-12 mt-7">
            <Image src="/Vectors.svg" alt="My SVG Icon" layout="fill" objectFit="cover" />
          </div>
        </ApolloWrapper>
      </body>
    </html>
  );
}