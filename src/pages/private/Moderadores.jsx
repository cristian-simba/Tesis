import { useForm } from "react-hook-form";
import { Flex, Heading, Text, Button} from "@radix-ui/themes";
import { registerModerador } from "../../api/moderador.api";
import useAuth from "../../context/useAuth";

export default function Moderadores() {

  const user = useAuth();
  const id = user?.cookies?.auth?._id;
  const token = user?.cookies?.auth?.token;

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data)
      const response = await registerModerador(data, id, token);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <div>
      <h1>XD</h1>
      <form onSubmit={onSubmit}>
        <input {...register('nombre')} placeholder="Nombre" />
        <input {...register('apellido')} placeholder="Apellido" />
        <input {...register('email')} placeholder="Email" />
        <button type="submit">Registrar</button>
      </form>
    </div>
  )
}
