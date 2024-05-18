import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Heading, Text, Button, Spinner, Flex } from "@radix-ui/themes";
import { RxBookmark } from "react-icons/rx";
import { recoverPassword } from '../../api/moderador.api';
import { NotifyError, NotifySuccess } from "../../components/Toasts/Notifies";
import Input from '../../components/Forms/Input';
import { ToastContainer } from 'react-toastify';
import { LuLock } from "react-icons/lu";

const NewPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const onSubmit = async (data) => {
    const { password, confirmpassword } = data;

    if (password !== confirmpassword) {
      NotifyError('Las contraseñas no coinciden');
      return;
    }

    try {
      setLoading(true);
      await recoverPassword(data, token);
      NotifySuccess('Contraseña actualizada con éxito');
      navigate('/mod/login');
    } catch (error) {
      setLoading(false);
      NotifyError('Error al actualizar la contraseña');
    }
  };

  return (
    <div className={`transition-opacity duration-200 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <ToastContainer position="top-center" />
      <div className="flex flex-col justify-center items-center gap-3 min-h-screen text-sm">

        <Flex align="center" gap='3'>
          <Heading size="7">Restablecer contraseña</Heading>
          <LuLock size="25"/>
        </Flex>
        <Flex direction='column' gap='2'>
          <Text className="text-center">Por favor ingresa tu nueva contraseña</Text>
          <Text className="text-center pb-3">Recuerda que tu contraseña debe tener al menos 8 caracteres</Text>
        </Flex>

        <form onSubmit={handleSubmit(onSubmit)}  className="flex flex-col gap-3 text-sm">
          
          <label className="font-medium">Nueva contraseña</label>
          <Input 
            {...register("password", { required: true })} 
            type="password" 
            placeholder="Ingrese la nueva contraseña" 
          />
          {errors.password && <FormError message='La contraseña es requerida'/>}

          <label className="font-medium">Confirmar contraseña</label>
          <Input 
            {...register("confirmpassword", { required: true })} 
            type="password" 
            placeholder="Confirmar nueva contraseña" 
          />
          {errors.confirmpassword &&  <FormError message='La confirmación de la contraseña es requerida'/>}

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
                Restablecer contraseña
              </Button>
            )}
        </form>
        <a href="/mod/login" className="underline text-[#3358D4] text-md pt-2">Regresar al inicio de sesión</a>
      </div>
    </div>
  );
};

export default NewPassword;

const FormError = ({ message }) => (
  <div className="block text-red-500 pt-[-5px] pb-2 font-thin">{message}</div>
);
