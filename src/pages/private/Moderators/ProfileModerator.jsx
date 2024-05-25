import React from 'react'
import { Flex, Text, Heading, Button, Dialog, Spinner, TextField } from "@radix-ui/themes";
import { LuLayoutDashboard, LuUsers2, LuBell, LuSettings, LuMoon, LuMail, LuUser2 } from 'react-icons/lu';
export default function ProfileModerator() {

  return (
    <Dialog.Root >
      <Dialog.Trigger>
          <Text size='2' className='px-2 py-1 pb-1 '>
            Información del perfil
          </Text>

      </Dialog.Trigger>

  <Dialog.Content maxWidth="450px">
    <Dialog.Title>Edit profile</Dialog.Title>
    <Dialog.Description size="2" mb="4">
      Make changes to your profile.
    </Dialog.Description>

    <Flex direction="column" gap="3">
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Name
        </Text>
        <TextField.Root
          defaultValue="Freja Johnsen"
          placeholder="Enter your full name"
        />
      </label>
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Email
        </Text>
        <TextField.Root
          defaultValue="freja@example.com"
          placeholder="Enter your email"
        />
      </label>
    </Flex>

    <Flex gap="3" mt="4" justify="end">
      <Dialog.Close>
        <Button variant="soft" color="gray">
          Cancel
        </Button>
      </Dialog.Close>
      <Dialog.Close>
        <Button>Save</Button>
      </Dialog.Close>
    </Flex>
  </Dialog.Content>
</Dialog.Root>
  )
}
