import NextAuth from "next-auth";
import { OAuthConfig } from "next-auth/providers";

// Define the structure of the Onshape user profile
interface OnshapeProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
}

// Configure the Onshape OAuth provider
const OnshapeProvider = {
  id: "onshape", // Unique identifier for the provider
  name: "OnShape", // Display name for the provider
  type: "oauth", // OAuth-based authentication
  authorization: {
    // URL for authorization request with necessary query parameters
    url: `${process.env.ONSHAPE_AUTH_URL}?client_id=${process.env.ONSHAPE_CLIENT_ID}&response_type=code&scope=read&redirect_uri=${process.env.NEXTAUTH_URL}/api/auth/callback/onshape`,
  },
  token: process.env.ONSHAPE_TOKEN_URL!, // Token endpoint URL
  userinfo: process.env.ONSHAPE_USER_INFO_URL!, // Endpoint to fetch user information
  clientId: process.env.ONSHAPE_CLIENT_ID!, // OAuth client ID
  clientSecret: process.env.ONSHAPE_CLIENT_SECRET!, // OAuth client secret
  profile(profile: OnshapeProfile) {
    // Map the fetched profile data to the NextAuth user object
    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      image: profile.image || null, // Default to null if no image is available
    };
  },
} as OAuthConfig<OnshapeProfile>;

export const authOptions = {
  providers: [OnshapeProvider], // Register Onshape as an authentication provider
  callbacks: {
    // Modify the session object to include the access token
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
    // Modify the JWT token to store the access token
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  pages: {
    signIn: "/", // Custom sign-in page
  },
  secret: process.env.NEXTAUTH_SECRET, // Secret key for NextAuth
};

// Initialize NextAuth with the authentication options
export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; // Export handler for GET and POST requests
