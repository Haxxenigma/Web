import { formatDate } from '@/scripts';
import prisma from '@/db';
import Link from 'next/link';
import Image from 'next/image';
import styles from './blog.module.scss';
import Articles from '@/components/articles';

export const metadata = {
    title: 'Blog',
    description: 'Blog page',
}

export default async function Blog() {
    const articles = await prisma.Articles.findMany({
        include: {
            Users: {
                select: {
                    image: true,
                },
            },
        },
    });

    for (const article of articles) {
        article.created_at = await formatDate(article.created_at);
    }

    return (
        <>
            <div className={styles.btns_tab}>
                <Link href={'/articles/create'}>Create<Image src={'/add.svg'} alt='' width={25} height={25} /></Link>
            </div>
            <Articles styles={styles} articles={articles} />
        </>
    );
}