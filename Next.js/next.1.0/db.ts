import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
    return new PrismaClient();
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// import { createConnection } from 'mysql2/promise';

// const connectToDatabase = async () => {
//     const db = await createConnection({
//         host: process.env.HOST,
//         user: process.env.USER,
//         password: process.env.PASS,
//         database: process.env.DB,
//     });

//     await db.connect();
//     return db;
// }

// export default async function execQuery(query, values) {
//     const db = await connectToDatabase();
//     try {
//         const res = await db.query(query, values);
//         return res;
//     } catch (err) {
//         return { err };
//     } finally {
//         db.end();
//     }
// }