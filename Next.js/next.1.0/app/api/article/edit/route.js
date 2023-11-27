import prisma from '@/db';

export async function POST(request) {
    const formData = await request.formData();
    const id = formData.get('id');
    const title = formData.get('title');
    const content = formData.get('content');

    await prisma.Articles.update({
        where: {
            id: parseInt(id),
        },
        data: {
            title: title,
            content: content,
        },
    });

    return Response.json({ message: 'ok' });
}