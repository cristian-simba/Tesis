import React, { useState, useEffect } from 'react';
import useAuth from "../../../context/useAuth";
import { getModeradores, deleteModerador } from '../../../api/moderador.api';
import { Table, Flex, Spinner, TextField, Avatar } from '@radix-ui/themes';
import { RxMagnifyingGlass } from 'react-icons/rx';
import ModeratorDialog from "./ModeratorDialog";
import DeleteModerator from './DeleteModerator';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Moderadores() {
  const user = useAuth();
  const id = user?.cookies?.auth?._id;
  const token = user?.cookies?.auth?.token;
  const [moderadores, setModeradores] = useState([]);
  const [show, setShow] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    const loadModeradores = async () => {
      try {
        const response = await getModeradores(token);
        setModeradores(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    loadModeradores();
  }, [token]);

  const eliminarModerador = async (id) => {
    try {
      await deleteModerador(id, token);
      const response = await getModeradores(token);
      setModeradores(response.data);
      setSuccessMessage('Moderador eliminado con éxito');
    } catch (error) {
      setErrorMessage('Error al eliminar el moderador');
    }
  };
  
  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage, { onClose: () => setSuccessMessage('') });
    }
  }, [successMessage]);
  
  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage, { onClose: () => setErrorMessage('') });
    }
  }, [errorMessage]);
  

  const filteredModeradores = moderadores.filter(moderador =>
    `${moderador.nombre} ${moderador.apellido} ${moderador.email} ${moderador.createdAt}`.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      <div className={`transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
        <Flex justify='between' align='center' className='pt-2 pb-5'>
          <TextField.Root placeholder="Buscar moderador" className='w-1/2' value={searchText} onChange={e => setSearchText(e.target.value)}>
            <TextField.Slot>
              <RxMagnifyingGlass size='20' />
            </TextField.Slot>
          </TextField.Root>
          <ModeratorDialog id={id} token={token} />
        </Flex>

        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.Cell className="w-1/5 font-medium">Moderador</Table.Cell>
              <Table.Cell className="w-1/5 font-medium">Correo electrónico</Table.Cell>
              <Table.Cell className="w-1/5 font-medium" justify='center'>Creación de la cuenta</Table.Cell>
              <Table.Cell className="w-1/5 font-medium" justify='center'>Eliminar moderador</Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {filteredModeradores.length > 0 ? (
              filteredModeradores.map(moderador => (
                <Table.Row align='center' key={moderador._id}>
                  <Table.Cell>
                    <Avatar fallback={moderador.nombre ? moderador.nombre[0] : "M"} size="2" radius='full' className='mr-4' />
                    {moderador.nombre} {moderador.apellido}
                  </Table.Cell>
                  <Table.Cell>{moderador.email}</Table.Cell>
                  <Table.Cell justify='center'>{new Date(moderador.createdAt).toISOString().split('T')[0]}</Table.Cell>
                  <Table.Cell justify='center'>
                    <DeleteModerator deleteModerador={() => eliminarModerador(moderador._id)} />
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              searchText ? (
                <Table.Row>
                  <Table.Cell colSpan="5" align='center'>No se encontraron moderadores</Table.Cell>
                </Table.Row>
              ) : (
                <Table.Row>
                  <Table.Cell colSpan="5" align='center'><Spinner /></Table.Cell>
                </Table.Row>
              )
            )}
          </Table.Body>
        </Table.Root>
      </div>
    </>
  );
}
