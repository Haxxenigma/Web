import { writeFileSync } from 'fs';
import { hash } from 'bcrypt';
import prisma from '@/db';
import path from 'path';

export async function POST(request) {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const password1 = formData.get('password1');
    const password2 = formData.get('password2');
    const birth = formData.get('birth') ? formData.get('birth') + 'T00:00:00-00:00' : null;
    const image = formData.get('image');

    const exist = await prisma.Users.findMany({
        where: {
            OR: [
                {
                    name: {
                        equals: name,
                    },
                },
                {
                    email: {
                        equals: email,
                    },
                },
            ],
        },
    });

    if (exist.length) return Response.json({ error: 'Name or email already exists' });
    if (password1 !== password2) return Response.json({ error: 'Passwords don\'t match' });

    const password = await hash(password1, 10);
    let imagePath = '/default.svg';

    if (image.name) {
        const ext = path.extname(image.name);
        const buffer = Buffer.from(await image.arrayBuffer());
        writeFileSync(`./public/uploads/${name}${ext}`, buffer);
        imagePath = `/uploads/${name}${ext}`;
    }

    await prisma.Users.create({
        data: {
            name: name,
            email: email,
            password: password,
            birth: birth,
            image: imagePath,
        },
    });

    return Response.json({ message: 'ok' });
}