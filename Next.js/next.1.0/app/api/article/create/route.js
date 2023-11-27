import prisma from '@/db';

export async function POST(request) {
    const formData = await request.formData();
    const title = formData.get('title');
    const content = formData.get('content');
    const author = formData.get('author');

    const user = await prisma.Users.findUnique({
        where: {
            name: author,
        },
    });

    const result = await prisma.Articles.create({
        data: {
            user_id: user.id,
            author: author,
            title: title,
            content: content,
        },
    });

    return Response.json({ id: result.id });
}