'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from '@/utils/axios';
import Loading from '../loading';

export default function SignOut() {
    const { push, refresh } = useRouter();

    useEffect(() => {
        signout();
    }, []);

    const signout = async () => {
        await axios.get('/signout');
        push('/');
        refresh();
    };

    return <Loading />;
}