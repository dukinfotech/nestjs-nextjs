import * as bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const hashPassword = await bcrypt.hash('@Password888', 10);
  await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      name: 'Admin',
      username: 'admin',
      email: 'admin@example.com',
      password: hashPassword,
      role: 'ADMIN',
      profile: {},
    },
  });
}
main()
  .then(async () => {
    console.log(`Seeding finished`);
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
