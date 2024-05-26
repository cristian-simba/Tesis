import { useEffect, useState } from 'react'
import { getUsers } from '../../../api/usuarios.api'
import useAuth from '../../../context/useAuth'
import { Table, Flex, TextField, Select, Spinner, Badge } from '@radix-ui/themes'
import { RxMagnifyingGlass } from 'react-icons/rx';
import { LuListFilter } from "react-icons/lu";

export default function Usuarios() {

  const auth = useAuth()
  const token = auth.cookies.auth.token
  const [users, setUsers] = useState([])
  const [show, setShow] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedValue, setSelectedValue] = useState('todos');

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
  
  const filteredUsers = users.filter(user => {
    const matchesSearchText = `${user.nombre} ${user.apellido} ${user.email} ${user.createdAt} ${user.fechaNacimiento}`.toLowerCase().includes(searchText.toLowerCase());
    switch (selectedValue) {
      case 'activos':
        return matchesSearchText && !user.bloqueo && !user.restringido;
      case 'restringidos':
        return matchesSearchText && user.restringido;
      case 'bloqueados':
        return matchesSearchText && user.bloqueo;
      default:
        return matchesSearchText;
    }
  });


  return (
    <div className={`transition-opacity duration-500 ${show ? 'opacity-100' : 'opacity-0'}`}>
      <Flex justify='between' align='center' className='pt-2 pb-5'>

        <TextField.Root placeholder="Buscar usuario" className='w-1/2' value={searchText} onChange={e => setSearchText(e.target.value)}>
          <TextField.Slot>
            <RxMagnifyingGlass size='20' />
          </TextField.Slot>
        </TextField.Root>
        
        <Select.Root defaultValue="todos" onValueChange={setSelectedValue} >
          <Select.Trigger className='hover:cursor-pointer bg-[#3e63dd] text-white'/>
          <Select.Content position="popper">
            <Select.Item value="todos" className='hover:cursor-pointer'> 
              <Flex align='center' >
              <LuListFilter size='20' className='pr-2'/>
              Todos los usuarios

              </Flex>
            </Select.Item>
            <Select.Item value="activos" className='hover:cursor-pointer'>Usuarios activos</Select.Item>
            <Select.Item value="restringidos" className='hover:cursor-pointer'>Usuarios restringidos</Select.Item>
            <Select.Item value="bloqueados" className='hover:cursor-pointer'>Usuarios bloqueados</Select.Item>
          </Select.Content>
        </Select.Root>

      </Flex>

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
          {filteredUsers.length > 0 ? (
            filteredUsers.map(user => (
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
          )  : users.length > 0 || show ? (
            searchText || selectedValue !== 'todos' ? (
              <Table.Row>
                <Table.Cell colSpan="5" align='center'>No se encontraron usuarios</Table.Cell>
              </Table.Row>
            ) : (
              <Table.Row>
                <Table.Cell colSpan="5" align='center'><Spinner/></Table.Cell>
              </Table.Row>
            )
          ) : (
            <Table.Row>
              <Table.Cell colSpan="5" align='center'>No existen usuarios</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table.Root>
    </div>
  )
}
