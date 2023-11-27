'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

export default function ArticleCreateForm({ styles, author }) {
    const router = useRouter();

    const handleSubmit = async e => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.append('author', author);

        await axios.post('/api/article/create', formData)
            .then(res => router.push(`/articles/${res.data.id}`))
            .then(() => router.refresh())
            .cathc(error => console.error(error.message));
    }

    return (
        <form className={styles.editor} onSubmit={handleSubmit}>
            <div className={styles.editor_title}>
                <textarea id='title' name='title' rows={1} placeholder='Title' required autoFocus />
            </div>
            <div className={styles.editor_content}>
                <textarea id='content' name='content' rows={15} placeholder='Content' required />
            </div>
            <div className={styles.editor_submit}>
                <button type='submit'>Create<Image src={'/add.svg'} alt='' width={25} height={25} /></button>
            </div>
        </form>
    );
}