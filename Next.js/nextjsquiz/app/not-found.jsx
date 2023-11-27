import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='main'>
            <div className='wrapper'>
                <div className='not_found'>
                    <h1>ПЕЙДЖ НОТ ФАУНД | 404 </h1>
                    <p>Похоже на то, что данной страницы не существует (((</p>
                    <Link href={'/'}>Вернуться</Link>
                </div>
            </div>
        </div>
    );
}