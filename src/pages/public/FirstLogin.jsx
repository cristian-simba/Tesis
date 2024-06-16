import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Flex, Heading, Text, Button, Spinner} from "@radix-ui/themes";
import { RxBookmark } from "react-icons/rx";
import Input from "../../components/Forms/Input";
import { ToastContainer } from 'react-toastify';
import { firstLogin } from "../../api/moderador.api";
import { useNavigate } from "react-router-dom";
import { NotifyError } from "../../components/Toasts/Notifies";

const FirstLogin = () => {

  const [loading, onLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      onLoading(true);
      await firstLogin(data);
      onLoading(false);
      navigate("/dashboard");
    } catch (error) {
      onLoading(false);
      NotifyError(error.response.data.msg)
      console.log(error);
    }
  });

  return (
    <div className="grid grid-cols-1"  style={{ gridTemplateColumns: '1/2 1/2' }}>

      <ToastContainer position="top-center" style={{ zIndex: 2000, width: '400px' }} />
      <Flex justify="center" align="center" direction="column"className="min-h-screen">
        <form onSubmit={onSubmit} className="flex flex-col gap-3 text-sm">
        <Heading className="text-center">Primer Inicio de Sesión</Heading>
        <Text className="text-center">Bienvenido. Por motivos de seguridad, le recomendamos cambiar </Text>
        <Text className="text-center pb-3 mt-[-10px]">
          su contraseña en este primer inicio de sesión
        </Text>


          <label htmlFor="codigo" className="font-medium">Código</label>
          <Input
            type="text"
            id="codigo"
            name="codigo"
            placeholder="Ingrese el código"
            {...register("codigo", { required: true })}
          />
          {errors.codigo && <FormError message="Este campo es requerido" />}


          <label htmlFor="email" className="font-medium">Correo Electrónico</label>
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="Ingrese su correo electrónico"
            {...register("email", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // Patrón para validar formato de correo electrónico
            })}
          />
          {errors.email?.type === "required" && (
            <FormError message="El correo electrónico es requerido" />
          )}
          {errors.email?.type === "pattern" && (
            <FormError message="Ingrese un correo electrónico válido" />
          )}

           <label className="font-medium">Contraseña actual</label>
              <Input
                {...register("password", { required: true })}
                type="password"
                placeholder="Ingresa tu contraseña actual"
              />
              {errors.password?.type === "required" && (
                <FormError message="La contraseña actual es requerida" />
              )}

           <label className="font-medium">Nueva contraseña</label>
              <Input
                {...register("passwordnuevo", {
                  required: true,
                  minLength: 10,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{10,}$/ 
                })}
                type="password"
                placeholder="Ingresa tu nueva contraseña"
              />
              {errors.passwordnuevo?.type === "required" && (
                <FormError message="La nueva contraseña es requerida" />
              )}
              {errors.passwordnuevo?.type === "minLength" && (
                <FormError message="La contraseña debe tener al menos 10 caracteres" />
              )}
              {errors.passwordnuevo?.type === "pattern" && (
                <FormError message="La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número" />
              )}


          {loading ? (
              <Button         
              size={{ md: "3", lg: "4" }}
              disabled>
                 <Spinner loading>
                  <RxBookmark />
                </Spinner>
                Finalizar
                </Button>
            ) : (
              <Button           
                size={{ md: "3", lg: "4" }}
                radius="none"
                className="hover:cursor-pointer">
                Finalizar
              </Button>
            )}


        </form>
      </Flex>

    </div>
  );
};

const FormError = ({ message }) => (
  <div className="block text-red-500 pt-[-5px] mt-[-18px] pb-2 font-thin">{message}</div>
);

export default FirstLogin;
