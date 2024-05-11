import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthProvider";
import { Flex, Heading, Text, Button, Grid } from "@radix-ui/themes";
import Input from "../../components/Forms/Input";
import image from "../../assets/styleLogin.webp";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const auth = useAuth();

  const onSubmit = handleSubmit(async (data) => {
    try {
      auth.login(data);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="grid grid-cols-2"  style={{ 
      gridTemplateColumns: '45% 55%' 
    }}>
      {/* <Flex>
          <img src={image} alt="" />
        </Flex> */}
      <Flex
        justify="center"
        align="center"
        direction="column"
        className="min-h-screen"
      >
        <form onSubmit={onSubmit} className="flex flex-col gap-3 text-sm">
          <Heading className="text-center">Bienvenido</Heading>
          <Text className="text-center pb-3">Por favor ingresa tus credenciales</Text>
          <label htmlFor="codigo" className="font-medium">Código</label>
          <Input
            type="text"
            id="codigo"
            name="codigo"
            placeholder="Ingrese el código"
            {...register("codigo")}
          />

          <label htmlFor="email" className="font-medium">Correo Electrónico</label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Ingrese su correo electrónico"
            {...register("email")}
          />

          <label htmlFor="password" className="font-medium">Contraseña</label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Ingrese su contraseña"
            {...register("password")}
          />

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

export default Login;
