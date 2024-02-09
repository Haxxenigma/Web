import { Check, Loader } from 'lucide-react';
import styles from './my-link.module.scss';

export default function MyButton({ children, inverse, type, style, className, onClick, isSubmitting }) {
    return (
        <button
            className={`${styles.myButton} ${inverse && styles.inverse} ${className}`}
            type={type || 'button'}
            onClick={onClick || null}
            disabled={isSubmitting}
            style={style}
        >
            {isSubmitting !== undefined && !isSubmitting && <Check size='20' />}
            {isSubmitting && (
                <div className={styles.loader}>
                    <Loader size='20' />
                </div>
            )}
            {children}
        </button>
    );
}