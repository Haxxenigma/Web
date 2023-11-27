'use client';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import axios from 'axios';
import Image from 'next/image';

export default function SettingsForm({ styles, user }) {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const router = useRouter();
    const dropdown = useRef();
    const imgRmModal = useRef();
    const dropdownMenuBtn = useRef();

    useEffect(() => {
        document.addEventListener('click', handleDocClick);
        return () => {
            document.removeEventListener('click', handleDocClick);
        }
    }, []);

    const handleDocClick = e => {
        if (
            dropdown.current.classList.contains(styles.active) &&
            !dropdown.current.contains(e.target) &&
            !dropdownMenuBtn.current.contains(e.target)
        ) {
            dropdown.current.classList.remove(styles.active);
        }
    }

    const hideErrors = e => {
        e.target.classList.add(styles.hide);
        setTimeout(() => {
            setError('');
            e.target.classList.remove(styles.hide);
        }, 500);
    }

    const hideSuccess = e => {
        e.target.classList.add(styles.hide);
        setTimeout(() => {
            setSuccess('');
            e.target.classList.remove(styles.hide);
        }, 500);
    }

    const showDropdown = () => {
        dropdown.current.classList.toggle(styles.active);
    }

    const showModal = () => {
        imgRmModal.current.classList.add(styles.active);
    }

    const hideModal = () => {
        imgRmModal.current.classList.remove(styles.active);
    }

    const setImage = async e => {
        try {
            const img = e.target.files[0];
            const formData = new FormData();
            formData.append('name', user.name);
            formData.append('img', img);

            const res = await axios.post('/api/user/set-img', formData);

            dropdown.current.classList.remove(styles.active);

            await signIn('credentials', {
                name: user.name,
                password: user.password,
                redirect: false,
            });

            router.refresh();
            setSuccess(res.data.message);
        } catch (error) {
            setError(error.message);
        }
    }

    const removeImage = async () => {
        try {
            const res = await axios.post('/api/user/rm-img', {
                name: user.name,
                img: user.image
            });

            imgRmModal.current.classList.remove(styles.active);

            await signIn('credentials', {
                name: user.name,
                password: user.password,
                redirect: false,
            });

            router.refresh();
            setSuccess(res.data.message);
        } catch (error) {
            setError(error.message);
        }
    }

    const handleSubmit = async e => {
        try {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            formData.append('initial_username', user.name);
            formData.append('initial_email', user.email);

            const res = await axios.post('/api/user/edit', formData);

            if (res.data.error) {
                return setError(res.data.error);
            }

            await signIn('credentials', {
                name: res.data.name,
                password: res.data.password,
                redirect: false,
            });

            router.refresh();
            router.push(`/users/${res.data.name}/settings`);
            setSuccess(res.data.message);
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <form className={styles.form_wrapper} onSubmit={handleSubmit}>
            <div className={styles.form_left}>
                <div className={styles.form_input}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' name='name' defaultValue={user.name} required autoFocus autoComplete='name' />
                </div>
                <div className={styles.form_input}>
                    <label htmlFor='email'>Email</label>
                    <input type='email' id='email' name='email' placeholder='example@email.com' defaultValue={user.email} autoComplete='email' />
                </div>
                <div className={styles.form_input}>
                    <label htmlFor='bio'>Bio</label>
                    <textarea id='bio' name='bio' rows={3} placeholder='Tell us about yourself' defaultValue={user.bio} />
                </div>
                <div className={styles.form_input}>
                    <label htmlFor='birth'>Email</label>
                    <input type='date' id='birth' name='birth' defaultValue={user.birth} />
                </div>
                <div className={styles.form_input}>
                    <div className={styles.submit}>
                        <button type='submit'>
                            <Image src={'/submit.svg'} alt='' width={20} height={20} />
                            Submit
                        </button>
                    </div>
                </div>
            </div>
            <div className={styles.form_right}>
                <div className={styles.form_input}>
                    <label htmlFor='image'>Image</label>
                    <div className={styles.user_image}>
                        <Image src={user.image} alt='' width={150} height={150} />
                    </div>
                    <div className={styles.dropdown_menu}>
                        <div className={styles.dropdown_menu_btn} onClick={showDropdown} ref={dropdownMenuBtn}>Edit</div>
                        <div className={styles.dropdown} ref={dropdown}>
                            <input type='file' id='image' name='image' className={styles.image_upload} onChange={setImage} />
                            <label htmlFor='image'>Upload an image</label>
                            <button type='button' onClick={showModal}>Remove image</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.img_rm_modal} ref={imgRmModal}>
                <div className={styles.modal_title}>
                    Are you sure you want to remove the image?
                </div>
                <div className={styles.modal_btns}>
                    <button type='button' onClick={hideModal}>Cancel</button>
                    <button type='button' onClick={removeImage}>Remove</button>
                </div>
            </div>
            <div className={styles.errors} onMouseEnter={e => hideErrors(e)}>
                {error &&
                    <div className={styles.error}><Image src={'/danger.svg'} alt='' width={25} height={25} />{error}</div>
                }
            </div>
            <div className={styles.successes} onMouseEnter={e => hideSuccess(e)}>
                {success &&
                    <div className={styles.success}><Image src={'/success.svg'} alt='' width={25} height={25} />{success}</div>
                }
            </div>
        </form>
    );
}