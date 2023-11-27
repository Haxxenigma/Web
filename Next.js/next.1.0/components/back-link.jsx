'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function BackLink({ link }) {
    const router = useRouter();
    return (
        <button className='back_link' type='button' onClick={() => router.push(link)}>
            <Image src={'/back_thin.svg'} alt='' width={25} height={25} />Back
        </button>
    );
}