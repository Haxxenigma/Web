import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function HeaderLink({ className, url, image, innerHtml }) {
    const pathname = usePathname();

    return (
        <Link
            className={className}
            href={url}
            style={pathname === url ? { display: 'none' } : {}}>
            {image}
            {innerHtml}
        </Link>
    );
}