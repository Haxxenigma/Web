'use client';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

export default function ArticleDeleteForm({ styles, article_id }) {
    const router = useRouter();

    const handleSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/article/delete', { article_id: article_id })
            .then(() => router.refresh())
            .then(() => router.push('/blog'))
            .catch(error => console.error(error));
    }

    return (
        <form className={styles.delete_form} onSubmit={handleSubmit}>
            <label htmlFor='submit'>Are you sure you want to delete this article?</label>
            <div className={styles.delete_form_btns}>
                <Link href={`/articles/${article_id}`}>
                    <Image src={'/back.svg'} alt='' width={20} height={20} />Back
                </Link>
                <button type='submit' id='submit'>
                    <Image src={'/delete.svg'} alt='' width={20} height={20} />Delete
                </button>
            </div>
        </form>
    );
}