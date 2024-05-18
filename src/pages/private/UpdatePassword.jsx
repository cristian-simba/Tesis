import { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { Flex, Heading, Text, Button, Spinner } from "@radix-ui/themes";
import { RxBookmark } from "react-icons/rx";
import Input from "../../components/Forms/Input";
import { useForm } from "react-hook-form";
import { ToastContainer } from 'react-toastify';
import { LuLock } from "react-icons/lu";
import { updatePassword } from "../../api/moderador.api";
import useAuth from "../../context/useAuth";
import { NotifyError, NotifySuccess } from "../../components/Toasts/Notifies";

export default function UpdatePassword() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = useAuth();
  const token = auth.cookies.auth.token;
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updatePassword(data, id, token);
      navigate('/dashboard'); 
    } catch (error) {
      setLoading(false);
      NotifyError(error.response.data.msg)
      console.log(error)
    }
  };

  return (
    <div className={`transition-opacity duration-250 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <ToastContainer position="top-center" />
       <div className="flex flex-col justify-center items-center gap-3 min-h-screen text-sm">
        <Flex align="center" gap='3'>
          <Heading size="7">Actualizar contraseña</Heading>
          <LuLock size="25"/>
        </Flex>
        <Flex direction='column' gap='2'>
          <Text className="text-center">Por favor ingresa tu nueva contraseña</Text>
          <Text className="text-center pb-3">Recuerda que tu contraseña debe tener al menos 8 caracteres</Text>
        </Flex>
        <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-3 text-sm">
          <label className="font-medium">Contraseña actual</label>
          <Input {...register('passwordactual')} type="password" placeholder="Ingresa tu contraseña actual" />
          <label className="font-medium">Nueva contraseña</label>
          <Input {...register('passwordnuevo')} type="password" placeholder="Ingresa tu nueva contraseña" />
          {loading ? (
              <Button  
              type="submit"       
              size={{ md: "3", lg: "4" }}
              style={{ width: '100%' }}
              disabled>
                 <Spinner loading>
                  <RxBookmark />
                </Spinner>
                Actualizar contraseña
                </Button>
            ) : (
              <Button           
                type="submit"
                size={{ md: "3", lg: "4" }}
                style={{ width: '100%' }}
                radius="none"
                className="hover:cursor-pointer">
                Actualizar contraseña
              </Button>
            )}
        </form>
      </div>
    </div>
  )
}

const FormError = ({ message }) => (
  <div className="block text-red-500 pt-[-5px] pb-2 font-thin">{message}</div>
);
