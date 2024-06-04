import { useState, useEffect } from "react";
import { Dialog, Radio, Text, Flex, Button } from "@radix-ui/themes";
import { RxCross2 } from "react-icons/rx";
import { desbloquearUsuario, desrestringirUsuario } from "../../../api/reportes.api";
import useAuth from "../../../context/useAuth";
import { useNavigate } from "react-router-dom";

export default function Acciones( {text, color, disabled, textT, textP, idUsuario, option, refresh}) {

  const user = useAuth();
  // const { refresh } = props
  const token = user?.cookies?.auth?.token;
  const data = {}
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()

  const desrestringir = async () => {
    try{
      await desrestringirUsuario(idUsuario, token, data)
      setOpen(false);
      refresh()
    }catch(error){
      console.log(error)
    }
  }

  const desbloquear = async () => {
    try{
      await desbloquearUsuario(idUsuario, token, data)
      setOpen(false);
      refresh()
    }catch(error){
      console.log(error)
    }
  }

  const handleSubmit = () => {
    switch (option) {
      case "1":
        desrestringir();
        break;
      case "2":
        desbloquear();
        break;
      default:
        break;
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} >
      <Dialog.Trigger className="cursor-pointer">
        <Button disabled={disabled} variant="soft" color={color}>{text}</Button>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
       <Flex justify="end">
          <Dialog.Close>
            <RxCross2 size="20" className="hover:cursor-pointer" />
          </Dialog.Close>
        </Flex>
        <Flex className="py-2">
          <Text className="font-bold">{textT}</Text>
        </Flex>

        <Text size='2'>¿Estás seguro de que quieres {textP} a este usuario? Esta acción no se puede revertir.</Text>
        <Flex pt="5" gap="2" justify="end">
          <Dialog.Close>
            <Button  className="cursor-pointer" variant="soft" color="gray">
              Regresar
            </Button>
          </Dialog.Close>
          <Button  className="cursor-pointer" color="red" onClick={handleSubmit}>Finalizar</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  )
}
