'use client';
import Link from 'next/link';
import axios from '@/configs/axios';
import styles from './form.module.scss';
import ErrorModal from '@/components/ErrorModal/error-modal';
import updateCookie from '@/scripts/updateCookie';
import { createRipples } from '@/scripts/scripts';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { LogIn } from 'lucide-react';

const fields = [
    {
        type: 'text',
        id: 'name',
        label: 'Name',
    },
    {
        type: 'password',
        id: 'password',
        label: 'Password',
    },
];

export default function LoginForm() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [values, setValues] = useState({
        name: '',
        password: '',
    });

    const login = async e => {
        try {
            e.preventDefault();
            const res = await axios.post('/user', values);
            updateCookie(res.data.token, `/users/${res.data.name}`, router, setError);
        } catch (err) {
            setError(err.response.statusText);
            console.error(`Authenticating error: ${err.response.statusText}`);
        }
    };

    return (
        <div className={styles.formWrapper}>
            <ErrorModal error={error} setError={setError} />
            <form className={styles.form} onSubmit={login}>
                <div className={styles.formTitle}>
                    <h1>Login</h1>
                </div>
                {fields.map((field, index) => (
                    <div className={styles.formInput} key={index}>
                        <input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            value={values[field.id]}
                            required
                            autoComplete='off'
                            onChange={e => setValues({ ...values, [field.id]: e.target.value })} />
                        <div className={styles.underline} />
                        <label htmlFor='name'>{field.label}</label>
                    </div>
                ))}
                <div className={styles.formLinks}>
                    <Link href={'/pwdreset'}>Forgot password?</Link>
                </div>
                <div className={styles.formSubmit}>
                    <button type='submit' onMouseDown={e => createRipples(e, styles)}>
                        <LogIn size={20} />
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}