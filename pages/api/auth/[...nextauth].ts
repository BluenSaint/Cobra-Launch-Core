import NextAuth, { User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongodb";

// Remove unused variables
// Comment out 'User', 'Session', and 'credentials' if they are not used
// import { User, Session } from "next-auth";

// async authorize(credentials) {
//   // Add your own logic here
//   return { id: "1", name: "User" };
// },

// async session({ session, token, user }: { session: ExtendedSession; token: any; user: User & { id: string } }) {
//   if (session.user && user) {
//     session.user.id = user.id;
//   }
//   return session;
// }

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add your own logic here
        return { id: "1", name: "User" };
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  session: {},
  callbacks: {
    // Remove unused variables
    // Comment out 'User', 'Session', and 'credentials' if they are not used
    // async session({ session, token, user }: { session: ExtendedSession; token: any; user: User & { id: string } }) {
    //   if (session.user && user) {
    //     session.user.id = user.id;
    //   }
    //   return session;
    // }
  },
});
