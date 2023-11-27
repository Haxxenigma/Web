'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createRipples } from '@/scripts/scripts';
import { useActions } from '@/hooks/useActions';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Menu, X } from 'lucide-react';

export default function SettingsNav({ styles, user }) {
    const router = useRouter();
    const pathname = usePathname();
    const settingsNav = useRef();
    const navToggle = useRef();
    const navClose = useRef();

    const state = useSelector(state => state.user);
    const { getUserData } = useActions();

    useEffect(() => {
        getUserData();
    }, []);

    useEffect(() => {
        if (!state.isLoading) {
            if (!state.user || state.user.name !== user.name) {
                router.push('/forbidden');
            }
        }
    }, [state.isLoading]);

    const links = [
        {
            path: `/users/${user.name}/settings`,
            label: 'General',
        },
        {
            path: `/users/${user.name}/settings/password`,
            label: 'Password',
        },
        {
            path: `/users/${user.name}/settings/advanced`,
            label: 'Advanced',
        },
    ];

    useEffect(() => {
        document.addEventListener('click', closeNav);
        return () => document.removeEventListener('click', closeNav);
    }, []);

    const toggleNav = () => {
        settingsNav.current.classList.toggle(styles.show);
    };

    const closeNav = e => {
        if (!settingsNav.current.contains(e.target) &&
            !navToggle.current.contains(e.target) ||
            navClose.current.contains(e.target)) {
            settingsNav.current.classList.remove(styles.show);
        }
    };

    return (
        <>
            <button
                type='button'
                ref={navToggle}
                className={styles.navToggle}
                onClick={() => toggleNav()}>
                <Menu size={40} />
            </button>
            <div className={styles.settingsNav} ref={settingsNav}>
                <div className={styles.navTitle}>Settings
                    <button
                        type='button'
                        ref={navClose}
                        className={styles.navClose}
                        onClick={e => closeNav(e)}>
                        <X size={40} />
                    </button>
                </div>
                {links.map((link, index) => (
                    <div className={styles.navLink} key={index}>
                        <Link
                            href={link.path}
                            className={pathname === link.path ? styles.active : ''}
                            onMouseDown={e => createRipples(e, styles)}
                        >
                            {link.label}
                        </Link>
                    </div>
                ))}
            </div >
        </>
    );
}