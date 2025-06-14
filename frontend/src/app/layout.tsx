import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import type { Metadata } from "next";
import React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "./providers/AuthProvider";
import { UserProvider } from "./providers/UserProvider";
import { DeliveryAddressProvider } from "./providers/DeliveryAddressProvider";
import { SalesProvider } from "./providers/SalesProvider";
import { NotificationProvider } from "./providers/NotificationProvider";
import AdminProvider from "./providers/AdminProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <SalesProvider>
          <AuthProvider>
            <AdminProvider>
              <UserProvider>
                <NotificationProvider>
                  <DeliveryAddressProvider>{children}</DeliveryAddressProvider>
                </NotificationProvider>
              </UserProvider>
            </AdminProvider>
          </AuthProvider>
        </SalesProvider>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </body>
    </html>
  );
}
