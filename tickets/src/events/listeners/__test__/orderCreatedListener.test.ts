import { Message } from 'node-nats-streaming'
import mongoose from 'mongoose'
import { OrderCreatedEvent, OrderStatus } from '@nanosrlorg/common'
import { OrderCreatedListener } from '../orderCreatedListener'
import { natsWrapper } from '../../../natsWrapper'
import { Ticket } from '../../../models/ticket'

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client)

  const ticket = Ticket.build({
    title: 'Test Ticket',
    price: 23,
    userId: 'asdfasdf',
  })
  await ticket.save()

  const data: OrderCreatedEvent['data'] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: 'asdfasdf',
    expiresAt: 'asdfasdf',
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  }

  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  }

  return { listener, ticket, data, msg }
}

it('set the userId of the ticket', async () => {
  const { listener, ticket, data, msg } = await setup()

  await listener.onMessage(data, msg)

  const updatedTicket = await Ticket.findById(ticket.id)

  expect(updatedTicket!.orderId).toEqual(data.id)
})

it('ack the message', async () => {
  const { listener, ticket, data, msg } = await setup()
  await listener.onMessage(data, msg)

  expect(msg.ack).toHaveBeenCalled()
})

it('publish a ticket updated event', async () => {
  const { listener, ticket, data, msg } = await setup()

  await listener.onMessage(data, msg)

  expect(natsWrapper.client.publish).toHaveBeenCalled()

  const ticketUpdatedData = JSON.parse(
    (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
  )

  expect(data.id).toEqual(ticketUpdatedData.orderId)
})
