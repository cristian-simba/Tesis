import React, { useState, useEffect } from "react";
import { Dialog, Radio, Text, Flex, Button, Spinner } from "@radix-ui/themes";
import { restringirUsuario, bloquearUsuario, falsoReporte, deletePublicacion } from "../../../api/reportes.api";
import useAuth from "../../../context/useAuth";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { useToast } from '../../../context/ToastContext';


export default function Acciones({ idReporte, idUsuario }) {
  const user = useAuth();
  const token = user?.cookies?.auth?.token;
  const [checked, setChecked] = useState("");
  const [diasRestriccion, setDiasRestriccion] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { showToast } = useToast(); // Usa el contexto de Toast
  const navigate = useNavigate();

  const eliminarPublicacion = async () => {
    try {
      await deletePublicacion(idReporte, token);
      showToast("Publicación eliminada");
      navigate("/dashboard");
    } catch (error) {
      showToast("Error al eliminar la publicación");
      console.log(error);
    }
  };

  const restringir = async () => {
    try {
      if (!diasRestriccion) {
        showToast("Por favor ingresa el número de días para restringir al usuario");
        setLoading(false);
        return;
      }
      showToast("Cuenta de usuario restringida");
      await restringirUsuario(idUsuario, token, dias);
      eliminarPublicacion();
    } catch (error) {
      showToast("Error al restringir al usuario");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const bloquear = async () => {
    try {
      await bloquearUsuario(idUsuario, token);
      showToast("Cuenta de usuario bloqueada");
      eliminarPublicacion();
    } catch (error) {
      showToast("Error al bloquear usuario");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const falso = async () => {
    try {
      await falsoReporte(idReporte, token, data);
      showToast("Reporte resuelto");
      navigate("/dashboard");
    } catch (error) {
      showToast("Error. No se resolvió el reporte");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = () => {
    if (!checked) {
        showToast("Tienes que seleccionar una opción")
      return;
    }
    setLoading(true);
    switch (checked) {
      case "1":
        eliminarPublicacion();
        setLoading(false);
        break;
      case "2":
        restringir();
        break;
      case "3":
        bloquear();
        break;
      case "4":
        falso();
        break;
      default:
        showToast("Tienes que seleccionar una opción");
        setLoading(false);
        break;
    }
  };

  return (
    <>
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
          <Flex align="start" direction="column" gap="4">
            <Flex asChild gap="2">
              <Text as="label" size="2">
                <Radio className="hover:cursor-pointer" name="example" value="4" checked={checked === "4"} onChange={() => setChecked("4")} />
                Es un reporte falso
              </Text>
            </Flex>
            <Flex asChild gap="2">
              <Text as="label" size="2">
                <Radio className="hover:cursor-pointer" name="example" value="1" checked={checked === "1"} onChange={() => setChecked("1")} />
                Eliminar Publicación
              </Text>
            </Flex>
            <Flex asChild gap="2">
              <Text as="label" size="2">
                <Radio className="hover:cursor-pointer" name="example" value="2" checked={checked === "2"} onChange={() => setChecked("2")} />
                Restringir al usuario por un número de días
              </Text>
            </Flex>
            {checked === "2" && (
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
                <Radio className="hover:cursor-pointer" name="example" value="3" checked={checked === "3"} onChange={() => setChecked("3")} />
                Bloquear al usuario
              </Text>
            </Flex>
          </Flex>
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
              <Button className="hover:cursor-pointer" onClick={handleSubmit}>
                Finalizar
              </Button>
            )}
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
