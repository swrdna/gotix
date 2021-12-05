import { useState } from 'react'
import axios from 'axios'

const useRequest = ({ url, method, body, onSuccess }) => {
  const [errors, setErrors] = useState(null)

  const doRequest = async (props = {}) => {
    try {
      setErrors(null)
      const response = await axios[method](url, {...body, ...props})
      if (onSuccess) {
        onSuccess(response.data)
      }
      return response.data
    } catch (err) {
      setErrors(
        <div className="alert alert-danger">
          <h4>Ooops...</h4>
          {err.response.data.errors.map((e, i) => (
            <div key={i}>{e.message}</div>
          ))}
        </div>
      )

    }
  }

  return { doRequest, errors }
}

export default useRequest
