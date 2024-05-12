import { Flex, Heading, Text, Dialog, ScrollArea, Box} from '@radix-ui/themes'
import { RxCross2 } from "react-icons/rx";

export default function Normativa({text}) {
  return (
    <Dialog.Root>
    <Dialog.Trigger>
      <Text className='text-blue-700 hover:cursor-pointer'>{text}</Text>
    </Dialog.Trigger>
    <Dialog.Content maxWidth="700px">
    <Flex justify='end'>
        <Dialog.Close>
          <RxCross2 size='20' className='hover:cursor-pointer' />
        </Dialog.Close>
    </Flex>
    <ScrollArea type="always" scrollbars="vertical" style={{ height: 400 } }>
      <Box p="2" pr="6">
        <Heading size="4" mb="2" trim="start">
          Términos y Condiciones de Uso de FashionGEC
        </Heading>
        <Flex direction="column" gap="4">
          <Text as="p">
          Bienvenido a FashionGEC. A continuación, se presentan los términos y condiciones que rigen el uso de nuestra aplicación. Por favor, lee estos términos detenidamente antes de utilizar nuestra aplicación. Al acceder o utilizar nuestra aplicación, aceptas estar sujeto a estos términos y condiciones.
          </Text>

          <Text as="p">
          FashionGEC es una plataforma para compartir y descubrir estilos de ropa. Los usuarios pueden cargar imágenes de sus outfits, buscar inspiración y guardar tus estilos favoritos
          </Text>

          <Text as="p">
          1. Los usuarios son los únicos responsables del contenido que publican en FashionGEC. Al publicar contenido en nuestra aplicación, garantizas que tienes los derechos necesarios sobre dicho contenido y que no viola ninguna ley ni los derechos de terceros, en caso de ser violados los derechos se procederá a bloquear la cuenta el usuario.
          </Text>

          <Text as="p">
          2. FashionGEC no se hace responsable del contenido publicado por los usuarios.Sin embargo, nos reservamos el derecho de eliminar cualquier contenido que consideremos inapropiado o que viole estos términos y condiciones.
          </Text>

          <Text as="p">
          3. Los usuarios deben utilizar FashionGEC de manera adecuada y respetuosa. No se permite publicar contenido que sea ofensivo, difamatorio, obsceno, ilegal o que viole los derechos de propiedad intelectual de terceros.
          </Text>

          <Text as="p">
          4. Respetamos la privacidad de nuestros usuarios. Sin embargo, al utilizar nuestra aplicación, aceptas que tu contenido pueda ser visto y compartido por otros usuarios de FashionGEC
          </Text>

          <Text as="p">
          5. Todos los derechos de propiedad intelectual sobre FashionGEC y su contenido pertenecen a FashionGEC. No está permitido copiar, modificar o distribuir nuestro contenido sin nuestro consentimiento.
          </Text>

          <Text as="p">
          6. Nos reservamos el derecho de modificar o actualizar estos términos y condiciones en cualquier momento. Te recomendamos que revises periódicamente estos términos para estar al tanto de cualquier cambio.
          </Text>

          <Text as="p">
          7. FashionGEC se reserva el derecho de suspender o cancelar el acceso de cualquier usuario que viole repetidamente estos términos y condiciones o que realice un uso indebido de la aplicación.
          </Text>

          <Text as="p">
          8. Los usuarios son responsables de mantener la seguridad de sus cuentas y contraseñas. FashionGEC no se hace responsable de ningún acceso no autorizado a las cuentas de usuario. Los usuarios deben notificar inmediatamente a FashionGEC sobre cualquier actividad sospechosa en su cuenta.
          </Text>

          <Text as="p">
          Si tienes alguna pregunta o inquietud sobre estos términos y condiciones, no dudes en contactarnos. Al utilizar FashionGEC, aceptas estos términos y condiciones. Si no estás de acuerdo con alguno de estos términos, por favor, abstente de utilizar nuestra aplicación.
          </Text>

          <Text as="p">
          ¡Gracias por ser parte de FashionGEC!
          </Text>
        </Flex>
      </Box>
    </ScrollArea>
    </Dialog.Content>
  </Dialog.Root>
  )
}
