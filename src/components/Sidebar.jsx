import { useContext, createContext, useState } from "react"
import { LuChevronLast, LuChevronFirst } from "react-icons/lu"
import { Flex, Heading } from "@radix-ui/themes"
import image  from '/logo.png'

const SidebarContext = createContext()

export default function Sidebar({children}) {

  const [expanded, setExpanded] = useState(false)

  return (
    <aside className="h-screen" style={{ position: 'sticky', top: 0, zIndex: 999 }} >
      <Flex direction='column' className="h-full" >
        <Flex justify='between' align='center' className="p-4 pb-2" >
          <Flex gap='2' className={`overflow-hidden transition-all ${
              expanded ? "w-44 h-8 opacity-100" : "w-0 h-8 opacity-0"
              }`}>

            <img src={image} alt="" />
            <Heading size={'5'} >FashionGEC
            </Heading>
            </Flex>

          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg "
          >
            {expanded ? <LuChevronFirst /> : <LuChevronLast />}
          </button>
        </Flex>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">{children}</ul>
        </SidebarContext.Provider>

      </Flex>
    </aside>
  )
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);
  
  return (
    <li
      className={`
        relative flex items-center h-10 mt-3 z-50 
        rounded-md cursor-pointer
        transition-colors-50 group
        hover:bg-indigo-50 hover:text-indigo-800 
        ${active ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800 " : ""}
      `}
    >
      <div className="flex items-center justify-center w-10 h-10">
        {icon}
      </div>
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-36 ml-3 opacity-100" : "w-0 opacity-0"
        }`}
      >
        {text}
      </span>
      {alert && (
        <div
          className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
            expanded ? "" : "top-2"
          }`}
        />
      )}
      {!expanded && (
        <div
          className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
