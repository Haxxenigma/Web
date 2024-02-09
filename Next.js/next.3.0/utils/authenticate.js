import { sign } from 'jsonwebtoken';
import { cookies } from 'next/headers';

export default function authenticate(id) {
    return new Promise((resolve) => {
        const token = sign({ id: id }, process.env.JWT_KEY, { expiresIn: '2d' });
        cookies().set('token', token);
        resolve();
    });
}