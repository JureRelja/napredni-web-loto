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

    const activeRound = await db.lotteryRounds.findFirst({
      where: { areSubmissionsAllowed: true },
    })

    if (activeRound) {
      return new Response(undefined, { status: 204 })
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
