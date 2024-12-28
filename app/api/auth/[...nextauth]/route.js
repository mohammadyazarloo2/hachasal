import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectMongoDB } from '@/lib/mongodb';
import User from '@/models/User';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials) {
        await connectMongoDB();
        const user = await User.findOne({ email: credentials.email });
        
        if (!user) {
          return null;
        }

        if (user.verificationCode !== credentials.code) {
          return null;
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, handler as PUT, handler as DELETE };
