import Link from 'next/link';
import styles from './my-link.module.scss';

export default function MyLink({ children, path, inverse, style }) {
    return (
        <Link className={`${styles.myLink} ${inverse && styles.inverse}`} href={path} style={style}>
            {children}
        </Link>
    );
}