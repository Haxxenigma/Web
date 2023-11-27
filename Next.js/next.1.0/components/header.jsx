import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
    const session = useSession();
    const pathname = usePathname();

    const links = [
        {
            path: '/',
            title: 'Home',
        },
        {
            path: '/about',
            title: 'About',
        },
        {
            path: '/blog',
            title: 'Blog',
        },
    ];

    const activeLink = links.find((link) => link.path === pathname);

    return (
        <header className='header'>
            <nav className='nav'>
                <Link className='logo' href={'/'}>
                    <Image src={'/next.svg'} alt='' width={50} height={50} />
                </Link>
                <div className='nav_links'>
                    {
                        links.map((link, i) => (
                            <Link
                                className={`link ${activeLink && activeLink.path === link.path ? 'active' : ''}`}
                                href={link.path}
                                key={i}
                            >
                                {link.title}
                            </Link>
                        ))
                    }
                </div>
                <div className='profile_menu profile_menu_hoverable'>
                    <Link className='profile_menu_link' href={session.data ? `/users/${session.data.user.name}` : '/login'}>
                        <div className='profile_menu_arrow'>
                            <Image src='/arrow.svg' alt='' width={20} height={20} />
                        </div>
                        <div className='profile_menu_name'>{session.data ? `${session.data.user.name}` : 'Log In'}</div>
                        <div className='profile_menu_ava'>
                            <Image src={session.data ? `${session.data.user.image}` : '/default.svg'} alt='' width={35} height={35} priority />
                        </div>
                    </Link>
                    <div className='profile_dropdown'>
                        <div className='profile_dropdown_info'>Account</div>
                        {session.data &&
                            <Link href={`/users/${session.data.user.name}`}>
                                <Image src={'/profile.svg'} alt='' width={20} height={20} />Profile
                            </Link>
                        }

                        {session.data ?
                            <>
                                <Link href={'#'} onClick={() => signOut({ callbackUrl: '/' })}>
                                    <Image src={'/logout.svg'} alt='' width={20} height={20} />Log Out
                                </Link>
                                <Link href={'/chat'}>
                                    <Image src={'/chat.svg'} alt='' width={20} height={20} />Chat
                                </Link>
                            </> :
                            <>
                                <Link href={'/login'}>
                                    <Image src={'/login.svg'} alt='' width={20} height={20} />Log In
                                </Link>
                                <Link href={'/register'}>
                                    <Image src={'/register.svg'} alt='' width={20} height={20} />Register
                                </Link>
                            </>
                        }

                        <div className='profile_dropdown_info'>Site</div>
                        <Link href={'/blog'}>
                            <Image src={'/blog.svg'} alt='' width={20} height={20} />Blog
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}