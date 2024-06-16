import { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
import { useForm } from "react-hook-form";
import { Flex, Text, Heading, Button, Dialog, Spinner } from "@radix-ui/themes";
import { RxCross2, RxBookmark, RxPlus } from "react-icons/rx";
import Input from "../../../components/Forms/Input";
import { registerModerador } from "../../../api/moderador.api";
import { ToastContainer } from 'react-toastify';
import { NotifyError, NotifySuccess } from "../../../components/Toasts/Notifies";
import { emailValidator } from "../../../validators/validators";

export default function ModeratorDialog({ token }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, onLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    if (!open) {
      reset(); 
    }
  }, [open]);

  useEffect(() => {
    setDomReady(true);
  }, []);
  
  const onSubmit = handleSubmit(async (data) => {
    try {
      onLoading(true);
      await registerModerador(data, token);
      onLoading(false);
      setOpen(false);
      NotifySuccess("Moderador registrado correctamente");
    } catch (error) {
      onLoading(false);
      console.log(error);
      if (error.message === "Network Error") {
        NotifyError("Error del servidor");
      } else if(error.response && error.response.data){
        NotifyError(error.response.data.msg);
      }else if (error.response.data.errors) {
        const errors = error.response.data.errors;
        errors.forEach(err => {
          NotifyError(err.msg);
        });
      } 
       else {
        NotifyError("Ocurrió un error desconocido");
      }
    }
  });
  return (
  <>
    {domReady && createPortal(
      <ToastContainer position="top-center" 
        closeButton={false} 
        autoClose={4000}
        style={{ zIndex: 2000,width: '400px' }} />,
      document.body
    )}
    <Dialog.Root open={open} onOpenChange={setOpen} style={{ zIndex: 10 }}>
      <Dialog.Trigger className='hover:cursor-pointer' >
        <Button> <RxPlus /> Registrar Moderador</Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="500px">

        <Flex justify="end">
          <Dialog.Close>
            <RxCross2 size="20" className="hover:cursor-pointer" />
          </Dialog.Close>
        </Flex>
        <Flex align='center' direction='column'> 
          <Heading className="pb-5">Registrar Moderador</Heading>
          <Text  className="text-sm pb-5">Llena todos los campos para registrar un nuevo moderador</Text>
        </Flex>
        <form onSubmit={onSubmit} className="flex flex-col gap-3 text-sm">
          <label htmlFor="nombre" className="font-medium">
            Nombre
          </label>
          <Input
            {...register("nombre", { required: true, minLength: 3, maxLength: 12, pattern: /^[A-Za-z]+$/ })}
              placeholder="Ingrese el nombre del moderador"
            />
            {errors.nombre?.type === "required" && <FormError message="El nombre es requerido" />}
            {errors.nombre?.type === "minLength" && <FormError message="El nombre debe tener al menos 3 caracteres" />}
            {errors.nombre?.type === "maxLength" && <FormError message="El nombre debe tener máximo 12 caracteres" />}
            {errors.nombre?.type === "pattern" && <FormError message="El nombre solo puede contener letras" />}
          <label htmlFor="apellido" className="font-medium">
            Apellido
          </label>
          <Input
            {...register("apellido", { required: true, minLength: 3, maxLength: 12, pattern: /^[A-Za-z]+$/ })}
              placeholder="Ingrese el apellido del moderador"
            />
            {errors.apellido?.type === "required" && <FormError message="El apellido es requerido" />}
            {errors.apellido?.type === "minLength" && <FormError message="El apellido debe tener al menos 3 caracteres" />}
            {errors.apellido?.type === "maxLength" && <FormError message="El apellido debe tener máximo 12 caracteres" />}
            {errors.apellido?.type === "pattern" && <FormError message="El apellido solo puede contener letras" />}
          <label htmlFor="email" className="font-medium">
            Correo Electrónico
          </label>

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


          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray" className="hover:cursor-pointer">
                Cancelar
              </Button>
            </Dialog.Close>

            {loading ? (
              <Button disabled>
                 <Spinner loading>
                  <RxBookmark />
                </Spinner>
                Registrar Moderador
                </Button>
            ) : (
              <Button type="submit" className="hover:cursor-pointer">
                Registrar Moderador
              </Button>
            )}

          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  </>
  );
}

const FormError = ({ message }) => (
  <div className="block text-red-500 pt-[-5px] mt-[-18px] pb-2 font-thin">{message}</div>
);