import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='not_found'>
            <h1>Not Found | 404<hr /></h1>
            <p>It seems the page you requested does not exist</p>
            <Link href={'/'}>Take me home!</Link>
        </div>
    );
}