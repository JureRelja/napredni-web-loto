import db from '@/app/prisma.server'

export async function POST() {
  try {
    const activeRound = await db.lotteryRounds.findFirst({
      where: { areSubmissionsAllowed: true },
    })

    if (!activeRound) {
      return new Response('No active lottery round found.', { status: 204 })
    }

    const closedRound = await db.lotteryRounds.update({
      where: { 
        id: activeRound.id 
      },
      data: {
        areSubmissionsAllowed: false,
      },
    })

    return new Response(JSON.stringify(closedRound), { status: 200 })
  } catch (error) {
    console.error('Error closing lottery round:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
