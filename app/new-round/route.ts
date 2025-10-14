import db from '@/app/prisma.server'

export async function POST() {
  try {
    const activeRound = await db.lotteryRounds.findFirst({
      where: { areSubmissionsAllowed: true },
    })

    if (activeRound) {
      return new Response('A lottery round is already active.', { status: 204 })
    }

    const newRound = await db.lotteryRounds.create({
      data: {
        areSubmissionsAllowed: true,
        drawnNumbers: [],
      },
    })

    return new Response(JSON.stringify(newRound), { status: 201 })
  } catch (error) {
    console.error('Error creating new lottery round:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
