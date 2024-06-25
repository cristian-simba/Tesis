import React, { useState, useEffect } from "react";
import useAuth from "../../../context/useAuth";
import { getModeradores, deleteModerador, getModeradoresSinVerificar } from "../../../api/moderador.api";
import { Table, Flex, Spinner, TextField, Avatar, Badge } from "@radix-ui/themes";
import { RxMagnifyingGlass } from "react-icons/rx";
import ModeratorDialog from "./ModeratorDialog";
import DeleteModerator from "./DeleteModerator";
import { useToast } from '../../../context/ToastContext';
import "react-toastify/dist/ReactToastify.css";

export default function Moderadores() {
  const user = useAuth();
  const id = user?.cookies?.auth?._id;
  const token = user?.cookies?.auth?.token;
  const [moderadores, setModeradores] = useState([]);
  const [show, setShow] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast(); // Usa el contexto de Toast

  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    const loadModeradores = async () => {
      setLoading(true);
      try {
        const responseModeradores = await getModeradoresSinVerificar(token);
        const responseModeradoresVerificados = await getModeradores(token);
  
        // Combina las listas de moderadores, evitando duplicados por el ID del moderador
        const combinedModeradores = [
          ...responseModeradores.data,
          ...responseModeradoresVerificados.data.filter(
            moderadorVerificado => !responseModeradores.data.some(
              moderadorSinVerificar => moderadorSinVerificar._id === moderadorVerificado._id
            )
          )
        ];
  
        // Filtra los moderadores que no tienen el atributo "super"
        const filteredModeradores = combinedModeradores.filter(moderador => !moderador.super);
  
        setModeradores(filteredModeradores);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadModeradores();
  }, [token]);
  

  const eliminarModerador = async (id) => {
    setLoading(true)
    try {
      await deleteModerador(id, token);
      const responseModeradores = await getModeradoresSinVerificar(token);
      const responseModeradoresVerificados = await getModeradores(token);

      // Combina las listas de moderadores, evitando duplicados por el ID del moderador
      const combinedModeradores = [
        ...responseModeradores.data,
        ...responseModeradoresVerificados.data.filter(
          moderadorVerificado => !responseModeradores.data.some(
            moderadorSinVerificar => moderadorSinVerificar._id === moderadorVerificado._id
          )
        )
      ];

      // Filtra los moderadores que no tienen el atributo "super"
      const filteredModeradores = combinedModeradores.filter(moderador => !moderador.super);

      setModeradores(filteredModeradores);
      showToast("Moderador eliminado exitosamente");
    } catch (error) {
      showToast("Error al eliminar el moderador");
    } finally {
      setLoading(false)
    }
  };


  const filteredModeradores = moderadores.filter((moderador) =>
    `${moderador.nombre} ${moderador.apellido} ${moderador.email} ${moderador.createdAt}`
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );

  return (
    <>
      <div
        className={`transition-opacity duration-500 ${
          show ? "opacity-100" : "opacity-0"
        }`}
      >
        <Flex justify="between" align="center" className="pt-2 pb-5">
          <TextField.Root
            placeholder="Buscar moderador"
            className="w-1/2"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          >
            <TextField.Slot>
              <RxMagnifyingGlass size="20" />
            </TextField.Slot>
          </TextField.Root>
          <ModeratorDialog id={id} token={token} />
        </Flex>

        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.Cell className="w-1/5 font-medium">Moderador</Table.Cell>
              <Table.Cell className="w-1/5 font-medium">
                Correo electrónico
              </Table.Cell>
              <Table.Cell className="w-1/5 font-medium" justify="center">
                Creación de la cuenta
              </Table.Cell>
              <Table.Cell className="w-1/5 font-medium" justify="center">
                Estado de la cuenta
              </Table.Cell>
              <Table.Cell className="w-1/5 font-medium" justify="center">
                Eliminar moderador
              </Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {loading && filteredModeradores.length === 0 ? (
              <Table.Row>
                <Table.Cell colSpan="4" align="center">
                  <Spinner />
                </Table.Cell>
              </Table.Row>
            ) : filteredModeradores.length > 0 ? (
              filteredModeradores.map((moderador) => (
                <Table.Row align="center" key={moderador._id}>
                  <Table.Cell>
                  <Avatar fallback={moderador.nombre ? moderador.nombre[0] : "M"} size="2" radius='full' className='mr-4'/>
                    {moderador.nombre} {moderador.apellido}
                  </Table.Cell>
                  <Table.Cell>{moderador.email}</Table.Cell>
                  <Table.Cell justify="center">
                    {new Date(moderador.createdAt).toISOString().split("T")[0]}
                  </Table.Cell>
                  <Table.Cell className="w-1/5 font-medium" justify="center">
                    {moderador.token ? (
                      <Badge color="green">Verificado</Badge>
                    ) : (
                      <Badge>No verificado</Badge>
                    )}
                  </Table.Cell>

                  <Table.Cell justify="center">
                    <DeleteModerator
                      deleteModerador={() => eliminarModerador(moderador._id)}
                      loading={loading}
                    />
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell colSpan="4" align="center">
                  No se encontraron moderadores
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </div>
    </>
  );
}
