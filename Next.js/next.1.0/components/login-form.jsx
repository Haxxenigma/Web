'use client';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './form.module.scss';

export default function LoginForm() {
    const [error, setError] = useState('');
    const router = useRouter();

    const login = async e => {
        try {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);

            const res = await signIn('credentials', {
                name: formData.get('name'),
                password: formData.get('password'),
                redirect: false,
            });

            if (res && !res.error) {
                router.refresh();
                router.push(`/users/${formData.get('name')}`);
            } else {
                setError('Wrong name or password');
            }
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

    return (
        <div className={styles.form_wrapper}>
            <form className={styles.form} onSubmit={login}>
                <div className={styles.form_title}>
                    <h1>Login</h1>
                    <Link href={'/register'}>Register</Link>
                </div>
                <div className={styles.form_input}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' name='name' required autoFocus autoComplete='name' />
                </div>
                <div className={styles.form_input}>
                    <label htmlFor='password'>Password</label>
                    <input type='password' id='password' name='password' required />
                </div>
                <div className={styles.form_input}>
                    <button type='submit'><Image src={'/login.svg'} alt='' width={25} height={25} />Login</button>
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