import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // Import authentication configuration

// Initialize NextAuth with the provided authentication options
const handler = NextAuth(authOptions);

// Export the handler for both GET and POST requests to handle authentication
export { handler as GET, handler as POST };
