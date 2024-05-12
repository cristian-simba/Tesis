import { useForm } from "react-hook-form";
import useAuth from "../../context/useAuth"
import { Flex, Heading, Text, Button, Grid } from "@radix-ui/themes";
import Input from "../../components/Forms/Input";
import image from "../../assets/styleLogin.webp";
import { ToastContainer } from 'react-toastify';
import { codigoValidator, emailValidator, passwordValidator } from "../../validators/validators";

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const auth = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await auth.login(data);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="grid grid-cols-2"  style={{ 
      gridTemplateColumns: '45% 55%' 
    }}>

      <Flex
        justify="center"
        align="center"
        direction="column"
        className="min-h-screen"
      >
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
          {errors.codigo && <NotifyError message="El código debe tener 10 caracteres" />}

          <label htmlFor="email" className="font-medium">Correo Electrónico</label>
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="Ingrese su correo electrónico"
            {...register("email", {validate: emailValidator})}
          />
          {errors.email && <NotifyError message="Email no válido" />}

          <label htmlFor="password" className="font-medium">Contraseña</label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Ingrese su contraseña"
            {...register("password", {validate: passwordValidator})}
          />
           {errors.password && <NotifyError message="Este campo es requerido" />}

          <a href="" 
            className="underline text-[#3358D4] mb-2.5">
            ¿Olvidaste tu contraseña?
          </a>

          <Button 
            radius='none'
            size={{ md: "3", lg: "4" }}
            className="hover:cursor-pointer"
          >
            Iniciar sesión
          </Button>
        </form>
      </Flex>

      <Flex>   
        <img src={image} alt="" />
      </Flex>
    </div>
  );
};

const NotifyError = ({ message }) => (
  <div className="block text-red-500 pt-[-5px] mt-[-15px] pb-2">{message}</div>
);

export default Login;
