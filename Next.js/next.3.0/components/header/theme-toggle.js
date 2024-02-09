'use client';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';
import styles from './theme-toggle.module.scss';

export default function ThemeToggle() {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        setTheme(localStorage.getItem('theme'));
    }, []);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((theme) => theme === 'dark' ? 'light' : 'dark');
    };

    return (
        <button type='button' className={styles.themeToggle} onClick={() => toggleTheme()}>
            {theme === 'light' ? (
                <Moon size='18' />
            ) : (
                <Sun size='18' />
            )}
        </button>
    );
}