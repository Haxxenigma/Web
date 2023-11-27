import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { formatDate } from '@/scripts';
import prisma from '@/db';
import Link from 'next/link';
import Image from 'next/image';
import styles from './user.module.scss';
import Articles from '@/components/articles';
import blogStyles from '@/app/blog/blog.module.scss';

export async function generateMetadata({ params }) {
    const user = await prisma.Users.findUnique({
        where: {
            name: params.user,
        },
    });

    if (!user) return redirect('/not-found');

    return {
        title: `${user.name} | Profile`,
        description: `${user.name} profile page`,
    }
}

export default async function User({ params }) {
    const data = await getServerSession();

    const user = await prisma.Users.findUnique({
        where: {
            name: params.user,
        },
    });

    if (!user) return redirect('/not-found');

    const articles = await prisma.Articles.findMany({
        where: {
            author: params.user,
        },
        include: {
            Users: {
                select: {
                    image: true,
                },
            },
        },
    });

    const birth = user.birth ? await formatDate(user.birth) : null;
    for (const article of articles) {
        article.created_at = await formatDate(article.created_at);
    }

    if (!user) return Response.redirect('http://localhost:3000/404');

    return (
        <>
            <div className={styles.profile_head}>
                <div className={styles.profile_image}>
                    <Image src={user.image} alt='' width={80} height={80} />
                </div>
                <div className={styles.profile_info}>
                    <p>{user.name}</p>
                    <p>{birth}</p>
                </div>
                <div className={styles.profile_actions}>
                    {data && data.user.name === params.user && (
                        <Link href={`/users/${user.name}/settings`}>
                            <Image src={'/settings.svg'} alt='' width={30} height={30} />
                        </Link>
                    )}
                </div>
            </div>
            <div className={styles.title}>
                <h2 id='articles'>
                    <Link href={'#articles'}>{user.name}'s articles</Link>
                </h2>
            </div>
            <Articles styles={blogStyles} articles={articles} />
        </>
    );
}