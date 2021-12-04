import monggose from 'mongoose'
import request from 'supertest'
import { app } from '../../app'
import mongoose from 'mongoose'
import { natsWrapper } from '../../natsWrapper'
import { Ticket } from '../../models/ticket'

it('return 404 if provided id does not exist', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()

  await request(app)
    .put(`/api/tickets/${id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'dass',
      price: 20
    })
    .expect(404)
})

it('return 401 if user is not authentication', async () => {
  const id = new mongoose.Types.ObjectId().toHexString()

  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: 'dass',
      price: 20
    })
    .expect(401)
})

it('return 401 if user doest not own the ticket', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title: 'dass',
      price: 20
    })

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'assadd',
      price: 100
    })
    .expect(401)
})

it('return 400 if user provide an invalid title or price', async () => {
  const cookie = global.signin()
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'dasdss',
      price: 20
    })

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 20
    })
    .expect(400)

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'dsads',
      price: -20
    })
    .expect(400)
})

it('if updates ticket proviced valid inputs', async () => {
  const cookie = global.signin()
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'dasdss',
      price: 20
    })

  const title = 'Edit Ticket'
  const price = 200
  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title, price
    })
    .expect(200)

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()

  expect(ticketResponse.body.title).toEqual(title)
  expect(ticketResponse.body.price).toEqual(price)
})

it('publishes an event', async () => {
  const cookie = global.signin()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'New ticket',
      price: 20
    })

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'New ticket',
      price: 100,
    })
    .expect(200)

  expect(natsWrapper.client.publish).toHaveBeenCalled()
})

it('rejects updates if the ticket is reserved', async () => {
  const cookie = global.signin()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title: 'Test new ticket',
      price: 45
    })

  const ticket = await Ticket.findById(response.body.id)
  ticket!.set({ orderId: new mongoose.Types.ObjectId().toHexString() })
  await ticket!.save()

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: 'Test ne w ticket',
      price: 90
    })
    .expect(400)
})
