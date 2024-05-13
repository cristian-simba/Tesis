import React from 'react'

const Input = React.forwardRef(({type, id, name, placeholder, ...props}, ref) => {
  return (
    <input 
      ref={ref}
      type={type} 
      id={id} 
      name={name} 
      placeholder={placeholder}
      {...props}
      className="
        min-w-96 w-full block rounded-md p-2.5 mb-2.5
         text-gray-900 
        border border-gray-300
        focus:outline-none focus:ring-blue-500 focus:border-blue-500 
        dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500
      "
    />
  )
});

export default Input;