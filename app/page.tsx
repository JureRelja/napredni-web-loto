import React from 'react';
import db from '@/lib/prisma.server';
import { auth0 } from '@/lib/auth';
import Link from 'next/link';

export default async function Home() {
  const activeRound = await db.lotteryRounds.findFirst({
    include: {
      tickets: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

  const session = await auth0.getSession();

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      {activeRound ? (
        <>
          <h2 className="text-xl font-semibold">Trenutno kolo</h2>
          <p>Broj uplaćenih listića: {activeRound?.tickets.length ?? 0}</p>

          {activeRound.drawnNumbers.length > 0 && !activeRound.areSubmissionsAllowed && (
            <p>Izvučeni brojevi: {activeRound.drawnNumbers.join(', ')}</p>
          )}

          {activeRound.areSubmissionsAllowed && session?.user && (
            <button className="mt-4 px-4 py-2 bg-amber-800 text-white rounded">
              <Link href="/new-ticket">Uplati listić</Link>
            </button>
          )}
        </>
      ) : (
        <p className="text-lg font-semibold">Trenutno ni jedno kolo nije aktivno.</p>
      )}
    </div>
  );
}
