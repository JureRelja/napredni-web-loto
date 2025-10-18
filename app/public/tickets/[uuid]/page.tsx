import db from '@/lib/prisma.server'
import Image from 'next/image'

interface TicketPublicPageProps {
  params: Promise<{ uuid: string }>,
}

export default async function TicketPublicPage(props: TicketPublicPageProps) {
  const { uuid } = await props.params
  
  const ticket = await db.tickets.findUnique({
    where: { 
      uuid: uuid
    },
    include: {
      lotteryRound: true,
    }
  })
 
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      {ticket ? (
        <div className='flex flex-col items-center gap-4'>
          <h1 className='text-2xl font-bold'>Detalji listića</h1>
          <p>UUID: {ticket.uuid}</p>
          <p>Broj osobne iskaznice: {ticket.idCardNumber}</p>
          <p>Predviđeni brojevi: {ticket.predictedNumbers.join(', ')}</p>

          {ticket.lotteryRound && ticket.lotteryRound.drawnNumbers.length > 0 && (
            <p>Izvućeni brojevi: {ticket.lotteryRound.drawnNumbers.join(', ')}</p>
          )}

          <Image src={ticket.qrCodeImageLink} alt="QR Code" width={192} height={192} className='w-48 h-48 mt-10' />
        </div>
      ) : (
        <p>Listić nije pronađen.</p>
      )}
    </div>
  )
}