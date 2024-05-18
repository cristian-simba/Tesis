import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../context/useAuth"
import { Flex, Heading, Text, Button, Spinner} from "@radix-ui/themes";
import { RxBookmark } from "react-icons/rx";
import Input from "../../components/Forms/Input";
import image from "../../assets/ImgLogin.webp";
import { ToastContainer } from 'react-toastify';
import { codigoValidator, emailValidator, passwordValidator } from "../../validators/validators";

const Login = () => {

  const [loading, onLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();
  const auth = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    try {
      onLoading(true);
      await auth.login(data);
      onLoading(false);
    } catch (error) {
      onLoading(false);
      console.log(error);
    }
  });

  return (
    <div className="grid grid-cols-2"  style={{ gridTemplateColumns: '1/2 1/2' }}>
      <Flex justify="center" align="center" direction="column"className="min-h-screen">
        <ToastContainer position="top-left"/>
        <form onSubmit={onSubmit} className="flex flex-col gap-3 text-sm">
          <Heading className="text-center">Bienvenido</Heading>
          <Text className="text-center pb-3">Por favor ingresa tus credenciales</Text>
          <label htmlFor="codigo" className="font-medium">Código</label>
          <Input
            type="text"
            id="codigo"
            name="codigo"
            placeholder="Ingrese el código"
            {...register("codigo", {validate: codigoValidator})}
          />
          {errors.codigo && <FormError message="El código debe tener 10 caracteres" />}

          <label htmlFor="email" className="font-medium">Correo Electrónico</label>
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="Ingrese su correo electrónico"
            {...register("email", {validate: emailValidator})}
          />
          {errors.email && <FormError message="Email no válido" />}

          <label htmlFor="password" className="font-medium">Contraseña</label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Ingrese su contraseña"
            {...register("password", {validate: passwordValidator})}
          />
           {errors.password && <FormError message="Este campo es requerido" />}

          <a href="/recuperar-password" 
            className="underline text-[#3358D4] mb-2.5">
            ¿Olvidaste tu contraseña?
          </a>

          {loading ? (
              <Button         
              size={{ md: "3", lg: "4" }}
              disabled>
                 <Spinner loading>
                  <RxBookmark />
                </Spinner>
                Iniciar Sesión
                </Button>
            ) : (
              <Button           
                size={{ md: "3", lg: "4" }}
                radius="none"
                className="hover:cursor-pointer">
                Iniciar Sesión
              </Button>
            )}


        </form>
      </Flex>

      <Flex>   
        <img src={image} alt=""/>
      </Flex>
    </div>
  );
};

const FormError = ({ message }) => (
  <div className="block text-red-500 pt-[-5px] mt-[-18px] pb-2 font-thin">{message}</div>
);

export default Login;
