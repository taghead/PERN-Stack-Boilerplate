import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const johndoe = await prisma.user.create({
    data: {
      name: "John Doe",
      email: "johndoe@jd.com"
    },
  });
  console.log({ johndoe });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });