import { rm } from 'fs/promises';

export async function DELETE(_, { params }) {
    const image = await params.image;
    await rm(`./public/uploads/${image}`);
    return Response.json({ msg: 'success' });
}