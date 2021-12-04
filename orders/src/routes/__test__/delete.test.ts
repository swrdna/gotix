import mongoose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'
import { Order, OrderStatus } from '../../models/order'
import { natsWrapper } from '../../natsWrapper'

it('mark order as cancelled', async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Test Ticket',
    price: 50,
  })
  await ticket.save()

  const currentUser = global.signin()
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', currentUser)
    .send({ ticketId: ticket.id })
    .expect(201)

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', currentUser)
    .send()
    .expect(204)

  const updatedOrder = await Order.findById(order.id)

  expect(updatedOrder!.status).toEqual(OrderStatus.Cancelled)
})

it('emits a order cancelled event', async () => {
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'Test Ticket',
    price: 50,
  })
  await ticket.save()

  const currentUser = global.signin()
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', currentUser)
    .send({ ticketId: ticket.id })
    .expect(201)

  await request(app)
    .delete(`/api/orders/${order.id}`)
    .set('Cookie', currentUser)
    .send()
    .expect(204)

  expect(natsWrapper.client.publish).toHaveBeenCalled()
})
