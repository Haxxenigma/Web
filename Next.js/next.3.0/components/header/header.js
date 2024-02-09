import Link from 'next/link';
import Dropdown from './dropdown';
import AuthLinks from './auth-links';
import getUser from '@/utils/getUser';
import ThemeToggle from './theme-toggle';
import styles from './header.module.scss';

export default async function Header() {
    const user = await getUser();

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <Link className={styles.logoCnt} href='/'>
                    <img className={styles.logo} src='/media/logo.png' />
                </Link>
                <div className={styles.navRight}>
                    <ThemeToggle />
                    {user ? (
                        <Dropdown user={user} />
                    ) : (
                        <AuthLinks />
                    )}
                </div>
            </nav>
        </header>
    );
}