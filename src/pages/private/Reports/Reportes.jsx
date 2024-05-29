import { useEffect, useState } from "react";
import { getReportes } from "../../../api/reportes.api";
import { Card, Text, Flex, Badge, Spinner } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import useAuth from "../../../context/useAuth";
import { LuMailCheck, LuMail } from "react-icons/lu";

export default function Reportes() {
  const user = useAuth();
  const [reportes, setReportes] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const id = user?.cookies?.auth?._id;
  const token = user?.cookies?.auth?.token;

  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    const loadReportes = async () => {
      setLoading(true);
      try {
        const response = await getReportes(token, id);
        setReportes(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadReportes();
  }, []);

  return (
    <div
      className={`transition-opacity duration-500 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      {loading && reportes.length === 0 ? (
        <Card asChild className="w-full flex justify-center">
          <Flex>
            <Spinner />
          </Flex>
        </Card>
      ) : reportes.length > 0 ? (
        reportes.map((reporte) => (
          <Flex key={reporte._id} className="pb-2">
            <Card asChild className="w-full" variant="classic">
              <Link to={`/reporte/${reporte._id}`}>
                <Flex gap="2" align='center'>
                  {reporte.estado === 'Resuelto' ?  <LuMailCheck size='20'/> : <LuMail size='20'/>}
               
                  <Text as="div" className="font-medium">
                    Motivo: {reporte.motivo}
                  </Text>
                  <Badge color={reporte.estado === 'Resuelto' ? 'green' : 'orange'}>
                    {reporte.estado}
                  </Badge>               
                 </Flex>
                <Text size="1" className="font-thin">
                  {new Date(reporte.createdAt).toISOString().split("T")[0]}
                </Text>
                <Text as="div" color="gray" size="2">
                  {reporte.detalle}
                </Text>
              </Link>
            </Card>
          </Flex>
        ))
      ) : (
        <Card asChild className="w-full flex justify-center">
          <Text as="div" className="font-medium">
            No existen reportes en este momento
          </Text>
        </Card>
      )}
    </div>
  );
}
