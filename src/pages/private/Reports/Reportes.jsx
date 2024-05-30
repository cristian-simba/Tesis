import { useEffect, useState } from "react";
import { getReportes } from "../../../api/reportes.api";
import { Card, Text, Flex, Badge, Spinner, Select, TextField } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import useAuth from "../../../context/useAuth";
import { LuMailCheck, LuMail, LuMailX } from "react-icons/lu";
import { RxMagnifyingGlass } from "react-icons/rx";

export default function Reportes() {
  const user = useAuth();
  const [reportes, setReportes] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedValue, setSelectedValue] = useState("todos");

  const token = user?.cookies?.auth?.token;

  useEffect(() => {
    setShow(true);
  }, []);

  useEffect(() => {
    const loadReportes = async () => {
      setLoading(true);
      try {
        const response = await getReportes(token);
        setReportes(response.data);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadReportes();
  }, [token]);

  const filteredReports = reportes.filter((reporte) => {
    const matchesSearchText =
      `${reporte.motivo} ${reporte.detalle} ${reporte.createdAt}`
        .toLowerCase()
        .includes(searchText.toLowerCase());
    switch (selectedValue) {
      case "Resueltos":
        return matchesSearchText && reporte.estado === "Resuelto";
      case "No resueltos":
        return matchesSearchText && reporte.estado === "No resuelto";
      case "Borrados":
        return matchesSearchText && reporte.estado === "Borrado";
      default:
        return matchesSearchText;
    }
  });

  return (
    <div
      className={`transition-opacity duration-500 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <Flex justify="between" align="center" className="pt-2 pb-5">
        <TextField.Root
          placeholder="Buscar reporte"
          className="w-1/2"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        >
          <TextField.Slot>
            <RxMagnifyingGlass size="20" />
          </TextField.Slot>
        </TextField.Root>

        <Select.Root value={selectedValue} onValueChange={setSelectedValue}>
          <Select.Trigger className="hover:cursor-pointer bg-[#3e63dd] text-white">
            {selectedValue === "todos" ? (
              <Flex align="center">
                {/* <LuListFilter size="20" className="pr-2" /> */}
                Todos los reportes
              </Flex>
            ) : selectedValue === "Resueltos" ? (
              <Flex align="center">Resueltos</Flex>
            ) : selectedValue === "No resueltos" ? (
              <Flex align="center">No resueltos</Flex>
            )
            : selectedValue === "Borrados" ? (
              <Flex align="center">Borrados</Flex>
            ) : null}
          </Select.Trigger>
          <Select.Content position="popper">
            <Select.Item value="todos" className="hover:cursor-pointer">
              <Flex align="center">
                Todos los reportes
              </Flex>
            </Select.Item>
            <Select.Item value="Resueltos" className="hover:cursor-pointer">
              Resueltos
            </Select.Item>
            <Select.Item value="No resueltos" className="hover:cursor-pointer">
              No resueltos
            </Select.Item>
            <Select.Item value="Borrados" className="hover:cursor-pointer">
              Borrados
            </Select.Item>
          </Select.Content>
        </Select.Root>
      </Flex>

      {loading && reportes.length === 0 ? (
        <Card asChild className="w-full flex justify-center">
          <Flex>
            <Spinner />
          </Flex>
        </Card>
      ) : filteredReports.length > 0 ? (
        filteredReports.map((reporte) => (
          <Flex key={reporte._id} className="pb-2">
            <Card asChild className="w-full" variant="classic">
              <Link to={`/reporte/${reporte._id}`}>
                <Flex gap="2" align='center'>
                  {reporte.estado === 'Resuelto' ? <LuMailCheck size='20' /> : 'Borrado' ? <LuMailX size='20'/> : <LuMail size='20' />}
                  <Text as="div" className="font-medium">
                    Motivo: {reporte.motivo}
                  </Text>
                  <Badge color={reporte.estado === 'Resuelto' ? 'green' : 'Borrado' ? 'orange' : 'red'}>
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
            No existen reportes
          </Text>
        </Card>
      )}
    </div>
  );
}
