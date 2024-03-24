import { PrismaClient } from "@prisma/client";
import BOOK_LIBRARY from "~/lib/library";

const prisma = new PrismaClient();

async function main() {
  for (const book of BOOK_LIBRARY) {
    await prisma.book.upsert({
      select: {
        id: true,
      },
      where: { id: book.id },
      update: {
        title: book.title,
        image: book.image,
        headline: book.headline,
        color: book.color,
        tags: book.tags,
        updatedAt: new Date(),
      },
      create: {
        id: book.id,
        title: book.title,
        image: book.image,
        headline: book.headline,
        color: book.color,
        tags: book.tags,
        createdAt: new Date(Date.parse(book.createdAt)),
        updatedAt: new Date(Date.parse(book.createdAt)),
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
