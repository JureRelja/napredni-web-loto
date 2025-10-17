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
    <div className='flex flex-col items-center'>
      {ticket ? (
        <div className='flex flex-col items-center'>
          <h1>Detalji listića</h1>
          <p>UUID: {ticket.uuid}</p>
          <p>Broj osobne iskaznice: {ticket.idCardNumber}</p>
          <p>Predviđeni brojevi: {ticket.predictedNumbers.join(', ')}</p>

          {ticket.lotteryRound && ticket.predictedNumbers.length > 0 && (
            <p>Izvućeni brojevi: {ticket.lotteryRound.drawnNumbers.join(', ')}</p>
          )}

          <Image src={ticket.qrCodeImageLink} alt="QR Code"  className='w-48 h-48 mt-10' />
        </div>
      ) : (
        <p>Listić nije pronađen.</p>
      )}
    </div>
  )
}