import { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
import { useForm } from "react-hook-form";
import { Flex, Text, Heading, Button, Dialog, Spinner } from "@radix-ui/themes";
import { RxCross2, RxBookmark } from "react-icons/rx";
import Input from "../../components/Forms/Input";
import { registerModerador } from "../../api/moderador.api";
import { ToastContainer } from 'react-toastify';
import { NotifyError, NotifySuccess } from "../../components/Toasts/Notifies";

export default function ModeratorDialog({ id, token }) {
  const { register, handleSubmit, reset } = useForm();
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
      await registerModerador(data, id, token);
      onLoading(false);
      setOpen(false);
      NotifySuccess("Moderador registrado correctamente");
    } catch (error) {
      onLoading(false);
      console.log(error);
      if (error.message === "Network Error") {
        NotifyError("Error del servidor");
      } else if (error.response && error.response.data && error.response.data.msg) {
        NotifyError(error.response.data.msg);
      } else {
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
      <Dialog.Trigger>
        <Button radius="none">Registrar Moderador</Button>
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
          <Input {...register("nombre")} placeholder="Ingrese el nombre del moderador" />
          <label htmlFor="apellido" className="font-medium">
            Apellido
          </label>
          <Input
            {...register("apellido")}
            placeholder="Ingrese el apellido del moderador"
          />
          <label htmlFor="email" className="font-medium">
            Correo Electrónico
          </label>

          <Input {...register("email")} placeholder="Ingrese el correo electrónico del moderador" />

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" radius="none" color="gray" className="hover:cursor-pointer">
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
              <Button type="submit" radius="none" className="hover:cursor-pointer">
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
