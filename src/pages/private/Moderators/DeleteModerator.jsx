import React from 'react';
import { Dialog, Text, Flex, Button, Spinner } from '@radix-ui/themes';
import { RxBookmark, RxCross2 } from "react-icons/rx";

export default function DeleteModerator({ deleteModerador, loading }) {
  const [open, setOpen] = React.useState(false);
  console.log("Cargando: ", loading)

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger>
          <Button color="red" className='hover:cursor-pointer'>Eliminar</Button>
        </Dialog.Trigger>
        <Dialog.Content maxWidth="450px">
          <Flex justify='end'>
            <Dialog.Close>
              <RxCross2 size="20" className="hover:cursor-pointer" />
            </Dialog.Close>
          </Flex>
          <Flex justify='between' className='pb-1'>
            <Dialog.Title>Eliminar moderador</Dialog.Title>
          </Flex>
          <Dialog.Description size="2">
            ¿Estás seguro de que deseas eliminar a este moderador? Esta acción no se puede deshacer.
          </Dialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray" className='hover:cursor-pointer'>
                Cancelar
              </Button>
            </Dialog.Close>
            <Button onClick={deleteModerador} color='red' className="hover:cursor-pointer" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="15" />
                  <span>Eliminar Moderador</span>
                </>
              ) : (
                <span>Eliminar Moderador</span>
              )}
            </Button>

          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
}
