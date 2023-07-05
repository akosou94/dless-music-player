import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { AuthFetch } from '@/api';
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        identifier: {
          label: 'Identifier',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },

      async authorize(credentials) {
        const response = await AuthFetch('/auth/local', {
          identifier: credentials.identifier,
          password: credentials.password,
        });

        const user = await response.json();

        if (response.ok && user) {
          return user;
        }

        return null;
      },
    }),
  ],

  session: {
    jwt: true,
    maxAge: 1 * 60 * 60,
  },

  jwt: {
    maxAge: 1 * 60 * 60,
  },

  pages: {
    signIn: '/auth/login',
  },

  callbacks: {
    async session({ session, token }) {
      return Promise.resolve({ ...token, expires: session.expires });
    },
    async jwt({ token, user }) {
      if (user) {
        token = { ...user };
      }
      return Promise.resolve(token);
    },
  },
};

export default NextAuth(authOptions);
