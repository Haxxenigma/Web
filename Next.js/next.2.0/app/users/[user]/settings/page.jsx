import prisma from '@/configs/prisma';
import General from '@/components/Settings/General/general';

export default async function Settings({ params }) {
    const user = await prisma.Users.findUnique({
        where: {
            name: params.user,
        },
    });

    return (
        <General user={user} />
    );
}