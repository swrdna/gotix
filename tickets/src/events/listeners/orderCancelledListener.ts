import { Listener, OrderCancelledEvent, Subjects } from '@nanosrlorg/common'
import { Message } from 'node-nats-streaming'
import { queueGroupName } from './queueGroupName'
import { Ticket } from '../../models/ticket'
import { TicketUpdatedPublisher } from '../publishers/ticketUpdatedPublisher'

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
  queueGroupName = queueGroupName

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const ticket = await Ticket.findById(data.ticket.id)

    if (!ticket) {
      throw new Error('Ticket not found')
    }

    ticket.set({ orderId: undefined })
    await ticket.save()
    await new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      orderId: ticket.orderId,
      userId: ticket.userId,
      price: ticket.price,
      title: ticket.title,
      version: ticket.version,
    })

    msg.ack()
  }
}
