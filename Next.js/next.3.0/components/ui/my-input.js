import styles from './my-input.module.scss';
import MyError from '@/components/ui/my-error';

export default function MyInput({ field, register, errors, watch }) {
    return (
        <div className={styles.field}>
            <label className={styles.label} htmlFor={field.id}>
                <input
                    className={
                        `${styles.input} ${errors[field.id] && styles.isError} ${watch(field.id) && styles.isNotEmpty}`
                    }
                    type={field.type || 'text'}
                    id={field.id}
                    name={field.id}
                    placeholder={field.label}
                    autoComplete={field.autoComplete || 'off'}
                    {...register(field.id, {
                        required: `${field.label} is required`,
                        validate: field.validate,
                    })}
                />
                <div className={styles.icon}>
                    {field.image}
                </div>
            </label>
            <MyError error={errors[field.id]} />
        </div>
    );
}