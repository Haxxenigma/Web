import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import prisma from '@/db';
import styles from './edit.module.scss';
import ArticleEditForm from '@/components/article-edit-form';
import ArticleEditorHeader from '@/components/article-editor-header';

export async function generateMetadata({ params }) {
    const article = await prisma.Articles.findUnique({
        where: {
            id: parseInt(params.article),
        },
    });

    if (!article) return redirect('/forbidden');

    return {
        title: `${article.title} | Article edit`,
        description: `${article.title} article edit page`,
    }
}

export default async function ArticleEdit({ params }) {
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
            <ArticleEditorHeader session={session} context={'edit'} articleId={params.article} />
            <ArticleEditForm styles={styles} article={article} />
        </>
    );
}