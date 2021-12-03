import nats from 'node-nats-streaming'
import { randomBytes } from 'crypto'
import { TicketCreatedListener } from './events/ticketCreatedListener'

console.clear()

const clientID = randomBytes(4).toString('hex')
const stan = nats.connect('ticketing', clientID, {
  url: 'http://localhost:4222'
})

stan.on('connect', () => {
  console.log('Listener connected to NATS')

  stan.on('close', () => {
    console.log('NATS connection closed!')
    process.exit()
  })

  new TicketCreatedListener(stan).listen()
})

// Shutdown when client connection close down
process.on('SIGINT', () => stan.close())
process.on('SIGTERM', () => stan.close())
