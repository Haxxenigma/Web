import { verify } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { createConnection } from 'mysql2/promise';

export default async function getUser() {
    const cookie = cookies().get('token');
    if (!cookie) return null;

    const decoded = verify(cookie.value, process.env.JWT_KEY);
    const conn = await createConnection(process.env.DATABASE_URL);

    try {
        const [[user]] = await conn.query(
            `SELECT * FROM User Where id=${decoded.id}`,
        );

        const { password, ...userData } = user;
        return userData;
    } catch (err) {
        console.error(err);
    } finally {
        await conn.end();
    }
}