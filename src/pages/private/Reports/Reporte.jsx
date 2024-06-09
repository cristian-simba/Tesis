// Reporte.js
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getReporte, cambioEstado } from "../../../api/reportes.api";
import useAuth from "../../../context/useAuth";
import { Spinner, Text, Heading, Badge, Flex, Button, DataList, Dialog, Card } from "@radix-ui/themes"; 
import { RxHeartFilled } from "react-icons/rx";
import { LuMailCheck, LuMail, LuMailX } from "react-icons/lu";
import { BiSolidDislike } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import Acciones from "./Acciones";
import Historial from "./Historial";
import { RiFileShield2Line } from "react-icons/ri";

export default function Reporte(props) {
  const user = useAuth();
  const { reporte, refresh } = props; // Extraer 'id' de props correctamente
  const [data, setData] = useState([]);
  const token = user?.cookies?.auth?.token;
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dataApi = {}

  useEffect(() => {
    const loadReporte = async () => {
      try {
        const response = await getReporte(token, reporte._id); 
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    loadReporte();
  }, [reporte._id, token]);

  const cambioPublicacion = async() => {
    try{
      console.log("Cambiado")
      await cambioEstado(reporte._id, token, data)
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div>
      {loading ? (
        <Flex align='center' justify='center' className="min-h-96">
          <Spinner />
        </Flex>
      ) : (
        <Dialog.Root>
          <Dialog.Trigger className="cursor-pointer">
          <Flex key={props.reporte._id} className="pb-2">
            <Card asChild className="w-full" variant="classic">
              <Flex to={`/reporte/${props.reporte._id}`}>
                <Flex gap="2" align='center'>
                  {props.reporte.estado === 'Resuelto' ? <LuMailCheck size='20' /> : 'Borrado' ? <LuMail size='20'/> : <LuMail size='20' />}
                  <Text as="div" className="font-medium">
                    Motivo: {props.reporte.motivo}
                  </Text>
                  <Badge color={props.reporte.estado === 'Resuelto' ? 'green' : 'No resuelto' ? 'orange' : 'red'}>
                    {props.reporte.estado}
                  </Badge>
                 </Flex>
                <Text size="1" className="font-thin">
                  {new Date(props.reporte.createdAt).toISOString().split("T")[0]}
                </Text>
                <Text as="div" color="gray" size="2">
                  {props.reporte.detalle}
                </Text>
              </Flex>
            </Card>
          </Flex>
          </Dialog.Trigger>

          <Dialog.Content maxWidth="750px" className="px-10">
            <Flex justify="end">
              <Dialog.Close>
                <RxCross2 size="20" className="hover:cursor-pointer" />
              </Dialog.Close>
            </Flex>
            <Dialog.Title>Publicación Reportada</Dialog.Title>
            <Dialog.Description size="2" >
              Detalles de la publicación y el reporte.
            </Dialog.Description>

            {data?.publicacion ? (
              <Flex gap="6" align="start" className="pt-4">
                <Flex direction="column" align="center">
                  <img src={data?.publicacion?.imagen?.secure_url} alt="" className="w-96 h-96 rounded-t-md" />
                  <Badge size="2" radius="small" color="gray" className="w-full p-2 cursor-not-allowed mt-2">
                    <RxHeartFilled size="20" color="red" />
                    {data?.publicacion?.likes}
                    <BiSolidDislike size="20" className="ml-3" />
                    {data?.publicacion?.dislike}
                  </Badge>
                </Flex>

                <Flex direction="column" gap="4" flex="1" >
                  <Text size="2" className="font-bold">Detalle del Reporte</Text>
                  <DataList.Root>
                    <DataList.Item>
                      <DataList.Label minWidth="88px">Motivo</DataList.Label>
                      <DataList.Value>{data?.reporte?.motivo}</DataList.Value>
                    </DataList.Item>
                    <DataList.Item>
                      <DataList.Label minWidth="88px">Detalle</DataList.Label>
                      <DataList.Value className="mb-4">{data?.reporte?.detalle}</DataList.Value>
                    </DataList.Item>
                  </DataList.Root>

                  <Text size="2" className="font-bold">Detalle de la Publicación</Text>
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
                  
                  <Historial idUsuario={data.reporte.usuarioId} text={"Ver historial del usuario"}/>

                  <Flex gap="3" mt="4" justify="end">
                    <Dialog.Close>
                      <Button variant="soft" color="gray" className="hover:cursor-pointer">
                        Regresar
                      </Button>
                    </Dialog.Close>
                    <Acciones idReporte={props.reporte._id} idUsuario={data.reporte.usuarioId}/>
                  </Flex>
                </Flex>
              </Flex>
            ) : (
              <Flex direction={'column'}  align='center' justify='center' className="min-h-96" gap="5">
                <RiFileShield2Line className="size-36"/>

                <Text size='4' color='red'>Otro moderador ya resolvió el reporte</Text>
                <Dialog.Close>
                  <Button onClick={() => { 
                    cambioPublicacion(); 
                    refresh()
                  }} className="w-32 cursor-pointer">
                  Finalizar</Button>
                </Dialog.Close>
              </Flex>
            )}
          </Dialog.Content>
        </Dialog.Root>
      )}
    </div>
  );
}
