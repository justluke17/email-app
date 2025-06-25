import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { JWT, DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    accessToken?: string; // Our backend JWT
    user: {
      id?: string; // Or whatever ID type you use
      email?: string | null;
      full_name?: string | null;
      picture?: string | null;
    } & DefaultSession["user"]; // Keep existing properties like name, image
  }

  interface User extends DefaultUser {
    // Add custom properties from your backend user model if needed at the User level
    // This is what's initially returned by the provider's profile() or your signIn() callback
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accessToken?: string; // Our backend JWT
    user?: { // User info from our backend
      id?: string;
      email?: string | null;
      full_name?: string | null;
      picture?: string | null;
    };
  }
}
