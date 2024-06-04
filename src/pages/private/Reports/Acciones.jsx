import { useState } from "react";
import { Dialog, Radio, Text, Flex, Button } from "@radix-ui/themes";
import { deletePublicacion, restringirUsuario, bloquearUsuario } from "../../../api/reportes.api";
import useAuth from "../../../context/useAuth";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

export default function Acciones({idReporte, idUsuario}) {

  const user = useAuth();
  const token = user?.cookies?.auth?.token;
  const data = {}
  
  const navigate = useNavigate()

  const eliminarPublicacion = async () => {
    try {
      await deletePublicacion(idReporte, token);
      console.log("Eliminar")
      navigate("/usuarios")
    } catch (error) {
      console.log(error);
    }
  };

  const restringir = async () => {
    try{
      await restringirUsuario(idUsuario, token, data)
      console.log("Restringido")
      navigate("/usuarios")
    }catch(error){
      console.log(error)
    }
  }

  const bloquear = async () => {
    try{
      await bloquearUsuario(idUsuario, token, data)
      console.log("Bloqueado")
      navigate("/usuarios")
    }catch(error){
      console.log(error)
    }
  }

  const handleSubmit = () => {
    switch (checked) {
      case "1":
        eliminarPublicacion();
        break;
        case "2":
          restringir();
        break;
        case "3":
          bloquear();
        break;
      default:
        break;
    }
  };

  const [checked, setChecked] = useState("");

  return (
    <Dialog.Root>
      <Dialog.Trigger className="cursor-pointer">
        <Button>Acciones</Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth="300px">
        <Flex justify="end">
          <Dialog.Close>
            <RxCross2 size="20" className="hover:cursor-pointer" />
          </Dialog.Close>
        </Flex>
        <Flex className="pb-5">
          <Text className="font-bold">Escoge una opción</Text>
        </Flex>
        <Flex align="start" direction="column" gap="4">
          <Flex asChild gap="2">

            <Text as="label" size="2">
            <Radio className="hover:cursor-pointer" name="example" value="1" checked={checked === "1"} onChange={() => setChecked("1")} />
                Eliminar Publicación
            </Text>
          </Flex>

          <Flex asChild gap="2">
            <Text as="label" size="2">
            <Radio className="hover:cursor-pointer" name="example" value="2" checked={checked === "2"} onChange={() => setChecked("2")} />
                Restricción al usuario
            </Text>
          </Flex>

          <Flex asChild gap="2">
            <Text as="label" size="2">
            <Radio className="hover:cursor-pointer" name="example" value="3" checked={checked === "3"} onChange={() => setChecked("3")} />
                Bloquear al usuario
            </Text>
          </Flex>
        </Flex>
        <Flex pt="5" gap="2" justify="end">
          <Dialog.Close>
            <Button  className="cursor-pointer" variant="soft" color="gray">
              Regresar
            </Button>
          </Dialog.Close>
          <Button  className="cursor-pointer" onClick={handleSubmit}>Finalizar</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
