import { createConnection } from 'mysql2/promise';
import authenticate from '@/utils/authenticate';

export async function POST(req) {
    const conn = await createConnection(process.env.DATABASE_URL);
    const data = await req.json();

    try {
        const [[user]] = await conn.query(
            `SELECT * FROM User Where email='${data.email}' AND password='${data.password}'`,
        );
        if (!user) {
            return Response.json({
                field: 'password',
                error: 'Incorrect email or password',
            }, { status: 404 });
        }
        await authenticate(user.id);
        return Response.json({ id: user.id });
    } catch (err) {
        console.error(err);
        return Response.json({ success: false });
    } finally {
        await conn.end();
    }
}