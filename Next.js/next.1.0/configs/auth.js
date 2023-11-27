import { compare } from 'bcrypt';
import Credentials from 'next-auth/providers/credentials';
import prisma from '@/db';

export const authConfig = {
    providers: [
        Credentials({
            credentials: {
                name: { label: 'Name', type: 'text', required: true },
                password: { label: 'Password', type: 'password', required: true },
            },
            async authorize(credentials) {
                if (!credentials.name || !credentials.password) return null;

                const user = await prisma.Users.findUnique({
                    where: {
                        name: credentials.name,
                    },
                });

                if (user) {
                    var passMatches = await compare(credentials.password, user.password) ||
                        credentials.password === user.password
                }
                if (passMatches) return user;
                return null;
            },
        }),
    ],
    pages: {
        signIn: '/login',
    }
}