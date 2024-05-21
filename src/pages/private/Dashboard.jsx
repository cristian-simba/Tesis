import { useEffect, useState, useRef } from 'react';
import { LuLayoutDashboard, LuUsers2, LuBell, LuSettings } from 'react-icons/lu';
import Sidebar, { SidebarItem } from '../../components/Sidebar';
import { Flex, Avatar, Heading, Text, Switch, Button } from '@radix-ui/themes';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Spinner } from '@radix-ui/themes';
import useAuth from "../../context/useAuth"

function Dashboard() {

  const auth = useAuth();
  const id = auth.cookies.auth._id;
  console.log(auth)
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(true);
  const location = useLocation();
  const ref = useRef(null);
  
  const handleLogout = async() => {
    try{
      await auth.logOut();
    }catch(error){
      console.error(error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 2000);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(true);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div>
        {!show ? (
        <div className='flex justify-center items-center h-screen'>
          <Spinner size='3' />
        </div>
      ) : (
      <Flex>
        <Sidebar>
          <Link to='dashboard'>
              <SidebarItem 
                icon={<LuLayoutDashboard size={20} />} 
                text="Dashboard" 
                active={location.pathname === '/dashboard'} 
              />
            </Link>

            {auth.cookies.auth._id === import.meta.env.VITE_MODERADOR_ID ? (
              <Link to='moderadores'>
                <SidebarItem 
                  icon={<LuUsers2 size={20} />} 
                  text="Moderadores" 
                  active={location.pathname === '/moderadores'} 
                />
              </Link>
            ) : null}

          <Link to={`actualizar-contraseña/${id}`}>
            <SidebarItem 
            icon={<LuSettings size={20} />} 
            text="Configuración" 
            active={location.pathname === '/settings'} 
            />
          </Link>
        </Sidebar>
        <Flex direction="column" className="flex-1">
          <Flex gap="2" className="px-4 py-4 w-full border-b " justify="between">
            <Heading>Dashboard</Heading>
            <Flex gap="5" align="center">
              <button>
                <LuBell size={20} />
              </button>

              <div ref={ref} onClick={() => setOpen(!open)}>  
                <div onClick={() => setOpen(!open)} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter') setOpen(!open); }}>
                  <Avatar fallback={auth.cookies.auth.nombre ? auth.cookies.auth.nombre[0] : "M"} size="2" />

                  <div className={`transition-opacity duration-150 ${open ? 'opacity-0' : 'opacity-100'} absolute top-16 right-4 w-1/6`}>

                    <Flex direction='column' className=' border border-[#B8BCBA] rounded-md px-3 py-2 shadow-lg'>
                      <Text size='2'className='border-b px-2 py-2 font-medium'>
                        {auth.cookies.auth.nombre} {auth.cookies.auth.apellido} 
                      </Text>
                      {/* <Flex gap='2' className='px-2 py-2 mb-1' align='center'>
                        <Text size='2'>
                          Modo obscuro
                        </Text>
                        <Switch variant="soft"/>
                      </Flex> */}
                      <Button size='2' color="red" onClick={handleLogout}
                        className='hover:cursor-pointer'>
                          Cerrar Sesión
                        </Button>
                    </Flex>

                  </div>
                </div>
              </div>
            </Flex>

          </Flex>

          <div className="px-4 py-3 flex-grow ">
            <Outlet />
          </div>

        </Flex>
      </Flex>
      )}
    </div>
  );
}

export default Dashboard;
