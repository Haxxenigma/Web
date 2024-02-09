'use client';
import { Download, Menu, Trash } from 'lucide-react';
import { useEffect } from 'react';
import styles from './context-menu.module.scss';
import Link from 'next/link';

export default function ContextMenu({ image, id, deleteImage }) {
    useEffect(() => {
        document.addEventListener('click', clearContextMenus);
        return () => document.removeEventListener('click', clearContextMenus);
    }, []);

    const clearContextMenus = () => {
        const contextMenus = document.querySelectorAll(`.${styles.contextMenuBtn} ~.${styles.active}`);
        contextMenus.forEach((menu) => {
            menu.classList.remove(styles.active);
        });
    };

    return (
        <>
            <button
                type='button'
                className={styles.contextMenuBtn}
                onClick={() => {
                    setTimeout(() => {
                        document.getElementById(`contextMenu${id}`).classList.toggle(styles.active);
                    }, 100);
                }}
            >
                <Menu size='28' />
            </button>
            <div
                className={styles.contextMenu}
                id={`contextMenu${id}`}
                onClick={() => deleteImage(image)}
            >
                <button type='button' className={styles.menuBtn}>
                    <Trash size='20' />Delete
                </button>
                <Link className={styles.menuBtn} href={`/uploads/${image}`} download={true}>
                    <Download size='20' />Download
                </Link>
            </div>
        </>
    );
}