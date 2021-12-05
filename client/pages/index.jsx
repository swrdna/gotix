import Link from 'next/link'

const Home = ({ tickets }) => {
  const ticket = tickets.map(ticket =>
    <div className="col-12 col-md-3" key={ticket.id}>
      <div className="card">
        <div className="card-body">
          <h4>{ticket.title}</h4>
          <strong>{ticket.price}</strong>
          <div>
            <Link href='/tickets/[ticketId]' as={`/tickets/${ticket.id}`}>
              <a className="btn btn-primary btn-sm">Show</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container py-4">
      <div className="row">
        { ticket }
      </div>
    </div>
  )
}

Home.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/tickets')

  return { tickets: data }
}

export default Home
