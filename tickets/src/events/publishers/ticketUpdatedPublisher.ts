import { Publisher, Subjects, TicketUpdatedEvent } from '@nanosrlorg/common'

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated
}
