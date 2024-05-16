import { useState } from "react";
import { useForm } from "react-hook-form";
import { Flex, Heading, Button, Dialog, Spinner } from "@radix-ui/themes";
import { RxCross2, RxBookmark } from "react-icons/rx";
import Input from "../../components/Forms/Input";
import { registerModerador } from "../../api/moderador.api";
import { ToastContainer } from 'react-toastify';
import { NotifyError, NotifySuccess } from "../../components/Toasts/Notifies";

export default function ModeratorDialog({ id, token }) {
  const { register, handleSubmit } = useForm();
  const [send, onSend] = useState(false)
  const [open, setOpen] = useState(false);
  
  const onSubmit = handleSubmit(async (data) => {
    try {
      onSend(true);
      await registerModerador(data, id, token);
      onSend(false);
      setOpen(false);
      NotifySuccess("Moderador registrado con éxito");
    } catch (error) {
      onSend(false);
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
    <Dialog.Root open={open} onOpenChange={setOpen } >
      <Dialog.Trigger>
        <Button>Registrar Moderador</Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
      <ToastContainer position="top-center" />


        <Flex justify="end">
          <Dialog.Close>
            <RxCross2 size="20" className="hover:cursor-pointer" />
          </Dialog.Close>
        </Flex>
        <Heading className="text-center pb-5">Registrar Moderador</Heading>
        <form onSubmit={onSubmit} className="flex flex-col gap-3 text-sm">
          <label htmlFor="nombre" className="font-medium">
            Nombre
          </label>
          <Input {...register("nombre")} placeholder="Nombre del moderador" />
          <label htmlFor="apellido" className="font-medium">
            Apellido
          </label>
          <Input
            {...register("apellido")}
            placeholder="Apellido del moderador"
          />
          <label htmlFor="email" className="font-medium">
            Correo Electrónico
          </label>

          <Input {...register("email")} placeholder="Correo Electrónico" />

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancelar
              </Button>
            </Dialog.Close>

            {send ? (
              <Button disabled>
                 <Spinner loading>
                  <RxBookmark />
                </Spinner>
                Registrar Moderador
                </Button>
            ) : (
              <Button type="submit" radius="none">
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
