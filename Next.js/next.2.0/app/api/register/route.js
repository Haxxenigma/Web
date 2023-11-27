import prisma from '@/configs/prisma';
import { hash, genSalt } from 'bcrypt';
import { jwtSign, validateEmail, validateFields } from '@/scripts/validators';

export async function POST(request) {
    const data = await request.json();

    const res = await validateFields(data);
    if (res) return res;

    const res2 = await validateEmail(data.email);
    if (res2) return res2;

    if (data.password1 !== data.password2) {
        return Response.json({}, { status: 400, statusText: 'Passwords don\'t match' });
    }

    const isExist = await prisma.Users.findMany({
        where: {
            OR: [
                {
                    name: {
                        equals: data.name,
                    },
                },
                {
                    email: {
                        equals: data.email,
                    },
                },
            ],
        },
    });

    if (isExist.length) {
        return Response.json({}, { status: 400, statusText: 'Name or email already exists' });
    }

    const salt = await genSalt(10);
    const passwordHash = await hash(data.password1, salt);

    const user = await prisma.Users.create({
        data: {
            name: data.name,
            email: data.email,
            password: passwordHash,
        },
    });

    return jwtSign(user);
}