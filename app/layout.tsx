"use client";

import { SessionProvider } from "next-auth/react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Wrap the application with SessionProvider to manage authentication state */}
        <SessionProvider>
          {children} {/* Render child components within the layout */}
        </SessionProvider>
      </body>
    </html>
  );
}
