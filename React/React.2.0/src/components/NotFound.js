import React from 'react';

export default function NotFound({ isNavExpanded }) {
    return (
        <main className={isNavExpanded ? 'notFound navExpanded' : 'notFound'}>
            <div className='innerMain'>
                <h1>404 - Not Found</h1>
                <p>This page doesn't exist...</p>
                <a href='http://localhost:3000/'>Take me home!</a>
            </div>
        </main>
    );
}