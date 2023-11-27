import React from 'react';

export default function Home({ isNavExpanded }) {
    return (
        <main className={isNavExpanded ? 'home navExpanded' : 'home'}>
            <div className='innerHome'>
            </div>
        </main>
    );
}