import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import axios from 'axios'

// 👇 Here are the validation errors you will use with Yup.
const validationErrors = {
  fullNameTooShort: 'full name must be at least 3 characters',
  fullNameTooLong: 'full name must be at most 20 characters',
  sizeIncorrect: 'size must be S or M or L'
}

// 👇 Here you will create your schema.
const validSchema = yup.object().shape({
  fullName: yup.string()
    .trim()
    .required()
    .min(3, validationErrors.fullNameTooShort)
    .max(20, validationErrors.fullNameTooLong),
  size: yup.string()
    .required(validationErrors.sizeIncorrect)
    .oneOf(['S','M','L'], validationErrors.sizeIncorrect)
})

// 👇 This array could help you construct your checkboxes using .map in the JSX.
const toppings = [
  { topping_id: '1', text: 'Pepperoni' },
  { topping_id: '2', text: 'Green Peppers' },
  { topping_id: '3', text: 'Pineapple' },
  { topping_id: '4', text: 'Mushrooms' },
  { topping_id: '5', text: 'Ham' },
]

const initialForm = {
  fullName: "",
  size: "",
  toppings: []
}
const initialErrors = {
  fullName: "",
  size: "",
}

export default function Form() {
  const [formValues, setFormValues] = useState(initialForm)
  const [errors, setErrors] = useState(initialErrors)
  const [success, setSuccess] = useState('')
  const [enable, setDisabled] = useState(false)
  const [failure, setFailure] = useState(false)

  useEffect(() => {
    validSchema.isValid(formValues).then(isValid => {
      setDisabled(isValid)
    })
  }, [formValues])


  const handleToppings = (evt) => {
    const {value, checked} = evt.target

    setFormValues((prevValues) => {
      const updateToppings = checked
        ? [...prevValues.toppings, value]
        : prevValues.toppings.filter(topping => topping !== value)
        //debugger
        return {
          ...prevValues, toppings: updateToppings
        }
    })
  }

  /*const validate = (name, value) => {
    yup.reach(validSchema, name)
      .validate(value)
      .then(() => setFormValues({...formValues, [name]: ''}))
      .catch((err) => setFormValues({...formValues, [name]: err.errors[0]}))
  }*/

  const onChange = (evt) => {
    const {name, value} = evt.target
    //validate(name, value)
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value      
   }))
   yup
   .reach(validSchema, name)
   .validate(value)
   .then((() => {setErrors({...errors, [name]: ''})}))
   .catch(((err) => {setErrors({...errors, [name]: err.errors[0]})}))
  }

  

  const submit = () => {
    axios.post('http://localhost:9009/api/order', formValues)
      .then(res => {
        console.log('response', res)
        console.log('success message', res.data.message)
        setSuccess(res.data.message)
        //setTimeout(() => setSuccess(''), 3000)
        console.log(success)
        //debugger
        
      }).catch(err => console.error(err))
      .finally(() => {
        setFormValues(initialForm)
        setErrors(initialErrors)
      })
  }

  const formSubmit = (evt) => {
    evt.preventDefault()
    submit()
  }


  return (
    <form onSubmit={formSubmit}>
      <h2>Order Your Pizza</h2>
      {success && <div className='success'>{success}</div>}
      {failure && <div className='failure'>{failure}</div>}

      <div className="input-group">
        <div>
          <label htmlFor="fullName">Full Name</label><br />
          <input 
            placeholder="Type full name" 
            id="fullName" 
            name="fullName"
            type="text" 
            value={formValues.fullName}
            onChange={onChange}
          />
        </div>
        {errors.fullName && <div className='error'>{errors.fullName}</div>}
      </div>

      <div className="input-group">
        <div>
          <label htmlFor="size">Size</label><br />
          <select 
            id="size"
            value={formValues.size}
            name="size"
            onChange={onChange}
            >
            <option value="">----Choose Size----</option>
            <option value="S">Small</option>
            <option value="M">Medium</option>
            <option value="L">Large</option>
            {/* Fill out the missing options */}
          </select>
        </div>
        {errors.size && <div className='error'>{errors.size}</div>}
      </div>

      <div className="input-group">
        {/* 👇 Maybe you could generate the checkboxes dynamically */}
        {toppings.map(topping => {
          return (
            <label key={topping.topping_id}>
              <input
              name={topping.text}
              type="checkbox"
              value={topping.topping_id}
              onChange={handleToppings}
            />
            {topping.text}<br />
            </label>
          )
        })}
      </div>
      {/* 👇 Make sure the submit stays disabled until the form validates! */}
      <input disabled={!enable} type="submit" />
    </form>
  )
}
