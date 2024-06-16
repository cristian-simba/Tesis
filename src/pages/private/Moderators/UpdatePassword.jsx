import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { Flex, Heading, Text, Button, Spinner, Dialog } from "@radix-ui/themes";
import Input from "../../../components/Forms/Input";
import { RxBookmark, RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import { ToastContainer } from 'react-toastify';
import { LuLock } from "react-icons/lu";
import { updatePassword } from "../../../api/moderador.api";
import useAuth from "../../../context/useAuth";
import { NotifyError, NotifySuccess } from "../../../components/Toasts/Notifies";

export default function UpdatePassword() {
  const { register, handleSubmit, formState: { errors }  } = useForm();
  const { id } = useParams();
  const auth = useAuth();
  const token = auth.cookies.auth.token;
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      await updatePassword(data, id, token);
      NotifySuccess("Contraseña actualizada correctamente");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      NotifyError(error.response.data.msg || error.response.data.errors[0].msg);
      console.log(error);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button className="hover:cursor-pointer">
          Actualizar Contraseña
        </Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
      <Flex justify="end">
          <Dialog.Close>
            <RxCross2 size="18" className="hover:cursor-pointer" />
          </Dialog.Close>
        </Flex>
        <div className="transition-opacity duration-250 opacity-100">
          <ToastContainer position="top-center" style={{ zIndex: 2000, width: '400px' }} />
          <div className="flex flex-col gap-3 text-sm">
            <Flex align="center" justify="center" gap="3">
              <Heading>Actualizar contraseña</Heading>
            </Flex>
            <Flex direction="column">
              <Text className="text-center pb-3">Recuerda que tu contraseña debe tener al menos 10 caracteres e incluir letras mayúsculas y números.</Text>
            </Flex>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 text-sm">
            <label className="font-medium">Contraseña actual</label>
              <Input
                {...register("passwordactual", { required: true })}
                type="password"
                placeholder="Ingresa tu contraseña actual"
              />
              {errors.passwordactual?.type === "required" && (
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

              <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray" className="hover:cursor-pointer">
                  Cancelar
                </Button>
              </Dialog.Close>
              {loading ? (
                <Button
                  type="submit"
                  disabled
                >
                  <Spinner loading>
                    <RxBookmark />
                  </Spinner>
                  Actualizar contraseña
                </Button>
              ) : (
                <Button
                  type="submit"
                  className="hover:cursor-pointer"
                >
                  Actualizar contraseña
                </Button>
              )}
              </Flex>
            </form>
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
}

const FormError = ({ message }) => (
  <div className="block text-red-500 pt-[-5px] pb-2 font-thin">{message}</div>
);

