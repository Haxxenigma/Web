'use client';
import { useEffect, useState } from 'react';
import GalleryList from '@/components/gallery/list';
import GalleryUpload from '@/components/gallery/upload';
import styles from './gallery.module.scss';
import axios from '@/utils/axios';

export default function Gallery() {
    const [images, setImages] = useState(null);

    const getImages = () => {
        axios.get('/images').then((res) => setImages(res.data));
    };

    useEffect(() => {
        getImages();
    }, []);

    return (
        <div className={styles.gallery}>
            <GalleryUpload getImages={getImages} />
            <GalleryList images={images} getImages={getImages} />
        </div >
    );
}