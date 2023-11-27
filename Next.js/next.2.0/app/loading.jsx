import styles from '@/styles/main.module.scss';

export default function Loading() {
    return (
        <div className={styles.loading}>
            <div className={styles.loader} />
        </div>
    );
}