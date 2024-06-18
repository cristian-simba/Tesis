import { useState, useEffect } from "react";
import { Dialog, Radio, Text, Flex, Button, Spinner } from "@radix-ui/themes";
import { restringirUsuario, bloquearUsuario } from "../../../api/reportes.api";
import { deleteUser } from "../../../api/usuarios.api";
import useAuth from "../../../context/useAuth";
import { RxCross2 } from "react-icons/rx";
import { createPortal } from 'react-dom';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function AccionesRyB({ idUsuario, refresh, confirmar }) {
  const user = useAuth();
  const token = user?.cookies?.auth?.token;
  const [checked, setChecked] = useState("");
  const [diasRestriccion, setDiasRestriccion] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [domReady, setDomReady] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setDomReady(true);
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, { onClose: () => setSuccessMessage("") });
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, { onClose: () => setErrorMessage("") });
    }
  }, [errorMessage]);

  const restringir = async () => {
    try {
      const dias = parseInt(diasRestriccion);
      if (isNaN(dias) || dias <= 0) {
        setErrorMessage("Por favor ingresa un número válido de días");
        setLoading(false);
        return;
      }
      await restringirUsuario(idUsuario, token, dias);
      setOpen(false);
      refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const bloquear = async () => {
    try {
      await bloquearUsuario(idUsuario, token);
      setOpen(false);
      refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const borrar = async () => {
    try {
      await deleteUser(token, idUsuario);
      setOpen(false);
      refresh();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    switch (checked) {
      case "1":
        restringir();
        break;
      case "2":
        bloquear();
        break;
      case "3":
        borrar();
        console.log("cuenta borrada")
        break;
      default:
        setLoading(false);
        break;
    }
  };

  return (
    <>
      {domReady && createPortal(
        <ToastContainer 
          position="top-center" 
          closeButton={true} 
          style={{ zIndex: 2000, width: '400px' }} 
        />,
        document.body
      )}

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger className="cursor-pointer">
          <Button>Acciones</Button>
        </Dialog.Trigger>
        <Dialog.Content maxWidth="350px">
          <Flex justify="end">
            <Dialog.Close>
              <RxCross2 size="20" className="hover:cursor-pointer" />
            </Dialog.Close>
          </Flex>
          <Flex className="pb-5">
            <Text className="font-bold">Escoge una opción</Text>
          </Flex>
          {confirmar ? (
            <Flex align="start" direction="column" gap="4">
              <Flex asChild gap="2">
                <Text as="label" size="2">
                  <Radio
                    className="hover:cursor-pointer"
                    name="example"
                    value="1"
                    checked={checked === "1"}
                    onChange={() => setChecked("1")}
                  />
                  Restringir al usuario por un número de días
                </Text>
              </Flex>
              {checked === "1" && (
                <input
                  type="number"
                  placeholder="Ingrese el número de días"
                  value={diasRestriccion}
                  className="w-full block rounded-md p-2.5 text-sm border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => setDiasRestriccion(e.target.value)}
                />
              )}
              <Flex asChild gap="2">
                <Text as="label" size="2">
                  <Radio
                    className="hover:cursor-pointer"
                    name="example"
                    value="2"
                    checked={checked === "2"}
                    onChange={() => setChecked("2")}
                  />
                  Bloquear al usuario
                </Text>
              </Flex>
            </Flex>
          ) : (
          <Flex asChild gap="2">
            <Text as="label" size="2">
              <Radio
                className="hover:cursor-pointer"
                name="example"
                value="3"
                checked={checked === "3"}
                onChange={() => setChecked("3")}
              />
              Eliminar cuenta de usuario
            </Text>
          </Flex>
          )}

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
              <Button
                className="hover:cursor-pointer"
                onClick={handleSubmit}
              >
                Finalizar
              </Button>
            )}
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
