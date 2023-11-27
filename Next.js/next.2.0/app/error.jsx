'use client';
import styles from '@/styles/main.module.scss';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(`Error occured: ${error}`);
    }, [error]);

    return (
        <div className={styles.error}>
            <h1 className={styles.errorTitle}>Something went wrong!</h1>
            <button className={styles.errorBtn} onClick={() => reset()}>Try again</button>
        </div>
    );
}