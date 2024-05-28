import React from 'react';
import { AlertDialog, Flex, Button, Spinner } from '@radix-ui/themes';
import { RxBookmark } from "react-icons/rx";


export default function DeleteModerator({ deleteModerador, loading }) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red" className='hover:cursor-pointer'>Eliminar</Button>
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
            {loading ? (
               <Button disabled>
               <Spinner loading>
                <RxBookmark />
               </Spinner>
                  Eliminar Moderador
              </Button>
            ) : (
              <Button onClick={deleteModerador} color='red' className="hover:cursor-pointer">
                Eliminar Moderador
              </Button>
            )}
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
