import { useState, useEffect } from "react";
import { Flex, Heading, Text, Button, Spinner } from "@radix-ui/themes";
import { RxEnvelopeClosed, RxEnvelopeOpen, RxBookmark } from "react-icons/rx";
import Input from "../../components/Forms/Input";
import { useForm } from "react-hook-form";
import { forgotPassword } from "../../api/moderador.api";
import { emailValidator } from "../../validators/validators";
import { NotifyError, NotifySuccess } from "../../components/Toasts/Notifies";
import { ToastContainer } from 'react-toastify';

export default function ForgotPassword() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [send, setSend] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await forgotPassword(data);
      setSend(true);
      NotifySuccess("Correo electrónico enviado")
    } catch (error) {
      NotifyError(error.response.data.msg);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`transition-opacity duration-200 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <ToastContainer position="top-center" />
      <div className="flex flex-col justify-center items-center gap-3 min-h-screen">
        <Heading size="7">Recuperar contraseña</Heading>
        {send ? (
          <Flex direction="column" align="center" gap="2" className="text-sm pb-2">
            <RxEnvelopeOpen size="100" className="opacity-100 transition-opacity ease-in-out duration-1000" /> 
            <Text>Hemos enviado un enlace a tu correo electrónico.</Text>
            <Text>Por favor, sigue las instrucciones para restablecer tu contraseña.</Text>
          </Flex>
        ) : (
          <Flex direction="column" align="center" gap="2" className="text-sm pb-2">
            <RxEnvelopeClosed size="100" className="opacity-100 transition-opacity ease-in-out duration-1000" />
            <Text>Por favor, introduce tu correo electrónico.</Text>
            <Text>Te enviaremos un enlace para que puedas restablecer tu contraseña.</Text>
          </Flex>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="min-w-96 text-sm">
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="Ingrese su correo electrónico"
            {...register("email", { validate: emailValidator })}
          />
          {errors.email && <FormError message="Email no válido" />}

          
          {loading ? (
            <Button 
            disabled
            size={{ md: "3", lg: "4" }}
            style={{ width: '100%' }}>
              <Spinner loading>
                <RxBookmark />
              </Spinner>
              Enviar correo
              </Button>
          ) : (
            <Button 
            type="submit" 
            size={{ md: "3", lg: "4" }}
            radius="none"
            style={{ width: '100%' }} 
            className="hover:cursor-pointer">
              Enviar correo
            </Button>
          )}
        </form>
        <a href="/mod/login" className="underline text-[#3358D4] text-sm pt-2">Regresar al inicio de sesión</a>
      </div>
    </div>
  );
}

const FormError = ({ message }) => (
  <div className="block text-red-500 pt-[-5px] pb-2 font-thin">{message}</div>
);
