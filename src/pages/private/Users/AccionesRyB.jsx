import React, { useState } from "react";
import { Dialog, Radio, Text, Flex, Button, Spinner } from "@radix-ui/themes";
import { restringirUsuario, bloquearUsuario } from "../../../api/reportes.api";
import { deleteUser } from "../../../api/usuarios.api";
import useAuth from "../../../context/useAuth";
import { RxCross2 } from "react-icons/rx";
import { useToast } from '../../../context/ToastContext';

export default function AccionesRyB({ idUsuario, refresh, confirmar }) {
  const user = useAuth();
  const token = user?.cookies?.auth?.token;
  const [checked, setChecked] = useState("");
  const [diasRestriccion, setDiasRestriccion] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();

  const restringir = async () => {
    setLoading(true);
    try {
      if (!diasRestriccion) {
        showToast("Por favor selecciona el número de días para restringir al usuario");
        setLoading(false);
        return;
      }
      await restringirUsuario(idUsuario, token, diasRestriccion);
      setOpen(false);
      refresh();
      showToast("Usuario restringido exitosamente");
    } catch (error) {
      showToast("Error al restringir usuario");
    } finally {
      setLoading(false);
    }
  };

  const bloquear = async () => {
    setLoading(true);
    try {
      await bloquearUsuario(idUsuario, token);
      setOpen(false);
      refresh();
      showToast("Usuario bloqueado exitosamente");
    } catch (error) {
      showToast("Error al bloquear usuario");
    } finally {
      setLoading(false);
    }
  };

  const borrar = async () => {
    setLoading(true);
    try {
      await deleteUser(token, idUsuario);
      setOpen(false);
      refresh();
      showToast("Cuenta de usuario eliminada");
    } catch (error) {
      showToast("Error al eliminar cuenta de usuario");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = () => {
    switch (checked) {
      case "1":
        restringir();
        break;
      case "2":
        bloquear();
        break;
      case "3":
        borrar();
        break;
      default:
        showToast("Tienes que seleccionar una opción");
        setLoading(false);
        break;
    }
  };

  return (
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
              <select
                value={diasRestriccion}
                onChange={(e) => setDiasRestriccion(e.target.value)}
                className="w-full block rounded-md p-2.5 text-sm border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option value="">Seleccione los días</option>
                <option value="3">3 días</option>
                <option value="5">7 días</option>
                <option value="15">15 días</option>
              </select>
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
  );
}
