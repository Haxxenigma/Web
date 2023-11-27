import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { formatDate } from '@/scripts';
import prisma from '@/db';
import Link from 'next/link';
import Image from 'next/image';
import styles from './article.module.scss';
import BackLink from '@/components/back-link';

export async function generateMetadata({ params }) {
    const article = await prisma.Articles.findUnique({
        where: {
            id: parseInt(params.article),
        },
    });

    if (!article) return redirect('/not-found');

    return {
        title: `${article.title} | Article`,
        description: `${article.title} article page`,
    }
}

export default async function Article({ params }) {
    const session = await getServerSession();
    if (!session) return redirect('/login');

    const author = session.user.name;

    const article = await prisma.Articles.findUnique({
        where: {
            id: parseInt(params.article),
        },
        include: {
            Users: {
                select: {
                    image: true,
                },
            },
        },
    });

    if (!article) return redirect('/not-found');

    article.created_at = await formatDate(article.created_at);

    return (
        <>
            <div className={styles.article_btns}>
                <BackLink link={'/blog'} />
                {author && article.author === author && (
                    <>
                        <Link href={`/articles/${article.id}/edit`}>
                            <Image src={'/edit.svg'} alt='' width={20} height={20} style={{ rotate: 90 + 'deg' }} />
                            <span>Edit</span>
                        </Link>
                        <Link href={`/articles/${article.id}/delete`}>
                            <Image src={'/delete.svg'} alt='' width={20} height={20} />
                            <span>Delete</span>
                        </Link>
                    </>
                )}
            </div>
            <div className={styles.article}>
                <div className={styles.article_header}>
                    <div className={styles.article_date}>{article.created_at}</div>
                    <Link className={styles.article_author} href={`/users/${article.author}`}>
                        <span>Posted by</span>
                        <div className={styles.article_author_img}>
                            <Image src={article.Users.image} alt='' width={25} height={25} />
                        </div>
                        <span>{article.author}</span>
                    </Link>
                </div>
                <div className={styles.article_title}>{article.title}</div>
                <div className={styles.article_content}>
                    {article.content}
                </div>
            </div>
        </>
    );
}