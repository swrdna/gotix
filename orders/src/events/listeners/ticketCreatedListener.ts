import { Message } from 'node-nats-streaming'
import { Listener, Subjects, TicketCreatedEvent } from '@nanosrlorg/common'
import { Ticket } from '../../models/ticket'
import { queueGroupName } from './queueGroupName'

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
  queueGroupName = queueGroupName

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data

    const ticket = Ticket.build({
      id,
      title,
      price,
    })

    await ticket.save()

    msg.ack()
  }
}
