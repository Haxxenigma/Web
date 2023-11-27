'use client';
import Providers from '@/components/providers';
import Header from '@/components/header';
import Footer from '@/components/footer';
import '@/styles/reset.scss';
import '@/styles/header.scss';
import '@/styles/main.scss';

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <Providers>
                    <Header />
                    <main className='main'>
                        {children}
                    </main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}