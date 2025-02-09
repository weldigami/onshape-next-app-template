import NextAuth from 'next-auth';
import OnshapeProvider from 'next-auth/providers/onshape';

export const { handlers, auth } = NextAuth({
  providers: [
    OnshapeProvider({
      clientId: process.env.ONSHAPE_CLIENT_ID!,
      clientSecret: process.env.ONSHAPE_CLIENT_SECRET!,
      authorization: 'https://oauth.onshape.com/oauth/authorize',
      token: 'https://oauth.onshape.com/oauth/token',
      userinfo: 'https://cad.onshape.com/api/users/session',
    })
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token;
      return session;
    }
  }
});