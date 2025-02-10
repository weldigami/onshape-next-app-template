import NextAuth from "next-auth";
import { OAuthConfig } from "next-auth/providers/oauth";
import axios from "axios";

interface OnshapeProfile {
  id: string;
  name: string;
  email: string;
  image?: string;
}

// Function to fetch user data from Onshape API
async function fetchOnshapeUserInfo(accessToken: string) {
  try {
    const response = await axios.get(process.env.ONSHAPE_USER_INFO_URL!, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    console.log("Onshape API Response:", response.data); // ✅ Debugging log

    if (!response.data || !response.data.id) {
      throw new Error("Invalid or empty response from Onshape API.");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching Onshape user info:", error);
    throw new Error("Failed to fetch Onshape user profile.");
  }
}

// NextAuth authentication handler
export const { handlers, auth } = NextAuth({
  providers: [
    {
      id: "onshape",
      name: "OnShape",
      type: "oauth",
      authorization: {
        url: process.env.ONSHAPE_AUTH_URL!,
        params: {
          client_id: process.env.ONSHAPE_CLIENT_ID!,
          response_type: "code",
          scope: "read",
          redirect_uri: `${process.env.NEXTAUTH_URL}/api/auth/callback/onshape`,
        },
      },
      token: {
        url: process.env.ONSHAPE_TOKEN_URL!,
      },
      userinfo: {
        url: process.env.ONSHAPE_USER_INFO_URL!,
      },
      clientId: process.env.ONSHAPE_CLIENT_ID!,
      clientSecret: process.env.ONSHAPE_CLIENT_SECRET!,
      async profile(profile: OnshapeProfile) {
        if (!profile || !profile.id) {
          throw new Error("Invalid profile data received from Onshape.");
        }

        return {
          id: profile.id,
          name: profile.name,
          email: profile.email || "no-email@example.com",
          image: profile.image || null,
        };
      },
    } as OAuthConfig<OnshapeProfile>,
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.accessToken = token.accessToken as string;
      }
      return session;
    },
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  pages: {
    signIn: "/", // Redirect users to the homepage for authentication
  },
});
