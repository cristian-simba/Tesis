import { useEffect, useState } from 'react'
import { getUsers } from '../../api/usuarios.api'
import useAuth from '../../context/useAuth'
import { Table, Flex, Heading, Text, Button } from '@radix-ui/themes'

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
    <div className={`transition-opacity duration-200 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <Table.Root variant='surface'>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Usuario</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Fecha de nacimiento</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Creación de la cuenta</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {users.map(user => (
            <Table.Row align='center'>
              <Table.Cell>
                <Flex align='center' gap='4'>
                <img src={user.fotoperfil.secure_url} alt="" className='w-[40px] h-[40px] rounded-full'/>
                 {user.nombre} {user.apellido}
                </Flex>
              </Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>
                {new Date(user.fechaNacimiento).toISOString().split('T')[0]}
              </Table.Cell>
              <Table.Cell>
                {new Date(user.createdAt).toISOString().split('T')[0]}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
