'use client';
import { useState } from 'react';
import { RefreshCcw } from 'lucide-react';
import contextMenuStyles from './context-menu.module.scss';
import ContextMenu from './context-menu';
import styles from './list.module.scss';
import MyButton from '../ui/my-button';
import Link from 'next/link';
import axios from '@/utils/axios';

export default function GalleryList({ images, getImages }) {
    const [isRefreshing, setIsRefreshing] = useState(false);

    const deleteImage = async (image) => {
        await axios.delete(`/images/${image}`);
        await getImages();
    };

    return (
        <div className={styles.list}>
            <div className={styles.header}>
                <h1 className={styles.title}>Gallery</h1>
                <MyButton
                    onClick={() => {
                        getImages();
                        setIsRefreshing(true);
                        setTimeout(() => {
                            setIsRefreshing(false);
                        }, 500);
                    }}
                    className={`${isRefreshing && styles.isRefreshing}`}
                >
                    <RefreshCcw size='20' />
                </MyButton>
            </div>
            <div className={styles.images}>
                {images && images.sort().reverse().map((image, id) => (
                    <div className={styles.container} key={id} onContextMenu={(e) => {
                        e.preventDefault();
                        setTimeout(() => {
                            document.getElementById(`contextMenu${id}`).classList.toggle(contextMenuStyles.active);
                        }, 100);
                    }}>
                        <Link className={styles.imageCnt} href={`/uploads/${image}`}>
                            <img className={styles.image} src={`/uploads/${image}`} />
                        </Link>
                        <ContextMenu image={image} id={id} deleteImage={deleteImage} />
                    </div>
                ))}
            </div>
        </div>
    );
}