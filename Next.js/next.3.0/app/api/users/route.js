import { createConnection } from 'mysql2/promise';
import authenticate from '@/utils/authenticate';

export async function POST(req) {
    const conn = await createConnection(process.env.DATABASE_URL);
    const data = await req.json();

    try {
        const [user] = await conn.query(
            `INSERT INTO User(name, email, password) VALUES('${data.name}', '${data.email}', '${data.password}')`,
        );
        await authenticate(user.insertId);
        return Response.json({ id: user.insertId });
    } catch (err) {
        console.error(err);
        if (err.code === 'ER_DUP_ENTRY') {
            return Response.json({
                field: 'email',
                error: 'Email is already in use',
            }, { status: 404 });
        }
        return Response.json({ success: false });
    } finally {
        await conn.end();
    }
}