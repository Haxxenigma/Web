'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

export default function ArticleEditForm({ styles, article }) {
    const router = useRouter();

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append('id', article.id);

        await axios.post('/api/article/edit', formData)
            .then(() => router.refresh())
            .then(() => router.push(`/articles/${article.id}`))
            .catch(error => console.error(error));
    }

    return (
        <form className={styles.editor} onSubmit={handleSubmit}>
            <div className={styles.editor_title}>
                <textarea id='title' name='title' defaultValue={article.title} rows={1} placeholder='Title' required autoFocus />
            </div>
            <div className={styles.editor_content}>
                <textarea id='content' name='content' defaultValue={article.content} rows={15} placeholder='Content' required />
            </div>
            <div className={styles.editor_submit}>
                <button type='submit'>Edit<Image src={'/edit.svg'} alt='' width={20} height={20} style={{ rotate: 90 + 'deg' }} /></button>
            </div>
        </form>
    );
}