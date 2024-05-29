import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getReporte, deletePublicacion } from "../../../api/reportes.api"
import useAuth from "../../../context/useAuth";
import { Spinner, Text, Heading, Badge, Flex, Button, DataList } from "@radix-ui/themes"; 
import { RxHeartFilled } from "react-icons/rx";
import { BiSolidDislike } from "react-icons/bi";

export default function Reporte() {
  const user = useAuth();
  const { id } = useParams(); 
  const [data, setData] = useState([]);
  const token = user?.cookies?.auth?.token;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadReporte = async () => {
      try {
        const response = await getReporte(token, id); 
        setData(response.data)
        setLoading(true);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadReporte();
  }, []);

  const eliminarPublicacion = async (id) => {
    try {
      console.log(token)
      await deletePublicacion(id, token);
      navigate('/reportes')
    } catch (error) {
      console.log(error)
    }
  }
  
  // {data?.reporte?.motivo} {data?.reporte?.detalle}
  return (
    <div>
      {loading ? (
        <Flex align='center' justify='center' className="min-h-96">
          <Spinner />
        </Flex>
      ) : (
        data?.publicacion ? (
          <>
            <Flex align='center' gap='5' pb='5'>
              <Heading size='5'>Publicación Reportada</Heading>
              <Badge color="orange" variant="soft">
                {data?.reporte?.estado}
              </Badge>
            </Flex>

            <Flex gap='8' align='center'>
              <Flex direction='column'>
                <img src={data?.publicacion?.imagen?.secure_url} alt="" className="w-96 h-96 rounded-t-md " />
                <Badge size='2' radius="small" color="gray" className="w-96 p-2 cursor-not-allowed">
                  <RxHeartFilled size='20' color="red" />
                  {data?.publicacion?.likes}
                  <BiSolidDislike size='20' className="ml-3" />
                  {data?.publicacion?.dislike}
                </Badge>
              </Flex>

              <Flex direction='column' gap='4'>
                <Text size='2' className="font-bold">Detalle del Reporte</Text>
                <DataList.Root className="w-full">
                  <DataList.Item>
                    <DataList.Label minWidth="88px">Motivo</DataList.Label>
                    <DataList.Value>{data?.reporte?.motivo}</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label minWidth="88px">Detalle</DataList.Label>
                    <DataList.Value className="mb-4">{data?.reporte?.detalle}</DataList.Value>
                  </DataList.Item>
                </DataList.Root>

                <Text size='2' className="font-bold">Detalle de la Publicación</Text>
                <DataList.Root>
                  <DataList.Item>
                    <DataList.Label minWidth="88px">Estilo</DataList.Label>
                    <DataList.Value>{data?.publicacion?.estilo?.estiloG}</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label minWidth="88px">Género</DataList.Label>
                    <DataList.Value>{data?.publicacion?.estilo?.genero}</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label minWidth="88px">Temporada</DataList.Label>
                    <DataList.Value>{data?.publicacion?.estilo?.temporada}</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label minWidth="88px">Época</DataList.Label>
                    <DataList.Value>{data?.publicacion?.estilo?.epoca}</DataList.Value>
                  </DataList.Item>
                  <DataList.Item>
                    <DataList.Label minWidth="88px">Descripción</DataList.Label>
                    <DataList.Value>{data?.publicacion?.descripcion}</DataList.Value>
                  </DataList.Item>
                </DataList.Root>
                <Flex gap='2'>
                  <Button color="tomato" onClick={() => eliminarPublicacion(data.reporte._id)}>Eliminar publicación</Button>
                  <Button color="red">Bloquear usuario</Button>
                </Flex>
              </Flex>
            </Flex>
          </>
        ) : (
          <Flex align='center' justify='center' className="min-h-96">
            <Text size='4' color='red'>La publicación ya no existe.</Text>
          </Flex>
        )
      )}  
    </div>
  )
}
