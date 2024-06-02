import { useEffect, useState } from "react";
import { Dialog, Radio, Text, Flex, Button, DropdownMenu } from "@radix-ui/themes";
import { LuBell, LuMail, LuBellDot } from 'react-icons/lu';
import useAuth from '../../context/useAuth';
import { getReportes } from "../../api/reportes.api";
import { Link } from "react-router-dom";

export default function Notificaciones() {
  const user = useAuth();
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hayReporte, setHayReporte] = useState(false); 
  const [menuOpen, setMenuOpen] = useState(false); 
  const token = user?.cookies?.auth?.token;

  useEffect(() => {
    const loadReportes = async () => {
      setLoading(true);
      try {
        const response = await getReportes(token);
        setReportes(response.data);

      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadReportes();

    const intervalId = setInterval(loadReportes, 400000);

    return () => clearInterval(intervalId);
  }, [token]);

  const reportesNoResueltos = reportes.filter(reporte => reporte.estado === "No resuelto");

  return (
    <DropdownMenu.Root open={menuOpen} onOpenChange={(isOpen) => setMenuOpen(isOpen)}>
      <DropdownMenu.Trigger className="cursor-pointer">
        <Button variant="soft" color='gray'>
          {hayReporte ? <LuBellDot  size='15'/>: <LuBell size='15'/> }
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content className="w-60">
        {reportesNoResueltos.length > 0 ? (
          reportesNoResueltos.map((reporte, index) => (
            <Flex direction='column' className="h-full border-b-[1px] px-2 py-1" key={index}>
              <Text size='2' className="">Reporte</Text>
              <Flex align={'center'} gap='2' pt='1'>
                <LuMail size='20'/>
                <Flex direction='column'>
                  <Text size='2'>Motivo: {reporte.motivo}</Text>
                </Flex>
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
        )}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  )
}
