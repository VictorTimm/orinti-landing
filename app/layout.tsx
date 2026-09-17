import type { Metadata, Viewport } from "next";
import { Oswald, Press_Start_2P, Roboto_Mono } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Providers } from "@/components/providers";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  variable: "--font-roboto",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Orinti Webdevelopment",
  description:
    "High-end design and build webdevelopment. Custom websites for individuals and businesses.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${pressStart.variable} ${oswald.variable} ${robotoMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col bg-background text-copy">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
