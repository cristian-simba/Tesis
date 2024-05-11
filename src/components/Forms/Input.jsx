import React from 'react'

export default function Input ({type, id, name, placeholder}) {
  return (
    <input 
      type={type} 
      id={id} 
      name={name} 
      placeholder={placeholder}
      className="
        min-w-96 w-full block rounded-md p-2.5 mb-2.5
        bg-gray-50 border border-gray-300 text-gray-900 
        focus:outline-none focus:ring-blue-500 focus:border-blue-500 
        dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500
      "
    />
  )
}


