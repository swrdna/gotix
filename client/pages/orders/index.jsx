const OrderIndex = ({ orders }) => {
  const STATUS_COLOR = {
    'cancelled': 'danger',
    'complete': 'success'
  }

  return (
    <div className="container py-4">
      <h1>My Orders</h1>
      <ul className="list-group">
        {orders.map(order =>
          <li key={order.id} className="list-group-item d-flex justify-content-between align-items-start">
            <div>
              <h5>{order.ticket.title}</h5>
              <strong>$ {order.ticket.price}</strong>
            </div>
            <div className={`badge bg-${STATUS_COLOR[order.status]} text-capitalize`}>
              {order.status}
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

OrderIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/orders')

  return { orders: data }
}

export default OrderIndex
