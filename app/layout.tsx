import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "../store/StoreProvider";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

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
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <header>
            <nav className="container mx-auto my-2 flex items-center justify-center">
              <ul className="flex space-x-4">
                <li className="hover:text-gray-300">
                  <Link href="/">Home</Link>
                </li>
                <li className="hover:text-gray-300">
                  <Link href="/users">Users</Link>
                </li>
              </ul>
            </nav>
          </header>
          <main className="max-w-md mx-auto">{children}</main>
        </body>
      </html>
    </StoreProvider>
  );
}
