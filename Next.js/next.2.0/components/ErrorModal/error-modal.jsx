import styles from './error-modal.module.scss';
import { AlertTriangle, X } from 'lucide-react';
import { useRef } from 'react';

export default function ErrorModal({ error, setError }) {
    const errorModal = useRef();

    const closeModal = () => {
        errorModal.current.classList.remove(styles.active);
        setTimeout(() => {
            setError('');
        }, 300);
    };

    return (
        <div className={`${styles.errorModal} ${error ? styles.active : ''}`} ref={errorModal} onMouseDown={closeModal}>
            <div className={styles.modalClose}>
                <X />
            </div>
            <div className={styles.modalHeader}>
                <AlertTriangle size={20} />
            </div>
            <div className={styles.modalFooter}>{error}</div>
        </div>
    );
}