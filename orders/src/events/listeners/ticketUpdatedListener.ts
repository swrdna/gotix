import { Message } from 'node-nats-streaming'
import { Listener, Subjects, TicketUpdatedEvent } from '@nanosrlorg/common'
import { Ticket } from '../../models/ticket'
import { queueGroupName } from './queueGroupName'

// hello tickets
export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
  queueGroupName = queueGroupName

  async onMessage(data: TicketUpdatedEvent['data'], msg: Message) {
    const ticket = await Ticket.findById({
      _id: data.id,
      version: data.version - 1
    })

    if (!ticket) {
      throw new Error('Ticket not found')
    }

    const { title, price } = data
    ticket.set({ title, price })
    await ticket.save()

    msg.ack()
  }
}
