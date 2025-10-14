// import { PrismaClient } from '../generated/prisma';

// const prisma = new PrismaClient();

// (async function main() {
//   try {
//     await prisma.$connect();
//     console.log(`Start seeding ...`);

//     await prisma.lotteryRounds.create({
//       data: {
//         id: 1,
//         areSubmissionsAllowed: false,
//         drawnNumbers: [],
//       },
//     });

//     console.log(`Seeding finished.`);
//     await prisma.$disconnect();
//     process.exit(0);
//   }
//   catch (e) {
//     console.error(e);
//     process.exit(1);
//   }
// })();