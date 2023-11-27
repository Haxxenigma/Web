import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import styles from './create.module.scss';
import ArticleCreateForm from '@/components/article-create-form';
import ArticleEditorHeader from '@/components/article-editor-header';

export const metadata = {
    title: 'Article Create',
    description: 'Article Create page',
}

export default async function ArticleCreate() {
    const session = await getServerSession();
    if (!session) return redirect('/login');

    return (
        <>
            <ArticleEditorHeader session={session} context={'create'} />
            <ArticleCreateForm styles={styles} author={session.user.name} />
        </>
    );
}