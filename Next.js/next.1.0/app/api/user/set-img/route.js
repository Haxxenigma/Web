import { rm, writeFile } from 'fs/promises';
import prisma from '@/db';
import path from 'path';

export async function POST(request) {
    const formData = await request.formData();
    const name = formData.get('name');
    const img = formData.get('img');

    if (!img.name) return Response.json({ error: 'Error occured' }, { status: 400 });

    const initialImage = await prisma.Users.findUnique({
        where: {
            name: name,
        },
    });

    if (initialImage.image !== '/default.svg') {
        await rm(`./public${initialImage.image}`);
    }

    const ext = path.extname(img.name);
    const buffer = Buffer.from(await img.arrayBuffer());
    await writeFile(`./public/uploads/${name}${ext}`, buffer);
    const imagePath = `/uploads/${name}${ext}`;

    await prisma.Users.update({
        where: {
            name: name,
        },
        data: {
            image: imagePath,
        },
    });

    return Response.json({ message: 'Profile image successfully updated' });
}