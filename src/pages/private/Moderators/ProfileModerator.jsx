// ProfileModerator.js
import React from 'react';
import { Flex, Text, Button, Dialog, DataList, Badge, Code } from "@radix-ui/themes";
import { LuUser2 } from 'react-icons/lu';
import { RxCross2 } from "react-icons/rx";
import { useTheme } from '../../../context/ThemeContext';
import useAuth from '../../../context/useAuth';
import UpdatePassword from './UpdatePassword';

export default function ProfileModerator() {
  const { theme } = useTheme();
  const auth = useAuth();
  const id = auth.cookies.auth._id;
  const nombre = auth.cookies.auth.nombre;
  const apellido = auth.cookies.auth.apellido;

  return (
    <Dialog.Root>
      <Dialog.Trigger>
      <Flex
          align='center'
          className={`hover:cursor-pointer px-3 rounded-md py-2 ${
            theme === 'dark' ? ' hover:bg-[#25366d]' : 'hover:bg-[#e7eeff]'
          }`}
        >          <LuUser2 size='20' />
          <Text size='2' className='px-2'>
            Información del perfil
          </Text>
        </Flex>
      </Dialog.Trigger>

      <Dialog.Content maxWidth="450px">
        <Flex justify="end">
          <Dialog.Close>
            <RxCross2 size="18" className="hover:cursor-pointer" />
          </Dialog.Close>
        </Flex>
        <Dialog.Title>Perfil</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Información del perfil del moderador
        </Dialog.Description>

        <DataList.Root>
          <DataList.Item align="center">
            <DataList.Label minWidth="88px">Rol</DataList.Label>
            <DataList.Value>
              <Badge color="jade" variant="soft" radius="full">
                Moderador
              </Badge>
            </DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Nombre</DataList.Label>
            <DataList.Value>{nombre}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Apellido</DataList.Label>
            <DataList.Value>{apellido}</DataList.Value>
          </DataList.Item>
          <DataList.Item>
            <DataList.Label minWidth="88px">Compania</DataList.Label>
            <DataList.Value>
              <Text>Fashion GEC</Text>
            </DataList.Value>
          </DataList.Item>
        </DataList.Root>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" className='hover:cursor-pointer'>
              Salir
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <UpdatePassword/>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}
