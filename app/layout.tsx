"use client";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Provides session context for authentication throughout the app */}
        <SessionProvider>
          {/* Toast notifications container with predefined settings */}
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
          
          {/* Render child components inside the layout */}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
