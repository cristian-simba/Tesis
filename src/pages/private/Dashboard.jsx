import { useEffect, useState, useRef } from 'react';
import { LuLayoutDashboard, LuUsers2, LuBell, LuSettings } from 'react-icons/lu';
import { GrUserPolice } from "react-icons/gr";
import Sidebar, { SidebarItem } from '../../components/Sidebar';
import { Flex, Avatar, Heading, Text, Button } from '@radix-ui/themes';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Spinner } from '@radix-ui/themes';
import useAuth from "../../context/useAuth"
import { useNavigate } from 'react-router-dom';

function Dashboard() {

  const auth = useAuth();
  const id = auth.cookies.auth._id;
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);  // Inicialmente false
  const [heading, setHeading] = useState('');
  const location = useLocation();
  const ref = useRef(null);
  
  useEffect(() => {
    const headings = {
      '/dashboard': 'Dashboard',
      '/moderadores': 'Moderadores',
      '/usuarios': 'Usuarios',  
    };

    setHeading(headings[location.pathname] || '');
  }, [location.pathname]);

  const handleLogout = async() => {
    try{
      await auth.logOut();
    }catch(error){
      console.error(error);
    }
  }

  const handleSettings = async() => {
    try{
      navigate(`actualizar-contraseña/${id}`);
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
        setOpen(false);  // Cambiar a false para cerrar el menú
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
                onClick={() => setHeading('Dashboard')}
              />
            </Link>

            <Link to='usuarios'>
              <SidebarItem 
                icon={<LuUsers2 size={20} />}
                text="Usuarios" 
                active={location.pathname === '/usuarios'}
                onClick={() => setHeading('Usuarios')}
              />
            </Link>

            {auth.cookies.auth._id === import.meta.env.VITE_MODERADOR_ID ? (
              <Link to='moderadores'>
                <SidebarItem 
                  icon={<GrUserPolice size={20} />}
                  text="Moderadores" 
                  active={location.pathname === '/moderadores'} 
                  onClick={() => setHeading('Moderadores')}
                />
              </Link>
            ) : null}

          </Sidebar>
          <Flex direction="column" className="flex-1">
            <Flex gap="2" className="px-4 py-4 w-full border-b " justify="between">
              <Heading>{heading}</Heading>
              <Flex gap="5" align="center">
                <button>
                  <LuBell size={20} />
                </button>

                <div ref={ref}>  
                  <div onClick={() => setOpen(!open)} role="button" tabIndex={0} onKeyDown={(event) => { if (event.key === 'Enter') setOpen(!open); }}>
                    <Avatar fallback={auth.cookies.auth.nombre ? auth.cookies.auth.nombre[0] : "M"} size="2" />
                  </div>

                  {open && (
                    <div className='absolute top-16 right-4 w-[200px] transition-opacity duration-1000 opacity-100'>

                  <Flex direction='column' className='bg-white border border-[#B8BCBA] rounded-md px-3 py-2 shadow-lg z-50 relative'>
                    <Text size='2'className='border-b px-2 py-2 font-medium'>
                      {auth.cookies.auth.nombre} {auth.cookies.auth.apellido} 
                    </Text>

                    <Flex direction='column' gap='1'>
                      <Flex gap='2' className='px-2 pt-2 mb-1' align='center' onClick={handleSettings}>
                        <LuSettings size={20} />
                        <Text size='2'>
                          Configuración
                        </Text>
                      </Flex>

                      <Button size='2' color="red" onClick={handleLogout}
                        className='hover:cursor-pointer'>
                          Cerrar Sesión
                      </Button>
                    </Flex>
                  </Flex>

                    </div>
                  )}
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
