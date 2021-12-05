import { Subjects, Publisher, PaymentCreatedEvent } from '@nanosrlorg/common'

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated
}
