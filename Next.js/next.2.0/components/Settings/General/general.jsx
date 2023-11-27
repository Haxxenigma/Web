'use client';
import Image from 'next/image';
import axios from '@/configs/axios';
import styles from './general.module.scss';
import ErrorModal from '@/components/ErrorModal/error-modal';
import updateCookie from '@/scripts/updateCookie';
import { useEffect, useRef, useState } from 'react';
import { createRipples } from '@/scripts/scripts';
import { useRouter } from 'next/navigation';
import { Check } from 'lucide-react';

const fields = [
    {
        type: 'text',
        id: 'name',
        label: 'Name',
    },
    {
        type: 'text',
        id: 'email',
        label: 'Email',
    },
];

export default function General({ user }) {
    const router = useRouter();
    const dropdown = useRef();
    const dropdownBtn = useRef();
    const uploadInput = useRef();
    const [error, setError] = useState('');
    const [values, setValues] = useState({
        name: user.name,
        email: user.email,
        bio: user.bio,
    });

    useEffect(() => {
        document.addEventListener('click', hideDropdown);
        return () => document.removeEventListener('click', hideDropdown);
    }, []);

    const showDropdown = () => {
        dropdown.current.classList.toggle(styles.show);
    };

    const hideDropdown = e => {
        if (!dropdownBtn.current.contains(e.target)) {
            dropdown.current.classList.remove(styles.show);
        }
    };

    const updateImage = async e => {
        try {
            const formData = new FormData();
            formData.append('image', e.target.files[0]);
            formData.append('name', user.name);

            const res = await axios.patch('/user/img', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            updateCookie(res.data.token, `/users/${res.data.name}/settings`, router, setError);
        } catch (err) {
            setError(err.response.statusText);
            console.error(`Error occured: ${err.response.statusText}`);
        }
    };

    const removeImage = async () => {
        try {
            const res = await axios.delete('/user/img', { params: { name: user.name } });
            updateCookie(res.data.token, `/users/${res.data.name}/settings`, router, setError);
        } catch (err) {
            setError(err.response.statusText);
            console.error(`Error occured: ${err.response.statusText}`);
        }
    };

    const updateUser = async e => {
        try {
            e.preventDefault();
            const res = await axios.patch('/user', {
                ...values, initialName: user.name, initialEmail: user.email,
            });
            updateCookie(res.data.token, `/users/${res.data.name}/settings`, router, setError);
        } catch (err) {
            setError(err.response.statusText);
            console.error(`Error occured: ${err.response.statusText}`);
        }
    };

    return (
        <>
            <ErrorModal error={error} setError={setError} />
            <form className={styles.form} onSubmit={updateUser} encType='multipart/form-data'>
                <div className={styles.formTitle}>
                    <h1>General</h1>
                </div>
                {fields.map((field, index) => (
                    <div className={styles.formFieldWrapper} key={index}>
                        <input
                            className={styles.formInput}
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            value={values[field.id]}
                            autoComplete='off'
                            onChange={e => setValues({ ...values, [field.id]: e.target.value })} />
                        <div className={styles.formLabel}>{field.label}</div>
                    </div>
                ))}

                <div className={styles.formFieldWrapper}>
                    <textarea
                        className={styles.formTextarea}
                        id='bio'
                        name='bio'
                        value={values.bio}
                        onChange={e => setValues({ ...values, bio: e.target.value })} />
                    <div className={styles.formLabel}>Bio</div>
                </div>

                <div className={styles.formFieldWrapper}>
                    <input
                        type='file'
                        id='image'
                        name='image'
                        ref={uploadInput}
                        onChange={e => updateImage(e)} />
                    <div className={styles.formUpload}>
                        <div className={styles.uploadImage}>
                            <Image src={user.image} alt='' width={100} height={100} />
                        </div>
                        <div className={styles.dropwdownWrapper}>
                            <button
                                type='button'
                                className={styles.dropdownBtn}
                                ref={dropdownBtn}
                                onClick={() => showDropdown()}>
                                <span>Edit</span>
                            </button>
                            <div className={styles.dropdown} ref={dropdown}>
                                <button type='button' onClick={() => uploadInput.current.click()}>Upload</button>
                                <button type='button' onClick={() => removeImage()}>Remove</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.formLabel}>Image</div>
                </div>

                <div className={styles.formSubmitWrapper}>
                    <div className={styles.formSubmitBtnCnt}>
                        <button type='submit' id='submit' onMouseDown={e => createRipples(e, styles)}>
                            <Check size={20} />Save
                        </button>
                    </div>
                    <div className={styles.formLabel} />
                </div>
            </form>
        </>
    );
}