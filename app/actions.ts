'use server'

import { auth0 } from '@/lib/auth';
import db from '@/lib/prisma.server'
 
interface data {
  idCardNumber: number
  selectedNumbers: number[]
}

export async function createNewTicket(data: data) {
  const activeRound = await db.lotteryRounds.findFirst({
    include: {
      tickets: true,
    },
    orderBy: {
      id: 'desc',
    },
  });
  if (!activeRound || !activeRound.areSubmissionsAllowed) return;

  const session = await auth0.getSession();

  const user = await db.users.findUnique({
    where: {
      email: session?.user.email,
    },
  });
  if (!user) return;

  const ticket = await db.tickets.create({
    data: {
      idCardNumber: data.idCardNumber.toString(),
      predictedNumbers: data.selectedNumbers,
      lotteryRoundId: activeRound.id,
      userId: user?.id,
    },
  })

  return ticket
}
