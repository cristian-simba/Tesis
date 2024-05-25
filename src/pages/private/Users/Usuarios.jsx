import { useEffect, useState } from 'react'
import { getUsers } from '../../../api/usuarios.api'
import useAuth from '../../../context/useAuth'
import { Table, Flex, Heading, Text, Button, Spinner, Badge } from '@radix-ui/themes'

export default function Usuarios() {

  const auth = useAuth()
  const token = auth.cookies.auth.token
  const [users, setUsers] = useState([])
  const [show, setShow] = useState(false);

  useEffect(( ) => {
    const loadUsers = async () => {
      try {
        const response = await getUsers(token)
        console.log(response)
        setUsers(response.data)
      }catch(error) {
        console.error(error)
      }
    }
    loadUsers()
  }, [])

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className={`transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.Cell className="w-1/5 font-medium">Usuario</Table.Cell>
            <Table.Cell className="w-1/5 font-medium">Correo electronico</Table.Cell>
            <Table.Cell className="w-1/5 font-medium" justify='center'>Fecha de nacimiento</Table.Cell>
            <Table.Cell className="w-1/5 font-medium" justify='center'>Creación de la cuenta</Table.Cell>
            <Table.Cell className="w-1/5 font-medium" justify='center'>Estado de la cuenta</Table.Cell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.length > 0 ? (
            users.map(user => (
              <Table.Row align='center' key={user._id}>
                <Table.Cell>
                  <Flex align='center' gap='4'>
                    <img src={user.fotoperfil.secure_url} alt="" className='w-[40px] h-[40px] rounded-full'/>
                    {user.nombre} {user.apellido}
                  </Flex>
                </Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell justify='center'>
                  {new Date(user.fechaNacimiento).toISOString().split('T')[0]}
                </Table.Cell>
                <Table.Cell justify='center'>
                  {new Date(user.createdAt).toISOString().split('T')[0]}
                </Table.Cell>
                <Table.Cell justify='center'>
                  {user.bloqueo ? (
                    <Badge color="red">Bloqueado</Badge>
                  ) : user.restringido ? (
                    <Badge color="orange">Restringido</Badge>
                  ) : (
                    <Badge color="green">Activo</Badge>
                  )}
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
  )
}
