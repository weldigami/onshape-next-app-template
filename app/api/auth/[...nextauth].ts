import NextAuth, { type NextAuthConfig } from "next-auth";
import type { Session, User, Account } from "next-auth";
import { JWT } from "next-auth/jwt";

interface ExtendedJWT extends JWT {
  accessToken?: string;
}

interface ExtendedSession extends Session {
  user: User & {
    id: string;
    name?: string | null;
    email?: string;
    image?: string | null;
  };
  accessToken?: string;
}

export const authOptions: NextAuthConfig = {
  providers: [
    {
      id: "pavels-oauth",
      name: "Pavels",
      type: "oauth",
      authorization: {
        url: `${process.env.ONSHAPE_AUTH_URL}?response_type=code`,
      },
      token: process.env.ONSHAPE_TOKEN_URL as string,
      userinfo: process.env.ONSHAPE_USER_INFO_URL as string,
      clientId: process.env.ONSHAPE_CLIENT_ID as string,
      clientSecret: process.env.ONSHAPE_CLIENT_SECRET as string,
      profile(profile: any) {
        return {
          id: profile.id ?? profile.sub ?? "",
          name: profile.name ?? profile.full_name ?? "",
          email: profile.email ?? "",
          image: profile.picture ?? profile.avatar_url ?? null,
        };
      },
    },
  ],
  callbacks: {
    async jwt({ token, account }: { token: ExtendedJWT; account?: Account | null }): Promise<ExtendedJWT> {
      if (account && account.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }: { session: ExtendedSession; token: ExtendedJWT }): Promise<ExtendedSession> {
      return {
        ...session,
        user: { ...session.user, id: token.sub ?? session.user?.id ?? "" },
        accessToken: token.accessToken,
      };
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
