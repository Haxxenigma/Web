'use client';
import { ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { storeUser } from '@/store/user.slice';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styles from './dropdown.module.scss';
import Link from 'next/link';

export default function Dropdown({ user }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(storeUser(user));
    }, []);

    const links = [
        {
            path: `/users/${user.id}`,
            label: 'Profile',
            image: <User />,
        },
        {
            path: `/settings`,
            label: 'Settings',
            image: <Settings />,
        },
        {
            path: `/signout`,
            label: 'Sign Out',
            image: <LogOut />,
        },
    ];

    return (
        <>
            {isExpanded && (
                <div
                    className={`${styles.dropdownWrapper} ${isExpanded && styles.active}`}
                    onClick={() => setIsExpanded(false)}
                />
            )}
            <div className={styles.dropdownCnt}>
                <button
                    type='button'
                    className={styles.dropdownBtn}
                    onClick={() => setIsExpanded(!isExpanded)}
                >
                    <div className={styles.imageCnt}>
                        <img className={styles.image} src={user.image} />
                    </div>
                    <div className={styles.name}>
                        <span>{user.name}</span>
                    </div>
                    <div className={`${styles.arrow} ${isExpanded && styles.active}`}>
                        <ChevronDown size='18' />
                    </div>
                </button>
                <div
                    className={`${styles.dropdown} ${isExpanded && styles.active}`}
                    onClick={() => setIsExpanded(false)}
                >
                    {links.map((link) => (
                        <Link className={styles.link} href={link.path} key={link.path}>
                            {link.image}
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}