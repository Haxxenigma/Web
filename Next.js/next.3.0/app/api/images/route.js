import { readdir, writeFile } from 'fs/promises';
import { extname } from 'path';

export async function POST(req) {
    const data = await req.formData();

    for (const [_, image] of data.entries()) {
        const buf = Buffer.from(await image.arrayBuffer());
        await writeFile(`./public/uploads/${Date.now()}-${image.name}${extname(image.name)}`, buf);
    }

    return Response.json({ success: true });
}

export async function GET() {
    const files = await readdir('./public/uploads');
    return Response.json(files);
}