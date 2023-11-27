import Link from 'next/link';
import Image from 'next/image';

export default function Articles({ styles, articles }) {
    return (
        <div className={styles.articles}>
            {
                articles.length ? (
                    articles.map(article => (
                        <div className={styles.article} key={article.id}>
                            <Link className={styles.article_title} href={`/articles/${article.id}`}>{article.title}</Link>
                            <Link className={styles.article_author} href={`/users/${article.author}`}>
                                <div className={styles.article_author_img}>
                                    <Image src={article.Users.image} alt='' width={25} height={25} />
                                </div>
                                {article.author}
                            </Link>
                            <div className={styles.article_date}>{article.created_at}</div>
                            <div className={styles.article_content}>{article.content}</div>
                            <Link className={styles.article_btn} href={`/articles/${article.id}`}>Read more</Link>
                        </div>
                    ))
                ) : (
                    <p>There are no articles yet</p>
                )
            }
        </div>
    );
}