import { Publisher, Subjects, TicketCreatedEvent } from '@nanosrlorg/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}
