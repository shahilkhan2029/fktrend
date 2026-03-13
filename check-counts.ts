import prisma from './lib/prisma';

async function main() {
  const categories = await prisma.product.groupBy({
    by: ['category'],
    _count: {
      category: true,
    },
    where: {
      available: true,
    },
  });
  console.log(JSON.stringify(categories, null, 2));
}

main();
