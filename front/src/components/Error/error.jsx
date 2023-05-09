import React from 'react'
import { Link } from 'react-router-dom'

const Error = ({message}) => {
  return (
    <div className='text-center pt-5'>
        <h1 className='mb-3'>{message}</h1>
        <Link className='btn btn-dark' to={'/'}>Volvel al inicio</Link>    
    </div>
  )
}

export default Error