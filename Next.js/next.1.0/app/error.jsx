'use client';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
    useEffect(() => {
        console.error(`Error occured: ${error}`);
    }, [error]);

    return (
        <div className='error'>
            <h1>Something went wrong!</h1>
            <button onClick={() => reset()}>Try again</button>
        </div>
    );
}