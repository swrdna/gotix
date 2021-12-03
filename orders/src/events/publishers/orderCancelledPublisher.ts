import { Publisher, Subjects, OrderCancelledEvent } from '@nanosrlorg/common'

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled
}
