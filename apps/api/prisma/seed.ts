import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

async function main() {
  const post1 = await prisma.user.upsert({
    where: { name: "Manuel Morales", phone: "123456789"},
    update: {},
    create: {
      name: "Manuel Morales",
      direction: "Av. Siempre viva",
      phone: "123456789"
    }
  });

  const post2 = await prisma.user.upsert({
    where: {
      name: "Juan Perez", phone: "1234567890"
    },
    update: {},
    create: {
      name: "Juan Perez",
      direction: "Av. Los sueños",
      phone: "1234567890"
    }
  });
  console.log( {post1, post2} )
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {

    await prisma.$disconnect();
  });
