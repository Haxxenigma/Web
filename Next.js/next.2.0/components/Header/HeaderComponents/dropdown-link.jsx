import Link from 'next/link';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';

export default function DropwdownLink({ isLoading, user, path, value }) {
    const router = useRouter();

    const logOut = e => {
        e.preventDefault();
        deleteCookie('auth', { path: '/' });
        router.push('/');
        router.refresh();
    };

    return (
        <>
            {
                isLoading || !user ? <span>Loading...</span> :
                    <Link
                        href={path}
                        onClick={e => path === 'logout' ? logOut(e) : null}>
                        {value}
                    </Link>
            }
        </>
    );
}