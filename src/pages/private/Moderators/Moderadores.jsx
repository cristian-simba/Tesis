import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import useAuth from "../../../context/useAuth";
import { getModeradores, deleteModerador } from '../../../api/moderador.api';
import { Table, Flex, Spinner} from '@radix-ui/themes'
import ModeratorDialog from "./ModeratorDialog";
import DeleteModerator from './DeleteModerator';
import { ToastContainer } from 'react-toastify';
import { NotifyError, NotifySuccess } from "../../../components/Toasts/Notifies";

export default function Moderadores() {
  const user = useAuth();
  const id = user?.cookies?.auth?._id;
  const token = user?.cookies?.auth?.token;
  const [moderadores, setModeradores] = useState([]);
  const [show, setShow] = useState(false);
  const [domReady, setDomReady] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    setDomReady(true);
  }, []);

  useEffect(() => {
    const loadModeradores = async () => {
      try {
        const response = await getModeradores(token);
        console.log(response);
        setModeradores(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    loadModeradores()
  }, [])

  const eliminarModerador = async (id) => {
    try {
      await deleteModerador(id, token);
      const response = await getModeradores(token)
      setModeradores(response.data)
      NotifySuccess("Moderador eliminado");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {domReady && createPortal(
        <ToastContainer position="top-center" 
          closeButton={false} 
          autoClose={3000}
          style={{ zIndex: 2000,width: '350px' }} />,
        document.body
      )}
    <div className={`transition-opacity duration-200 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <Flex justify='between' align='center' className='pt-2 pb-5'>

        <h1>XD</h1>
        <ModeratorDialog id={id} token={token} />
      </Flex>

      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.Cell className="w-1/5 font-medium">Nombre</Table.Cell>
            <Table.Cell className="w-1/5 font-medium">Correo electronico</Table.Cell>
            <Table.Cell className="w-1/5 font-medium" justify='center'>Creación de la cuenta</Table.Cell>
            <Table.Cell className="w-1/5 font-medium" justify='center'>Eliminar moderador</Table.Cell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {moderadores.length > 0 ? (
            moderadores.map(moderador => (
              <Table.Row align='center' key={moderador._id}>
                <Table.Cell>
                  {moderador.nombre} {moderador.apellido}
                </Table.Cell>
                <Table.Cell>
                  {moderador.email}
                </Table.Cell>
                <Table.Cell justify='center'>
                 {new Date(moderador.createdAt).toISOString().split('T')[0]}
                </Table.Cell>
                <Table.Cell justify='center'>
                  <DeleteModerator deleteModerador={() => eliminarModerador(moderador._id)}/>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan="5" align='center'><Spinner/></Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </div>
    </>
  );
}
