import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Learnova — Student Dashboard",
  description:
    "A next-gen student learning dashboard with live course tracking, activity insights, and streak monitoring.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground">
        <Sidebar />

        {/* Main content area offset by sidebar width */}
        <main className="pt-14 pb-20 md:pb-0 lg:pt-0 lg:pl-[220px] min-h-screen">
          <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </section>
        </main>
      </body>
    </html>
  );
}
