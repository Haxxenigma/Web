'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from './header.module.scss';
import LoadingMenu from './HeaderComponents/loading-menu';
import HeaderLink from './HeaderComponents/header-link';
import DropwdownLink from './HeaderComponents/dropdown-link';
import { UserPlus, LogIn, UserCog, User, LogOut, Moon, Sun, Menu } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { createRipples } from '@/scripts/scripts';
import { useActions } from '@/hooks/useActions';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';

const links = [
    {
        path: '/',
        label: 'Home'
    },
    {
        path: '/about',
        label: 'About'
    },
];

export default function Header({ cookie }) {
    try {
        const [isThemeDark, setDarkTheme] = useState(true);
        const { isLoading, error, user } = useSelector(state => state.user);
        const { getUserData } = useActions();
        const pathname = usePathname();
        const dropdownMenu = useRef();
        const dropdown = useRef();
        const themeTogglerBtn = useRef();
        const navLinks = useRef();

        useEffect(() => {
            getUserData();
        }, [cookie]);

        useEffect(() => {
            if (error) console.error(`useSelector error: ${error}`);
            document.addEventListener('click', hideDropdown);
            return () => document.removeEventListener('click', hideDropdown);
        }, []);

        const toggleDropdown = () => {
            dropdown.current.classList.toggle(styles.active);
        };

        const hideDropdown = e => {
            if (dropdownMenu.current && !dropdownMenu.current.contains(e.target)) {
                dropdown.current.classList.remove(styles.active);
            }
        };

        const toggleTheme = () => {
            setDarkTheme(!isThemeDark);
            if (isThemeDark) {
                document.documentElement.removeAttribute('dark');
            } else {
                document.documentElement.setAttribute('dark', '');
            }
            themeTogglerBtn.current.classList.toggle(styles.active);
        };

        const toggleNav = () => {
            navLinks.current.classList.toggle(styles.show);
        };

        return (
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <div className={styles.navLeft}>
                        <button
                            type='button'
                            className={styles.navToggle}
                            onClick={toggleNav}>
                            <Menu size={35} />
                        </button>
                        <Link className={styles.logo} href={'/'}>
                            <Image src={'/media/nextjs.svg'} alt='' width={50} height={50} priority />
                        </Link>
                        <div className={styles.navLinksWrapper} ref={navLinks}>
                            {links.map((link, index) => (
                                <div
                                    className={`${styles.navLinkCnt} ${link.path === pathname ? styles.active : ''}`}
                                    key={index}
                                    onMouseDown={e => createRipples(e, styles)}>
                                    <Link
                                        className={styles.navLink}
                                        href={link.path}>
                                        {link.label}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.navRight}>
                        <div className={styles.themeTogglerCnt}>
                            <div className={styles.themeToggler} onClick={() => toggleTheme()}>
                                <div className={styles.themeTogglerBtn} ref={themeTogglerBtn}>
                                    {isThemeDark ? <Moon /> : <Sun />}
                                </div>
                            </div>
                        </div>
                        {cookie ? (
                            <div className={styles.dropdownWrapper}>
                                <div className={styles.dropdownMenu}
                                    ref={dropdownMenu}
                                    onMouseDown={e => {
                                        createRipples(e, styles);
                                        toggleDropdown();
                                    }}>
                                    <div className={styles.dropdownMenuName}>
                                        {isLoading || !user ? <span>Loading...</span> : <span>{user.name}</span>}
                                    </div>
                                    <div className={styles.dropdownMenuImage}>
                                        {isLoading || !user ?
                                            <LoadingMenu styles={styles} /> :
                                            <Image src={user.image} alt='' width={40} height={40} priority />
                                        }
                                    </div>
                                </div>
                                <div className={styles.dropdown} ref={dropdown}>
                                    <DropwdownLink
                                        isLoading={isLoading}
                                        user={user}
                                        path={`/users/${user?.name}`}
                                        value={<><User />Profile</>}
                                    />
                                    <DropwdownLink
                                        isLoading={isLoading}
                                        user={user}
                                        path={`/users/${user?.name}/settings`}
                                        value={<><UserCog />Settings</>}
                                    />
                                    <DropwdownLink
                                        isLoading={isLoading}
                                        user={user}
                                        path={'logout'}
                                        value={<><LogOut />Log Out</>}
                                    />
                                </div>
                            </div>
                        ) : (
                            <>
                                <HeaderLink
                                    className={styles.navLogin}
                                    url={'/login'}
                                    image={<LogIn size={20} />}
                                    innerHtml={'Log In'}
                                />
                                <HeaderLink
                                    className={styles.navRegister}
                                    url={'/register'}
                                    image={<UserPlus size={20} />}
                                    innerHtml={'Register'}
                                />
                            </>
                        )}
                    </div>
                </nav>
            </header >
        );
    } catch (err) {
        console.error(err);
    }
}