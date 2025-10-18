'use server';

import { auth0 } from '@/lib/auth';
import db from '@/lib/prisma.server';
import { randomUUID } from 'crypto';
import QRCode from 'qrcode';
import fs from 'fs/promises';
import path from 'path';

interface data {
  idCardNumber: number;
  selectedNumbers: number[];
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

  const ticketUuid = randomUUID();
  const qrCodeImageLink = `/tickets/${ticketUuid}.png`;
  const ticketUrl = `${process.env.APP_BASE_URL}/tickets/${ticketUuid}`;

  const ticketsDir = path.join(process.cwd(), 'public', 'tickets');

  const filename = `${ticketUuid}.png`;
  const filepath = path.join(ticketsDir, filename);
  await fs.mkdir(ticketsDir, { recursive: true });

  const pngBuffer = await QRCode.toBuffer(ticketUrl, { type: 'png', width: 300 });
  await fs.writeFile(filepath, pngBuffer);

  return await db.tickets.create({
    data: {
      uuid: ticketUuid,
      idCardNumber: data.idCardNumber.toString(),
      predictedNumbers: data.selectedNumbers,
      lotteryRoundId: activeRound.id,
      userId: user?.id,
      qrCodeImageLink: qrCodeImageLink,
    },
  });
}
