import { existsSync, rmSync } from 'fs';
import prisma from '@/db';

export async function POST(request) {
    const data = await request.json();
    const img = `./public${data.img}`;

    if (existsSync(img) && data.img !== '/default.svg') {
        await prisma.Users.update({
            where: {
                name: data.name,
            },
            data: {
                image: '/default.svg',
            },
        });
        rmSync(img);
    }

    return Response.json({ message: 'Profile image successfully removed' });
}