import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const poppins = Poppins({subsets: ["latin"], weight:['400', '700']})

export const metadata: Metadata = {
  title: "Pastpricing",
  description: "Track product prices effortlessly and save money on your online shopping",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.className} leading-normal tracking-normal text-indigo-400 m-6 bg-cover bg-fixed`}
        // style={{ backgroundImage: "url('/assets/images/header.png')" }}
      >
        <main className="h-full">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
  );
}
