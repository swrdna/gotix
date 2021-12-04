import { Subjects, Publisher, ExpirationCompleteEvent } from '@nanosrlorg/common'

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete
}
