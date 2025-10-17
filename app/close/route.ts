import db from '@/lib/prisma.server'

export async function POST() {
  try {
    const activeRound = await db.lotteryRounds.findFirst({
      where: { areSubmissionsAllowed: true },
    })

    if (!activeRound) {
      return new Response(undefined, { status: 204 })
    }

    const closedRound = await db.lotteryRounds.update({
      where: { 
        id: activeRound.id 
      },
      data: {
        areSubmissionsAllowed: false,
      },
    })

    return new Response('Lottery round closed successfully.', { status: 200 })
  } catch (error) {
    console.error('Error closing lottery round:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
