

import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Ensure the DB connection is established
connectToDB();

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        async session({ session }) {
            try {
                const sessionUser = await User.findOne({ email: session.user.email });
                if (sessionUser) {
                    session.user.id = sessionUser._id.toString();
                }
                return session;
            } catch (error) {
                console.error('Error fetching session user:', error);
                return session;
            }
        },
        async signIn({ profile }) {
            try {
                // Check if the user exists
                const userExists = await User.findOne({ email: profile.email });

                // If not, create a new user
                if (!userExists) {
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(' ', '').toLowerCase(),
                        image: profile.picture,
                    });
                }

                return true;
            } catch (error) {
                console.error('Error signing in:', error);
                return false;
            }
        }
    }
});

export { handler as GET, handler as POST };
