import React from 'react'
import { AlertDialog, Flex, Button } from '@radix-ui/themes'

export default function DeleteModerator({deleteModerador}) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red"  className='hover:cursor-pointer'>Eliminar</Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content maxWidth="450px">
        <Flex justify='between' className='pb-1'>
          <AlertDialog.Title>
            Eliminar moderador
          </AlertDialog.Title>

        </Flex>
        <AlertDialog.Description size="2">
          ¿Estás seguro de que deseas eliminar a este moderador? Esta acción no se puede deshacer. 
        </AlertDialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray" className='hover:cursor-pointer'>
              Cancelar
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button variant="solid" color="red" className='hover:cursor-pointer' 
              onClick={() => deleteModerador()}>
              Eliminar Moderador
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
