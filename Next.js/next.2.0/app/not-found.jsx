import styles from '@/styles/main.module.scss';
import Link from 'next/link';

export default function NotFound() {
    return (
        <div className={styles.notFound}>
            <h1 className={styles.notFoundTitle}>Not Found | 404</h1>
            <p className={styles.notFoundInfo}>It seems the page you requested does not exist</p>
            <Link className={styles.notFoundBtn} href={'/'}>Take me home!</Link>
        </div>
    );
}