import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDatabase, User } from '@/lib/db/mongodb';
import bcrypt from 'bcryptjs';

// Configure NextAuth
export const authOptions: NextAuthOptions = {
  // Configure session and JWT
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  
  // Auth providers
  providers: [
    // Google provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
    
    // Credentials provider
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        
        try {
          // Connect to database
          await connectToDatabase();
          
          // Find user by email
          const user = await User.findOne({ email: credentials.email });
          
          if (!user) {
            return null;
          }
          
          // Check password
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          
          if (!isValid) {
            return null;
          }
          
          // Return user object
          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.image,
            plan: user.plan,
          };
        } catch (error) {
          console.error('Auth error:', error);
          return null;
        }
      },
    }),
  ],
  
  // Callbacks
  callbacks: {
    // JWT callback - add user info to token
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.plan = (user as any).plan || null;
      }
      return token;
    },
    
    // Session callback - add user info to session
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.plan = token.plan as string | null;
      }
      return session;
    },
  },
  
  // Pages
  pages: {
    signIn: '/auth/login',
    signOut: '/',
    error: '/auth/error',
  },
  
  // Secret
  secret: process.env.NEXTAUTH_SECRET,
};

export default authOptions; 