import { auth } from "@/lib/auth";  
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Authenticate the user session
  const session = await auth();

  // If no session is found, redirect the user to the home page
  if (!session) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

export const config = {
  // Apply middleware to all paths under /dashboard
  matcher: ["/dashboard/:path*"],
};
