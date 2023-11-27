import Link from 'next/link';
import Images from './imges';
import styles from './home.module.scss';

export default function Home() {
    return (
        <div className='main'>
            <div className='wrapper'>
                <div className={styles.home}>
                    <Images styles={styles} />
                    <h1>Добро пожаловать на нашу викторину</h1>
                    <Link href={'/quiz'}>Начать игру</Link>
                </div>
            </div>
        </div>
    );
}