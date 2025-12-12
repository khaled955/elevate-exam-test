import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginService } from "./app/(auth)/login-form/login-service";

export const authOptions: NextAuthOptions = {
  // your configs

  pages: {
    signIn: "/login-form",
    signOut: "/login-form",
    error: "/login-form",
  },


  // tools that used for authentication  ex: credentials , OAuthentication:google,twitter , etc...
  providers: [
    CredentialsProvider({
      // The name to display on the sign  in form (e.g. 'Sign in with...')
      //  optional
      name: "Credentials",

      credentials: {
        email: {},
        password: {},
      },
       authorize: async (credentials) =>{
        const payload = await loginService({
          email:credentials?.email,
          password:credentials?.password,
        })

        //  user data could not be retrieved return error by check property in error response
        if ("code" in payload) throw new Error(payload.message);

        // If no error and we have user data, return it
        //  user is object must have id property and its value is string
        return {
            id:payload.user._id,
          accessToken: payload.token,
          user:payload.user,
        };
      },
    }),
  ],

  // after user login in what happen next in callbacks
  // account is what we return in async function
  callbacks: {
    //  token will be encrypted and saved in cookies
    async jwt({ token, user ,trigger,session}) {

      // first time after login
      if (user) {
        token.accessToken = user.accessToken;
        token.user = user.user
      }

      // When use useSession and update user info fn on client

      if(trigger === "update" && session?.user){
        token.user ={
          ...token.user,...session.user
        }
      }
      return token;
    },

    async session({ session, token }) {
      // Send properties to the client, like an access_token and user id from a provider.
      // dont return any sensitive data its mistake to return token  its better to return user info nly
      session.user = token.user;

      return session;
    },
  },

  jwt: {
    //  7 days
    maxAge: 7 * 24 * 60 * 60,
  },
};

