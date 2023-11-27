'use client';
import styles from './profile.module.scss';
import ProfileHeader from './ProfileComponents/profile-header';
import { useActions } from '@/hooks/useActions';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export default function Profile({ user }) {
    const state = useSelector(state => state.user);
    const { getUserData } = useActions();

    useEffect(() => {
        getUserData();
    }, []);

    return (
        <div className={styles.profileWrapper}>
            <ProfileHeader styles={styles} user={user} state={state} />
        </div>
    );
}