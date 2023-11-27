import jwt from 'jsonwebtoken';
import prisma from '@/configs/prisma';
import { jwtSign, validateEmail, validateFields } from '@/scripts/validators';
import { getCookie } from 'cookies-next';
import { cookies } from 'next/headers';
import { compare } from 'bcrypt';

export async function GET() {
    const token = getCookie('auth', { cookies });

    if (!token) return Response.json({});

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await prisma.Users.findUnique({
        where: {
            id: decoded.id,
        },
    });
    const { password, ...userData } = user;

    return Response.json({ ...userData }, { status: 200, statusText: 'OK' });
}

export async function POST(req) {
    const data = await req.json();

    const res = await validateFields(data);
    if (res) return res;

    const user = await prisma.Users.findUnique({
        where: {
            name: data.name,
        },
    });

    if (user && await compare(data.password, user.password)) {
        return jwtSign(user);
    }

    return Response.json({}, { status: 401, statusText: 'Incorrect login or password' });
}

export async function PATCH(req) {
    const data = await req.json();
    const { bio, ...requiredData } = data;

    const res = await validateFields(requiredData);
    if (res) return res;

    const res2 = await validateEmail(data.email);
    if (res2) return res2;

    const isExist = await prisma.Users.findMany({
        where: {
            OR: [
                {
                    AND: [
                        {
                            name: {
                                equals: data.name,
                            },
                        },
                        {
                            NOT: {
                                name: {
                                    equals: data.initialName,
                                },
                            },
                        },
                    ],
                },
                {
                    AND: [
                        {
                            email: {
                                equals: data.email,
                            },
                        },
                        {
                            NOT: {
                                email: {
                                    equals: data.initialEmail,
                                },
                            },
                        },
                    ],
                },
            ],
        },
    });

    if (isExist.length) return Response.json({}, { status: 400, statusText: 'Name or email already in use' });

    const user = await prisma.Users.update({
        where: {
            name: data.initialName,
        },
        data: {
            name: data.name,
            email: data.email,
            bio: data.bio,
        },
    });

    return jwtSign(user);
}