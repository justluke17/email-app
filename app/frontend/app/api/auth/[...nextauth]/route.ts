import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google" && profile?.email_verified && account.id_token) {
        try {
          const backendResponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: account.id_token }),
          });

          if (backendResponse.ok) {
            const data = await backendResponse.json();
            // Attach the backend token and user info to the NextAuth.js session/jwt
            account.access_token = data.access_token; // Our backend JWT
            account.user = data.user; // User info from our backend
            return true;
          } else {
            console.error("Backend authentication failed:", await backendResponse.text());
            return false; // Or redirect to an error page
          }
        } catch (error) {
          console.error("Error communicating with backend:", error);
          return false; // Or redirect to an error page
        }
      }
      return false; // For other providers or if conditions are not met
    },
    async jwt({ token, account, user }) {
      // Persist the backend access token and user info to the JWT
      if (account?.access_token) { // access_token from our backend
        token.accessToken = account.access_token;
      }
      if (account?.user) { // user info from our backend
        token.user = account.user;
      }
      // if `user` is present, it's the first time this callback is called after signIn
      // `user` here is what's returned from the provider's profile callback or the signIn callback
      if (user) {
        // You might want to map some initial profile data to the token here
        // For example, if your 'signIn' callback didn't fetch all user details
        // token.email = user.email; // Example, if user object has email
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client, like an access_token and user info from the JWT
      session.accessToken = token.accessToken as string;
      // It's good practice to type session.user if you are adding custom properties
      // @ts-ignore
      session.user = token.user as any; // User info from our backend
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Should be a strong secret
  session: {
    strategy: "jwt",
  },
  pages: {
    // signIn: '/auth/signin', // Optional: custom sign-in page
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
