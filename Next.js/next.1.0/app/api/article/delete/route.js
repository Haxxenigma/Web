import prisma from '@/db';

export async function POST(request) {
    const res = await request.json();
    await prisma.Articles.delete({
        where: {
            id: res.article_id,
        },
    });
    return Response.json({ message: 'ok' });
}