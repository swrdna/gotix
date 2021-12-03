import { useState } from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/useRequest'

const signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { doRequest, errors } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: {
      email, password
    },
    onSuccess: () => Router.push('/')
  })

  const handleSubmitForm = async (e) => {
    e.preventDefault()

    await doRequest()
  }

  return (
    <div className="container d-flex justify-content-center py-3">
      <div className="col-12 col-md-4">
        <div className="card">
          <div className="card-body">
            <h4 className="mb-4">Sign In</h4>
            <form onSubmit={handleSubmitForm}>
              {errors}

              <div className="mb-3">
                <label>Email</label>
                <input type="email" className="form-control" onChange={e => setEmail(e.target.value)} />
              </div>

              <div className="mb-3">
                <label>Password</label>
                <input type="password" className="form-control" onChange={e => setPassword(e.target.value)} />
              </div>

              <button type="submit" className="btn btn-primary">Sign In</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default signin
