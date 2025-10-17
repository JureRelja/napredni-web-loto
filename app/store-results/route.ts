import db from '@/lib/prisma.server'
import { verifyToken } from '../utils'

export async function POST(request: Request) {
  try {
     // validate token
    try {
      await verifyToken(request.headers.get('authorization') ?? undefined)
    } catch (err) {
      console.error('Auth failed:', err)
      return new Response('Unauthorized', { status: 401 })
    }

    const data = await request.json()
    const numbers = data.numbers as number[]

    const activeRound = await db.lotteryRounds.findFirst({
      where: {
        areSubmissionsAllowed: false,
        drawnNumbers: {
          equals: [],
        },
      },
      orderBy: {
        id: 'asc',
      },
      include: {
        tickets: true,
      },
    })

    if (activeRound?.drawnNumbers.length === 0) {
      const updatedRound = await db.lotteryRounds.update({
        where: { 
          id: activeRound.id 
        },
        data: {
          areSubmissionsAllowed: false,
          drawnNumbers: numbers,
        },
      })
      return new Response(undefined, { status: 204 })
    }

    return new Response('Bad request', { status: 400 })
  } catch (error) {
    console.error('Error closing lottery round:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}
