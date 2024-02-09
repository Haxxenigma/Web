import { AlertCircle } from 'lucide-react';
import styles from './my-error.module.scss';

export default function MyError({ error }) {
    return (
        <div className={styles.error}>
            {error && (
                <>
                    <AlertCircle size='14' />
                    {error.message}
                </>
            )}
        </div>
    );
}