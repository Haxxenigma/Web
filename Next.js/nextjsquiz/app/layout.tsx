import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '@/styles/reset.scss';
import '@/styles/globals.scss';

const inter = Roboto({
    subsets: ['latin', 'cyrillic'],
    weight: '400',
});

export const metadata: Metadata = {
    title: 'Quiz',
    description: 'Quiz game',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='ru'>
            <body className={inter.className}>
                <div className='wave1' />
                <div className='wave2' />
                <div className='wave3' />
                {children}
            </body>
        </html>
    );
}