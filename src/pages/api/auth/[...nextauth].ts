import NextAuth, { AuthOptions } from "next-auth";
import type { OAuthConfig } from "next-auth/providers";
import { getServerSession } from "next-auth";

// Define the expected structure of the Onshape profile data
interface OnshapeProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
}

// Define the Onshape OAuth provider configuration
const OnshapeProvider = {
  id: "onshape", // Unique identifier for the provider
  name: "OnShape", // Display name
  type: "oauth", // Type of authentication
  authorization: {
    // URL for authorizing users, including client ID, response type, scope, and redirect URI
    url: `${process.env.ONSHAPE_AUTH_URL}?client_id=${process.env.ONSHAPE_CLIENT_ID}&response_type=code&scope=read&redirect_uri=${process.env.NEXTAUTH_URL}/api/auth/callback/onshape`,
  },
  token: "https://oauth.onshape.com/oauth/token", // Endpoint for exchanging authorization code for an access token
  userinfo: "https://cad.onshape.com/api/users/sessioninfo", // Endpoint to retrieve user profile information
  clientId: process.env.ONSHAPE_CLIENT_ID!, // OAuth client ID from environment variables
  clientSecret: process.env.ONSHAPE_CLIENT_SECRET!, // OAuth client secret from environment variables
  profile(profile: OnshapeProfile) {
    // Function to map Onshape profile data to NextAuth session user format
    return {
      id: profile.id, // Unique user ID
      name: profile.name, // User's name
      email: profile.email, // User's email
      image: profile.image || null, // Optional profile image, default to null if not provided
    };
  },
} as OAuthConfig<OnshapeProfile>;

// Define NextAuth authentication options
export const authOptions: AuthOptions = {
  providers: [OnshapeProvider], // Register Onshape as an authentication provider
  callbacks: {
    async session({ session, token }) {
      // Attach access token to session if available
      if (token) {
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
    async jwt({ token, account }) {
      // Store access token in JWT if account is available (i.e., during login)
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  pages: {
    signIn: "/", // Custom sign-in page (default is NextAuth's built-in page)
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret key for NextAuth encryption
};

// Export the NextAuth handler with the configured authentication options
export default NextAuth(authOptions);
