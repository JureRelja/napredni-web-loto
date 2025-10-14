import db from '@/app/prisma.server'

interface TicketPublicPageProps {
  params: Promise<{ uuid: string }>,
}

export default async function TicketPublicPage(props: TicketPublicPageProps) {
  const { uuid } = await props.params
  
  const ticket = await db.tickets.findUnique({
    where: { 
      id: uuid
    },
  })
 
  return (
    <div>
      <h1>{ticket?.predictedNumbers.join(', ')}</h1>
    </div>
  )
}