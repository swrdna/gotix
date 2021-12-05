import { useState } from 'react'
import Router from 'next/router'
import useRequest from '../../hooks/useRequest'

const New = () => {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')

  const { doRequest, errors } = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: {
      title,
      price
    },
    onSuccess: () => Router.push('/')
  })

  const handleFormatPrice = () => {
    const value = parseFloat(price)

    if (isNaN(value)) {
      return
    }

    setPrice(value.toFixed(2))
  }

  const handleSubmitForm = (e) => {
    e.preventDefault()
    doRequest()
  }

  return (
    <div className="container d-flex justify-content-center py-3">
      <div className="col-12 col-md-4">
        <h1>Create a Ticket</h1>
        { errors }
        <form onSubmit={handleSubmitForm}>
          <div className="mb-3">
            <label>Title</label>
            <input
              type="text"
              className="form-control"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label>Price</label>
            <input
              type="number"
              className="form-control"
              value={price}
              onChange={e => setPrice(e.target.value)}
              onBlur={handleFormatPrice}
            />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

export default New
