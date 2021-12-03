import request from 'supertest'
import { app } from '../../app'

it('fails when a email that does not exist is supplied', async () => {
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'hdfhdbcy@test.com',
      password: 'fjdsndsdfjd'
    })
    .expect(400)
})

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'cybernano@test.com',
      password: 'asdasdasd'
    })
    .expect(201)

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'cybernano@test.com',
      password: 'dsadsadsa'
    })
    .expect(400)
})

it('responds with cookie when given valid creds', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'cybernano23@test.com',
      password: 'asdasdasd'
    })
    .expect(201)

    const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'cybernano23@test.com',
      password: 'asdasdasd'
    })
    .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
})
