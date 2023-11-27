import prisma from '@/configs/prisma';
import path from 'path';
import { existsSync } from 'fs';
import { rm, writeFile } from 'fs/promises'
import { jwtSign } from '@/scripts/validatots';

export async function PATCH(request) {
    const formData = await request.formData();
    const image = formData.get('image');
    const name = formData.get('name');

    const initialImage = await prisma.Users.findUnique({
        where: {
            name: name,
        },
    });

    if (initialImage.image !== '/media/default_image.svg') {
        await rm(`./public/${initialImage.image}`);
    }

    const ext = path.extname(image.name);
    const buffer = Buffer.from(await image.arrayBuffer());
    const imagePath = `/uploads/${name}${ext}`;
    await writeFile(`./public${imagePath}`, buffer);

    const user = await prisma.Users.update({
        where: {
            name: name,
        },
        data: {
            image: imagePath,
        },
    });

    return jwtSign(user);
}

export async function DELETE(request) {
    const searchParams = request.nextUrl.searchParams;
    const name = searchParams.get('name');

    const user = await prisma.Users.findUnique({
        where: {
            name: name,
        },
    });

    if (!existsSync(`./public${user.image}`) || user.image === '/media/default_image.svg') {
        return Response.json({}, { status: 400, statusText: 'Image already deleted' });
    }

    await rm(`./public/${user.image}`);
    const updatedUser = await prisma.Users.update({
        where: {
            name: name,
        },
        data: {
            image: '/media/default_image.svg',
        },
    });

    return jwtSign(updatedUser);
}