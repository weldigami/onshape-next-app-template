import NextAuth, {type NextAuthConfig} from "next-auth";
import type { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface ExtendedJWT extends JWT {
  accessToken?: string;
}

interface ExtendedSession extends Session {
  user: User & {
    id: string;
    name?: string | null;
    email?: string;
  };
  accessToken?: string;
}

export const authOptions: NextAuthConfig = {
  providers: [
    {
      id: "1",
      name: "Pavels",
      type: "oauth",
      authorization: {
        url: "https://provider.com/oauth/authorize",
        params: { response_type: "code" },
      },
      token: "https://provider.com/oauth/token",
      userinfo: "https://provider.com/oauth/userinfo",
      clientId: process.env.CLIENT_ID as string,
      clientSecret: process.env.CLIENT_SECRET as string,
      profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }, // Ensure proper type compatibility
  ],
  callbacks: {
    async jwt({ token, account }: { token: ExtendedJWT; account?: any }): Promise<ExtendedJWT> {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: ExtendedSession; token: ExtendedJWT }): Promise<ExtendedSession> {
      return {
        ...session,
        user: { ...session.user, id: session.user?.id ?? "" },
        accessToken: token.accessToken,
      };
    },
  }
};
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };