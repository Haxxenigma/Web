import prisma from '@/db';

export async function POST(request) {
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const initial_username = formData.get('initial_username');
    const initial_email = formData.get('initial_email');
    const bio = formData.get('bio') ? formData.get('bio') : null;
    const birth = formData.get('birth') ? formData.get('birth') + 'T00:00:00-00:00' : null;

    const exist = await prisma.Users.findMany({
        where: {
            OR: [
                {
                    AND: [
                        {
                            name: {
                                equals: name,
                            },
                        },
                        {
                            NOT: {
                                name: {
                                    equals: initial_username,
                                },
                            },
                        },
                    ],
                },
                {
                    AND: [
                        {
                            email: {
                                equals: email,
                            },
                        },
                        {
                            NOT: {
                                email: {
                                    equals: initial_email,
                                },
                            },
                        },
                    ],
                },
            ],
        },
    });

    if (exist.length) return Response.json({ error: 'User with this name or email already exists' });

    const result = await prisma.Users.findUnique({
        where: {
            name: initial_username,
        },
    });

    const password = result.password;

    await prisma.Users.update({
        where: {
            name: initial_username,
        },
        data: {
            name: name,
            email: email,
            bio: bio,
            birth: birth,
        },
    });

    return Response.json({ message: 'Profile settings successfully updated', name, password });
}