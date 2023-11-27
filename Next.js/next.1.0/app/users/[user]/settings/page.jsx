import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { formatDate } from '@/scripts';
import prisma from '@/db';
import styles from './settings.module.scss';
import SettingsForm from '@/components/settings-form';

export async function generateMetadata({ params }) {
    const user = await prisma.Users.findUnique({
        where: {
            name: params.user,
        },
    });

    if (!user) return redirect('/forbidden');

    return {
        title: `${user.name} | Profile settings`,
        description: `${user.name} profile settings page`,
    }
}

export default async function Settings({ params }) {
    const session = await getServerSession();
    if (!session || session.user.name !== params.user) {
        return redirect('/forbidden');
    }

    const user = await prisma.Users.findUnique({
        where: {
            name: params.user,
        },
    });

    user.birth = user.birth ? await formatDate(user.birth) : null;

    return (
        <>
            <div className={styles.title}>
                <h1>Profile settings</h1>
                <hr />
            </div>
            <SettingsForm styles={styles} user={user} />
        </>
    );
}