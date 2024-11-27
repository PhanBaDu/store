import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export default async function connectToDatabase() {
    try {
        await prisma.$queryRaw`SELECT 1`;
        console.log('Successfully connected to DB');
    } catch (error) {
        console.error('Could not connect to DB', error);
    } finally {
        await prisma.$disconnect();
    }
}
