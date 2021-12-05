import { useEffect, useState } from 'react'
import Router from 'next/router'
import StripeCheckout from 'react-stripe-checkout'
import useRequest from '../../hooks/useRequest'

const OrderShow = ({ order, currentUser }) => {
  const [ timeLeft, setTimeLeft ] = useState(0)
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
    },
    onSuccess: () => Router.push('/orders')
  })

  useEffect(() => {
    const findTimeLeft = () => {
      const expiredAt = new Date(order.expiresAt) - new Date()
      setTimeLeft(Math.round(expiredAt/1000))
    }

    findTimeLeft()
    const timerId = setInterval(findTimeLeft, 1000)

    return () => {
      clearInterval(timerId)
    }
  }, [order])

  if (timeLeft < 0) {
    return (
      <div className="container py-4">Order Expired</div>
    )
  }

  return (
    <div className="container py-4">
      <h2>{order.ticket.title}</h2>
      <div>Time left to Pay: {timeLeft} seconds</div>
      <StripeCheckout
        token={({ id }) => doRequest({token: id})}
        stripeKey="pk_test_51K36lnFpY0EvrCzwaRhR2DawllES3m2O9PBOOaWUC6mo9uOuVb0ZIwqz8HVFC1kRE7FN4ocGeBk4HosSqSOLIJBx00bV8en7ju"
        amount={order.ticket.price * 100}
        email={currentUser.email}
      >
        <button type="button" className="btn btn-primary">Pay</button>
      </StripeCheckout>
      { errors }
    </div>
  )
}

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query
  const { data } = await client.get(`/api/orders/${orderId}`)

  return { order: data }
}

export default OrderShow
