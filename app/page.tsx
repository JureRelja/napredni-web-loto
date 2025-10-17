import React from 'react';
import db from '@/lib/prisma.server';
import { auth0 } from '@/lib/auth';
import Link from 'next/link';

export default async function Home() {
  const activeRound = await db.lotteryRounds.findFirst({
    where: {
      areSubmissionsAllowed: false,
    },
    include: {
      tickets: true,
    },
    orderBy: {
      id: 'desc',
    },
  });

  const session = await auth0.getSession();

  return (
    <div className="font-sans h-screen">
      <nav className="flex justify-between items-center p-6 bg-gray-100">
        <h1 className="text-3xl font-bold">Loto Aplikacija</h1>

        <div className="flex items-center justify-center gap-4">
          {session ? (
            <div>
              <p>Pozdrav, {session.user.name}!</p>
              <button type="submit" className="px-4 py-2 bg-red-500 text-white rounded">
                <Link href="/">Home</Link>
              </button>
            </div>
          ) : (
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              <Link href="/auth/login">Prijava</Link>
            </button>
          )}
        </div>
      </nav>

      <div className='p-6'>
        {activeRound ? (
          <>
            <h2 className="text-xl font-semibold">Trenutno kolo</h2>
            <p>Broj uplaćenih listića: {activeRound?.tickets.length ?? 0}</p>

            {activeRound.drawnNumbers.length > 0 && !activeRound.areSubmissionsAllowed && (
              <p>Izvučeni brojevi: {activeRound.drawnNumbers.join(', ')}</p>
            )}
          </>
        ) : (
          <p className="text-lg font-semibold">Trenutno ni jedno kolo nije aktivno.</p>
        )}
      </div>
    </div>
  );
}
