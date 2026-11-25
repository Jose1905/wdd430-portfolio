import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { authConfig } from "./auth.config";
import { getUserByEmail } from "@/lib/projects-db" // your DB query function

export const { handlers, auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsed = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);
                
                if (!parsed.success) return null;

                const { email, password } = parsed.data;
                const user = await getUserByEmail(email);
                console.log(`Entered password: \n ${password}\n\nHashed Password: \n ${user?.password_hash}`)
                /* console.log(`User email: \n ${user?.email}\n\nHashed Password: \n ${user?.password_hash}`) */
                if (!user) return null;

                const passwordsMatch = await bcrypt.compare(password, user.password_hash);
                if (passwordsMatch) {
                    return { id: String(user.id), email: user.email };
                }

                return null;
            }
        })
    ]
});