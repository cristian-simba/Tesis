// import { useEffect, useState } from "react";
// import { getReportes } from "../../../api/reportes.api";
// import { Card, Text, Flex, Badge, Spinner, Select, TextField } from "@radix-ui/themes";
// import useAuth from "../../../context/useAuth";
// import { RxMagnifyingGlass } from "react-icons/rx";
// import Reporte from "./Reporte";

// export default function Reportes() {
//   const user = useAuth();
//   const [reportes, setReportes] = useState([]);
//   const [show, setShow] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [searchText, setSearchText] = useState("");
//   const [selectedValue, setSelectedValue] = useState("No resueltos");

//   const token = user?.cookies?.auth?.token;

//   useEffect(() => {
//     setShow(true);
//   }, []);

//   useEffect(() => {
//     const loadReportes = async () => {
//       setLoading(true);
//       try {
//         const response = await getReportes(token);
//         setReportes(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     loadReportes();
//   }, [token]);

//   const filteredReports = reportes.filter((reporte) => {
//     const matchesSearchText =
//       `${reporte.motivo} ${reporte.detalle} ${reporte.createdAt}`
//         .toLowerCase()
//         .includes(searchText.toLowerCase());
//     return matchesSearchText && reporte.estado === "No resuelto";
//   });

//   return (
//     <div
//       className={`transition-opacity duration-500 ${
//         show ? "opacity-100" : "opacity-0"
//       }`}
//     >
//       <Flex justify="between" align="center" className="pt-2 pb-5">
//         <TextField.Root
//           placeholder="Buscar reporte"
//           className="w-1/2"
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//         >
//           <TextField.Slot>
//             <RxMagnifyingGlass size="20" />
//           </TextField.Slot>
//         </TextField.Root>

//         <Select.Root value={selectedValue} onValueChange={setSelectedValue}>
//           <Select.Trigger className="hover:cursor-pointer bg-[#3e63dd] text-white">
//             {selectedValue === "No resueltos" && (
//               <Flex align="center">No resueltos</Flex>
//             )}
//           </Select.Trigger>
//         </Select.Root>
//       </Flex>

//       {loading && reportes.length === 0 ? (
//         <Card asChild className="w-full flex justify-center">
//           <Flex>
//             <Spinner />
//           </Flex>
//         </Card>
//       ) : filteredReports.length > 0 ? (
//         filteredReports.map((reporte) => (
//           <Reporte key={reporte._id} reporte={reporte}/>
//         ))
//       ) : (
//         <Card asChild className="w-full flex justify-center">
//           <Text as="div" className="font-medium">
//             No existen reportes
//           </Text>
//         </Card>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { getReportes } from "../../../api/reportes.api";
import { Card, Text, Flex, Badge, Spinner, Select, TextField } from "@radix-ui/themes";
import useAuth from "../../../context/useAuth";
import { LuMailCheck, LuMail, LuMailX } from "react-icons/lu";
import { RxMagnifyingGlass } from "react-icons/rx";
import Reporte from "./Reporte";

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

  const refresh = async() => {
    try{
      const response = await getReportes(token);
      setUsers(response.data);
    }catch(error){
      console.log(error)
    }
  }
  // const filteredReports = reportes.filter((reporte) => {
  //   const matchesSearchText =
  //     `${reporte.motivo} ${reporte.detalle} ${reporte.createdAt}`
  //       .toLowerCase()
  //       .includes(searchText.toLowerCase());
  //   switch (selectedValue) {
  //     case "Resueltos":
  //       return matchesSearchText && reporte.estado === "Resuelto";
  //     case "No resueltos":
  //       return matchesSearchText && reporte.estado === "No resuelto";
  //     case "Borrados":
  //       return matchesSearchText && reporte.estado === "Borrado";
  //     default:
  //       return matchesSearchText;
  //   }
  // });

  const filteredReports = reportes.filter((reporte) => {
    const matchesSearchText =
      `${reporte.motivo} ${reporte.detalle} ${reporte.createdAt}`
        .toLowerCase()
        .includes(searchText.toLowerCase());
    return matchesSearchText && reporte.estado === "No resuelto";
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

       {/*  <Select.Root value={selectedValue} onValueChange={setSelectedValue}>
          <Select.Trigger className="hover:cursor-pointer bg-[#3e63dd] text-white">
            {selectedValue === "todos" ? (
              <Flex align="center">
                <LuListFilter size="20" className="pr-2" /> 
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
        </Select.Root> */}

      {/* <Select.Root value={selectedValue} onValueChange={setSelectedValue}>
        <Select.Trigger className="hover:cursor-pointer bg-[#3e63dd] text-white">
          {selectedValue === "No resueltos" && (
            <Flex align="center">No resueltos</Flex>
          )}
        </Select.Trigger>
      </Select.Root> */}
      </Flex>

      {loading && reportes.length === 0 ? (
        <Card asChild className="w-full flex justify-center">
          <Flex>
            <Spinner />
          </Flex>
        </Card>
      ) : filteredReports.length > 0 ? (
            filteredReports.map((reporte) => (
              <Reporte key={reporte._id} reporte={reporte} />
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