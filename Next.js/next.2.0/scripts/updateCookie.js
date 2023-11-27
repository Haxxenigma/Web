import { setCookie } from 'cookies-next';

/**
 * set/update cookies
 * @param {string} token - user's token
 * @param {string} url - redirect link after successful result
 * @param {Function} router - useRouter function from next/navigation
 * @param {Function} [setError] - error clearing function
 */
export default function updateCookie(token, url, router, setError = null) {
    if (setError) setError('');
    setCookie('auth', token, {
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
    });
    router.push(url);
    router.refresh();
}