'use client';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Image from 'next/image';
import styles from './form.module.scss';

export default function RegisterForm() {
    const [imageSelected, setImageSelected] = useState(null);
    const [error, setError] = useState('');
    const router = useRouter();

    const register = async e => {
        try {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);

            const res = await axios.post('/api/auth/reg', formData);

            if (res.data.error) {
                return setError(res.data.error);
            }

            await signIn('credentials', {
                name: formData.get('name'),
                password: formData.get('password1'),
                redirect: false,
            });

            router.refresh();
            router.push(`/users/${formData.get('name')}`);
        } catch (error) {
            setError(error.message);
        }
    }

    const hideErrors = e => {
        e.target.classList.add(styles.hide);
        setTimeout(() => {
            setError('');
            e.target.classList.remove(styles.hide);
        }, 500);
    }

    const handleChange = e => {
        setImageSelected(e.target.files[0].name);
    }

    return (
        <div className={styles.form_wrapper}>
            <form className={styles.form} onSubmit={register} encType='multipart/form-data'>
                <div className={styles.form_title}>
                    <h1>Register</h1>
                    <Link href={'/login'}>Login</Link>
                </div>
                <div className={styles.form_input}>
                    <input type='text' id='name' name='name' placeholder='Name*' required autoFocus autoComplete='name' />
                </div>
                <div className={styles.form_input}>
                    <input type='email' id='email' name='email' placeholder='Email*' required autoComplete='email' />
                </div>
                <div className={styles.form_input}>
                    <input type='password' id='password1' name='password1' placeholder='Password*' required />
                </div>
                <div className={styles.form_input}>
                    <input type='password' id='password2' name='password2' placeholder='Password confirmation*' required />
                </div>
                <div className={styles.form_input}>
                    <input type='date' id='birth' name='birth' placeholder='Birth' />
                </div>
                <div className={styles.form_input}>
                    <label htmlFor='image' id={styles.image_label}>
                        {imageSelected ? `Selected image: ${imageSelected}` : 'Select image'}
                        <Image src={'/image.svg'} alt='' width={25} height={25} />
                    </label>
                    <input type='file' id='image' name='image' placeholder='Image' style={{ display: 'none' }} onChange={handleChange} />
                </div>
                <div className={styles.form_input}>
                    <button type='submit'><Image src={'/register.svg'} alt='' width={25} height={25} />Register</button>
                </div>
                <div className={styles.errors} onMouseEnter={e => hideErrors(e)}>
                    {error &&
                        <div className={styles.error}><Image src={'/danger.svg'} alt='' width={25} height={25} />{error}</div>
                    }
                </div>
            </form>
        </div>
    );
}