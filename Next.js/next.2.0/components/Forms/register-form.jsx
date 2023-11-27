'use client';
import axios from '@/configs/axios';
import styles from './form.module.scss';
import ErrorModal from '@/components/ErrorModal/error-modal';
import updateCookie from '@/scripts/updateCookie';
import { createRipples } from '@/scripts/scripts';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UserPlus } from 'lucide-react';

const fields = [
    {
        type: 'text',
        id: 'name',
        label: 'Name',
    },
    {
        type: 'text',
        id: 'email',
        label: 'E-mail addres',
    },
    {
        type: 'password',
        id: 'password1',
        label: 'Password',
    },
    {
        type: 'password',
        id: 'password2',
        label: 'Confirm password',
    },
];

export default function RegisterForm() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [values, setValues] = useState({
        name: '',
        email: '',
        password1: '',
        password2: '',
    });

    const register = async e => {
        try {
            e.preventDefault();
            const res = await axios.post('/register', values);
            updateCookie(res.data.token, `/users/${res.data.name}`, router, setError);
        } catch (err) {
            setError(err.response.statusText);
            console.error(`Registration error: ${err.response.statusText}`);
        }
    };

    return (
        <div className={styles.formWrapper}>
            <ErrorModal error={error} setError={setError} />
            <form className={styles.form} onSubmit={register}>
                <div className={styles.formTitle}>
                    <h1>Register</h1>
                </div>
                {fields.map((field, index) => (
                    <div className={styles.formInput} key={index}>
                        <input
                            type={field.type}
                            id={field.id}
                            name={field.id}
                            value={values[field.id]}
                            autoComplete='off'
                            required
                            onChange={e => setValues({ ...values, [field.id]: e.target.value })} />
                        <div className={styles.underline} />
                        <label htmlFor='name'>{field.label}</label>
                    </div>
                ))}
                <div className={styles.formSubmit}>
                    <button type='submit' onMouseDown={e => createRipples(e, styles)}>
                        <UserPlus size={20} />
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}