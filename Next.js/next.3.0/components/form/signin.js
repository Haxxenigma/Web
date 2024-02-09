'use client';
import { fields } from './form-fields';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import MyInput from '@/components/ui/my-input';
import MyButton from '@/components/ui/my-button';
import MyError from '@/components/ui/my-error';
import styles from './form.module.scss';
import axios from '@/utils/axios';

export default function SignIn() {
    const { push, refresh } = useRouter();
    const {
        register,
        handleSubmit,
        setError,
        watch,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm();

    const signin = async (data) => {
        try {
            const res = await axios.post('/signin', data);
            push(`/users/${res.data.id}`);
            refresh();
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.field || 'root', {
                type: 'value',
                message: err.response?.data?.error,
            }, {
                shouldFocus: true,
            });
        }
    };

    return (
        <div className={styles.wrapper}>
            <form className={styles.form} onSubmit={handleSubmit(signin)}>
                <h1 className={styles.title}>Sign In</h1>
                {fields.slice(1).map((field) => (
                    <MyInput
                        field={field}
                        register={register}
                        errors={errors}
                        watch={watch}
                        key={field.id}
                    />
                ))}
                <MyButton
                    type='submit'
                    style={{
                        width: '100%',
                        marginTop: '15px',
                    }}
                    isSubmitting={isSubmitting}
                >Sign In</MyButton>
                <MyError error={errors.root} />
            </form>
        </div>
    );
}