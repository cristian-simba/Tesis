import { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
import { useForm } from "react-hook-form";
import { Flex, Text, Heading, Button, Dialog, Spinner } from "@radix-ui/themes";
import { RxCross2, RxBookmark, RxPlus } from "react-icons/rx";
import Input from "../../../components/Forms/Input";
import { registerModerador } from "../../../api/moderador.api";
import { useToast } from '../../../context/ToastContext';

export default function ModeratorDialog({ token }) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [loading, onLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const { showToast } = useToast(); // Usa el contexto de Toast

  useEffect(() => {
    if (!open) {
      reset(); 
    }
  }, [open]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      onLoading(true);
      await registerModerador(data, token);
      onLoading(false);
      setOpen(false);
      showToast("Moderador registrado exitosamente");
      //
    } catch (error) {
      onLoading(false);
      console.log(error);
      if (error.message === "Network Error") {
        showToast("Error del servidor");
      } else if(error.response && error.response.data){
        showToast(error.response.data.msg);
      }else if (error.response.data.errors) {
        const errors = error.response.data.errors;
        errors.forEach(err => {
          showToast(err.msg);
        });
      } 
       else {
        showToast("Ocurrió un error desconocido");
      }
    }
  });
  return (
  <>
    
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