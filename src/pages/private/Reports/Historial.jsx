import { Dialog, Flex, Text, Button, DataList } from "@radix-ui/themes";
import { getReporteUsuario } from "../../../api/reportes.api";
import useAuth from "../../../context/useAuth";
import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const ITEMS_PER_PAGE = 1; // Número de reportes por página

export default function Historial({ idUsuario, text }) {
  const user = useAuth();
  const [reportes, setReportes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const token = user?.cookies?.auth?.token;

  useEffect(() => {
    const historialUsuario = async () => {
      try {
        const response = await getReporteUsuario(token, idUsuario);
        setReportes(response.data); // Asegúrate de que `response.data` contiene los reportes
      } catch (error) {
        console.log(error);
      }
    };
    if (token && idUsuario) {
      historialUsuario();
    }
  }, [token, idUsuario]);

  // Función para cambiar de página
  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calcular el índice de los reportes a mostrar en la página actual
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const selectedReportes = reportes.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(reportes.length / ITEMS_PER_PAGE);

  return (
    <Dialog.Root>
      <Dialog.Trigger className="cursor-pointer">
        <Button color="gray" variant="soft">{text}</Button>
      </Dialog.Trigger>
      <Dialog.Content maxWidth='400px'>
      <Flex justify="end">
          <Dialog.Close>
            <RxCross2 size="20" className="hover:cursor-pointer" />
          </Dialog.Close>
        </Flex>
        <Flex justify='center' pb='5'>
          <Text className="font-bold">Historial de reportes</Text>
        </Flex>
        {reportes.length > 0 ? (
          <>
            <DataList.Root>
              {selectedReportes.map((reporte, index) => (
                <DataList.Item key={index}>
                  <DataList.Label minWidth="88px">Motivo</DataList.Label>
                  <DataList.Value>{reporte.motivo}</DataList.Value>
                  <DataList.Label minWidth="88px">Detalle</DataList.Label>
                  <DataList.Value>{reporte.detalle}</DataList.Value>
                  <DataList.Label minWidth="88px">Estado</DataList.Label>
                  <DataList.Value>{reporte.estado}</DataList.Value>
                  <DataList.Label minWidth="88px">Fecha</DataList.Label>
                  <DataList.Value>{new Date(reporte.createdAt).toISOString().split("T")[0]}</DataList.Value>

                </DataList.Item>
              ))}
            </DataList.Root>
            {reportes.length > ITEMS_PER_PAGE && (
              <Flex justify="center" align='center' gap="1" className="pt-7">
                <Text size='2' className="pr-2">Página {currentPage} de {totalPages}</Text>
                <Button  className="cursor-pointer"
                  onClick={() => changePage(currentPage - 1)} 
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                <Button  className="cursor-pointer"
                  onClick={() => changePage(currentPage + 1)} 
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </Button>
              </Flex>
            )}
          </>
        ) : (
          <Text>No hay reportes anteriores para este usuario.</Text>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
}
