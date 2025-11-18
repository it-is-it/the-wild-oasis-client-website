import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { createGuest, getGuest } from "@/app/_lib/data-service";
import { supabase } from "@/app/_lib/supabase";

const authConfig = {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const email = credentials?.email;
          const password = credentials?.password;
          if (!email || !password) return null;

          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });
          if (error || !data?.user) return null;

          // Ensure a guest exists for this email (to keep app logic consistent)
          let guest = await getGuest(email);
          if (!guest) {
            await createGuest({ email, fullName: data.user.user_metadata?.name || email.split("@")[0] });
            guest = await getGuest(email);
          }

          return {
            id: guest?.id?.toString?.() || data.user.id,
            name: data.user.user_metadata?.name || guest?.fullName || email,
            email,
            image: "/default-user.jpg",
          };
        } catch (e) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const existingGuest = await getGuest(user?.email);
        if (!existingGuest && user?.email) {
          await createGuest({ email: user.email, fullName: user.name });
        }
        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      try {
        const email = session?.user?.email;
        if (!email) return session;
        const guest = await getGuest(email);
        session.user.guestId = guest?.id ?? null;
        // Fallback avatar if provider didn't supply one (e.g., credentials sign-in)
        if (!session.user.image) session.user.image = "/default-user.jpg";
        return session;
      } catch {
        return session;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth(authConfig);
