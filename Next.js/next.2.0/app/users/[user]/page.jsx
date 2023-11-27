import prisma from '@/configs/prisma';
import Profile from '@/components/Profile/profile';
import { notFound } from 'next/navigation';

export default async function User({ params }) {
    const user = await prisma.Users.findUnique({
        where: {
            name: params.user,
        },
    });

    if (!user) notFound();

    return (
        <Profile user={user} />
    );
}