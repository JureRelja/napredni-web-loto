import db from '@/app/prisma.server'

export async function POST(request: Request) {
  try {
    const data = await request.json()
    const numbers = data.numbers as number[]

    const activeRound = await db.lotteryRounds.findFirst({
      where: {
        areSubmissionsAllowed: true 
      },
    })

    if (activeRound?.areSubmissionsAllowed === false && activeRound?.drawnNumbers.length === 0) {
      const updatedRound = await db.lotteryRounds.update({
        where: { 
          id: activeRound.id 
        },
        data: {
          areSubmissionsAllowed: false,
          drawnNumbers: numbers,
        },
      })
      return new Response(JSON.stringify(updatedRound), { status: 204 })
    }

    return new Response('Bad request', { status: 400 })
  } catch (error) {
    console.error('Error closing lottery round:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
