import { prismaClient } from '../../bin';

export default async function clearDB() {
     await prismaClient.request.deleteMany();
}