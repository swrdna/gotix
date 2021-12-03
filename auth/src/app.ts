import express from 'express'
import 'express-async-errors'
import cookieSession from 'cookie-session'

import { signinRouter } from './routes/signin'
import { signoutRouter } from './routes/signout'
import { signupRouter } from './routes/signup'
import { currentUserRouter } from './routes/currentUser'
import { errorHandler, NotFoundError } from '@nanosrlorg/common'

const app = express()
app.use(express.json())
app.set('trust proxy', true)
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test'
  })
)

app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)
app.use(currentUserRouter)

app.all('*', async (req, res) => {
  throw new NotFoundError()
})

app.use(errorHandler)

export { app }
