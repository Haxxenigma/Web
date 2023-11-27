import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import prisma from '@/db';
import styles from './delete.module.scss';
import ArticleDeleteForm from '@/components/article-delete-form';

export async function generateMetadata({ params }) {
    const article = await prisma.Articles.findUnique({
        where: {
            id: parseInt(params.article),
        },
    });

    if (!article) return redirect('/forbidden');

    return {
        title: `${article.title} | Article delete`,
        description: `${article.title} article delete page`,
    }
}

export default async function ArticleDelete({ params }) {
    const session = await getServerSession();
    const article = await prisma.Articles.findUnique({
        where: {
            id: parseInt(params.article),
        },
    });

    if (!session || !article || session.user.name !== article.author) {
        return redirect('/forbidden');
    }

    return (
        <>
            <ArticleDeleteForm styles={styles} article_id={article.id} />
        </>
    );
}