import Link from 'next/link';
import Image from 'next/image';
import BackLink from '@/components/back-link';
import styles from './article-editor-header.module.scss';

export default function ArticleEditorHeader({ session, context, articleId }) {
    return (
        <div className={styles.editor_head}>
            <div className={styles.aditor_head_btns}>
                <BackLink link={context === 'create' ? '/blog' : `/articles/${articleId}`} />
            </div>
            <div className={styles.editor_head_title}>{context === 'create' ? 'Article creation' : 'Article edition'}</div>
            <div className={styles.editor_user_info}>
                <Link href={`/users/${session.user.name}`} className={styles.editor_user_image}>
                    <Image src={session.user.image} alt='' width={30} height={30} />
                </Link>
                <Link href={`/users/${session.user.name}`} className={styles.editor_user_name}>
                    {session.user.name}
                </Link>
            </div>
        </div>
    );
}