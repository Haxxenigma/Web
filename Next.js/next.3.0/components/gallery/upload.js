'use client';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Upload, X } from 'lucide-react';
import styles from './upload.module.scss';
import MyButton from '@/components/ui/my-button';
import MyError from '@/components/ui/my-error';
import axios from '@/utils/axios';

export default function GalleryUpload({ getImages }) {
    const [isDragActive, setIsDragActive] = useState(false);
    const [imgInfo, setImgInfo] = useState(null);
    const {
        register,
        handleSubmit,
        watch,
        reset,
        setValue,
        clearErrors,
        formState: {
            isSubmitting,
            errors,
        },
    } = useForm();

    useEffect(() => {
        clearErrors();
        setImgInfo({
            len: watch('images').length,
            img: watch('images')[0]?.name,
        });
    }, [watch('images')]);

    const upload = async (images) => {
        const formData = new FormData();

        for (let id = 0; id < images.length; id++) {
            formData.append(`image${id}`, images[id]);
        }

        await axios.post('/images', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        getImages();
        reset();
    };

    const onDrag = (e) => {
        e.preventDefault();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragActive(true);
        } else if (e.type === 'dragleave') {
            setIsDragActive(false);
        }
    };

    const onDrop = (e) => {
        e.preventDefault();
        setIsDragActive(false);
        if (e.dataTransfer.files?.[0]) {
            setValue('images', e.dataTransfer.files);
        }
    };

    return (
        <div className={styles.profile}>
            <form className={styles.form} onSubmit={handleSubmit(() => upload(watch('images')))}>
                <h1 className={styles.title}>Image Upload</h1>
                <label
                    className={`${styles.upload} ${isDragActive ? styles.dragActive : ''}`}
                    htmlFor='images'
                    onDrop={onDrop}
                    onDragOver={onDrag}
                    onDragEnter={onDrag}
                    onDragLeave={onDrag}
                >
                    <input
                        type='file'
                        id='images'
                        name='images'
                        multiple
                        className={styles.input}
                        {...register('images', {
                            validate: (images) => {
                                if (!watch('images').length) {
                                    return 'Please, upload an image first';
                                }
                                for (const image of images) {
                                    if (!image.type.startsWith('image/')) {
                                        return 'Only images are allowed';
                                    }
                                }
                            },
                        })}
                    />
                    {imgInfo?.len ? (
                        <>
                            <div className={styles.header}>
                                Image(s) selected: {imgInfo.len}
                            </div>
                            <div className={styles.footer}>
                                <div className={styles.filename}>
                                    {imgInfo.img}
                                </div>
                                <div>
                                    {imgInfo.len > 1 && (' and ' + (imgInfo.len - 1) + ' more...')}
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.header}>
                                Drag and drop your image here or
                            </div>
                            <div className={styles.footer}>
                                Select from explorer
                                <Upload size='18' />
                            </div>
                        </>
                    )}
                </label>
                <MyError error={errors.images} />
                <div className={styles.buttons}>
                    <MyButton
                        type={'button'}
                        inverse={true}
                        onClick={() => reset()}
                    ><X size='20' />Reset
                    </MyButton>
                    <MyButton
                        type={'submit'}
                        isSubmitting={isSubmitting}
                    >Submit</MyButton>
                </div>
            </form>
        </div >
    );
}