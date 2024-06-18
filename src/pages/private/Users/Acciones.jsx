import { useState, useEffect } from "react";
import { Dialog, Text, Flex, Button, Spinner } from "@radix-ui/themes";
import { RxCross2 } from "react-icons/rx";
import { desbloquearUsuario, desrestringirUsuario } from "../../../api/reportes.api";
import useAuth from "../../../context/useAuth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Acciones({ text, color, disabled, textT, textP, idUsuario, option, textBtn, refresh }) {
  const user = useAuth();
  const token = user?.cookies?.auth?.token;
  const data = {};
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const desrestringir = async () => {
    try {
      await desrestringirUsuario(idUsuario, token, data);
      setOpen(false);
      refresh();
    } catch (error) {
      toast.error("Error al desrestringir al usuario");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const desbloquear = async () => {
    try {
      await desbloquearUsuario(idUsuario, token, data);
      setOpen(false);
      refresh();
    } catch (error) {
      toast.error("Error al desbloquear al usuario");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    switch (option) {
      case "1":
        desrestringir();
        break;
      case "2":
        desbloquear();
        break;
      default:
        setLoading(false);
        break;
    }
  };

  return (
    <>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger className="cursor-pointer">
          <Button disabled={disabled} variant="soft" color={color}>{text}</Button>
        </Dialog.Trigger>

        <Dialog.Content maxWidth="450px">
          <Flex justify="end">
            <Dialog.Close>
              <RxCross2 size="20" className="hover:cursor-pointer" />
            </Dialog.Close>
          </Flex>
          <Flex className="pb-2">
            <Text className="font-bold">{textT}</Text>
          </Flex>

          <Text size='2'>¿Estás seguro de que quieres {textP} a este usuario? Esta acción no se puede revertir.</Text>
          <Flex pt="5" gap="2" justify="end">
            <Dialog.Close>
              <Button className="cursor-pointer" variant="soft" color="gray">
                Regresar
              </Button>
            </Dialog.Close>
            {loading ? (
              <Button disabled>
                <Spinner />
                Cargando
              </Button>
            ) : (
              <Button className="cursor-pointer" color="red" onClick={handleSubmit}>
                {textBtn}
              </Button>
            )}
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
