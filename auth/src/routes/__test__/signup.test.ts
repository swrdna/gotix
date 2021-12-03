import request from 'supertest'
import { app } from '../../app'

it('return a 201 on success signup', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'heloakutest@test.com',
      password: 'fjdsndsdfjd'
    })
    .expect(201)
})

it('return a 400 with an invalid email', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'heloakutest2',
      password: 'password'
    })
    .expect(400)
})

it('return a 400 with an invalid password', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'heloakutest2@test.com',
      password: 'p'
    })
    .expect(400)
})

it('return a 400 with missing email and password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'hello@email.com'
    })
    .expect(400)

  await request(app)
    .post('/api/users/signup')
    .send({
      password: 'hsdjfhjksdfndjk'
    })
    .expect(400)
})

it('disallows duplicate emails', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'hello@email.com',
      password: 'password',
    })
    .expect(201)

  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'hello@email.com',
      password: 'password',
    })
    .expect(400)
})

it('set a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/api/users/signup')
    .send({
      email: 'hello@email.com',
      password: 'password',
    })
    .expect(201)

  expect(response.get('Set-Cookie')).toBeDefined()
})
