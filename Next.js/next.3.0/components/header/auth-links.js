'use client';
import { LogIn, UserPlus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import MyLink from '@/components/ui/my-link';
import styles from './auth-links.module.scss';

const links = [
    {
        path: '/signin',
        label: 'Sign In',
        image: <LogIn size='18' />,
    },
    {
        path: '/signup',
        label: 'Sign Up',
        image: <UserPlus size='18' />,
    },
];

export default function AuthLinks() {
    const pathname = usePathname();

    return (
        <nav className={styles.authLinks}>
            {links.map((link) => (
                <MyLink
                    path={link.path}
                    inverse={link.path === '/signin'}
                    style={link.path === pathname ? {
                        display: 'none'
                    } : null}
                    key={link.path}
                >
                    {link.image}
                    <span style={{ fontSize: '14px' }}>
                        {link.label}
                    </span>
                </MyLink>
            ))}
        </nav>
    );
}