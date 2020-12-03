import { useState } from 'react'

export const useForm = (callback, initialState = {}) =>{
  const [values, setValues] = useState(initialState)

  const onChange = (event) => {
    setValues({...values, [event.target.name]:event.target.value}) 
    // set individual value in values, i.e.:
    // values[index of target.name] = target.value
  }

  const onSubmit = (event) => {
    event.preventDefault()
    callback()
  }
  // server-side validation in place so no client side validation required.
  // to send mutation to server and persist changes if valid

  return {
    onChange,
    onSubmit,
    values
  }
}