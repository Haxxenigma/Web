import '@/styles/reset.scss';
import styles from '@/styles/main.module.scss';
import Header from '@/components/Header/header';
import Footer from '@/components/Footer/footer';
import Providers from '@/components/Providers/providers';
import { cookies } from 'next/headers';
import { getCookie } from 'cookies-next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['cyrillic', 'latin'] });

export default function RootLayout({ children }) {
    const cookie = getCookie('auth', { cookies });

    return (
        <html lang='en' dark=''>
            <body className={inter.className}>
                <Providers>
                    <Header cookie={cookie} />
                    <main className={styles.main}>{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}