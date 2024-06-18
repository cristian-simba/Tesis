import { useEffect, useState } from "react";
import { Dialog, Radio, Text, Flex, Button, DropdownMenu } from "@radix-ui/themes";
import { LuBell, LuMail, LuBellDot } from 'react-icons/lu';
import useAuth from '../../context/useAuth';
import { getNotificaciones } from "../../api/reportes.api";
import { Link } from "react-router-dom";
import { Spinner } from "@radix-ui/themes";

export default function Notificaciones() {
  const user = useAuth();
  const [notificaciones, setNotificaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); 
  const [hayNotificaciones, setHayNotificaciones] = useState(false); 
  const token = user?.cookies?.auth?.token;

  const loadNotificaciones = async () => {
    setLoading(true);
    try {
      const response = await getNotificaciones(token);
      setNotificaciones(response.data);
      setHayNotificaciones(response.data.length > 0);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotificaciones();
  }, []); // Esto se ejecutará solo una vez al montar el componente

  const handleMenuOpenChange = (isOpen) => {
    setMenuOpen(isOpen);
    if (isOpen) {
      loadNotificaciones();
    }
  };

  return (
    <DropdownMenu.Root open={menuOpen} onOpenChange={handleMenuOpenChange}>
      <DropdownMenu.Trigger className="cursor-pointer">
        <Button variant="soft" color='gray'>
          {hayNotificaciones ? <LuBellDot  size='15'/>: <LuBell size='15'/> }
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-72 origin-top-left transform -translate-x-16 transition-transform duration-300">

      {loading ? (
          <Flex justify='center' items='center' className='h-full'>
            <Spinner />
          </Flex>
        ) : (
          notificaciones.length > 0 ? (
            notificaciones.map((notificacion, index) => (
              <Flex direction='column' className="h-full border-b-[1px] px-2 py-1" key={index}>
                <Text size='2' className="font-medium pb-1">Notificación</Text>
                <Flex align={'center'} gap='2' pt='1'>
                  <LuMail size='25'/>
                  <Flex direction='column'>
                    <Text size='2' className="font-medium">{notificacion.mensaje}</Text>
                  </Flex>
                </Flex>
                <Flex direction='column'>
                  <Text size='2'>Reportante: {notificacion.Reportante}</Text>
                  <Text size='2'>Reportado: {notificacion.Reportado}</Text>
                </Flex>
                <Flex align='end' justify='end'>
                  <Text size='2' color="blue" className="underline cursor-pointer" onClick={() => setMenuOpen(false)}>
                    <Link to='/reportes'>
                      Ver más
                    </Link>
                  </Text>
                </Flex>
              </Flex>
            ))
          ) : (
            <Flex direction='column' className="h-full px-2 py-1">
              <Text size='2' className="text-gray-500">No hay notificaciones</Text>
            </Flex>
          )
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}
