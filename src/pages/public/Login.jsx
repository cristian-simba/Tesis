import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "../../context/AuthProvider"
import axios from 'axios'

const Login = () => {
  
  const {register, handleSubmit} = useForm()
  const auth = useAuth()
  
  const onSubmit = handleSubmit( async (data) => {
    try{
      auth.login(data)
    }catch(error){
      console.log(error)
    }
  })

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <h1>Inicio de sesion</h1>
      <label htmlFor="email">email</label>
      <input type="text" id='email' name="email" className="border-2"
        {...register("email")}
      />

      <label htmlFor="password">password</label>
      <input type="password" id='password' name="password" className="border-2"
        {...register("password")}
      />

      <label htmlFor="codigo">codigo</label>
      <input type="text" id='codigo' name="codigo" className="border-2"
        {...register("codigo")}
      />
      <button className="bg-blue-800 text-white w-[50%] rounded-md py-2">Submit</button>

    </form>
  )
}

export default Login