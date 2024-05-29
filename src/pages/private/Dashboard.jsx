// Dashboard.js
import React, { useEffect, useState } from 'react';
import { LuLayoutDashboard, LuUsers2, LuBell, LuSettings, LuMoon, LuMail, LuUser2 } from 'react-icons/lu';
import { GrUserPolice } from "react-icons/gr";
import Sidebar, { SidebarItem } from '../../components/Sidebar';
import { Flex, Avatar, Heading, Text, Button, Switch, DropdownMenu, Spinner } from '@radix-ui/themes';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import useAuth from "../../context/useAuth"
import '@radix-ui/themes/styles.css';
import { Theme } from '@radix-ui/themes';
import ProfileModerator from './Moderators/ProfileModerator';
import { useTheme } from '../../context/ThemeContext';

function Dashboard() {
  const auth = useAuth();
  const [show, setShow] = useState(false);
  const [heading, setHeading] = useState('');
  const location = useLocation();
  const params = useParams();

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const headings = {
      '/dashboard': 'Dashboard',
      '/moderadores': 'Moderadores',
      '/usuarios': 'Usuarios',  
      '/reportes': 'Reportes',  
      '/reporte/:id': 'Reporte',
    };

    const heading = headings[location.pathname] || (params.id && 'Reporte') || 'Dashboard';
    setHeading(heading);
  }, [location, params]);

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

  return (
    <Theme appearance={theme}>
      <div>
        {!show ? (
          <div className='flex justify-center items-center h-screen'>
            <Spinner size='3' />
          </div>
        ) : (
          <Flex>
            <Sidebar>
              <Link to='dashboard'>
                <SidebarItem className='border-r'
                  icon={<LuLayoutDashboard size={20} />} 
                  text="Dashboard" 
                  active={location.pathname === '/dashboard'}
                  onClick={() => setHeading('Dashboard')}
                />
              </Link>

              <Link to='reportes'>
                <SidebarItem 
                  icon={<LuMail size={20} />}
                  text="Reportes" 
                  active={location.pathname === '/reportes' || 'id' in params}
                  onClick={() => setHeading('Reportes')}
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
              <Flex gap="2" className={`px-4 py-4 w-full ${theme === 'dark' ? 'border-b border-[#1D211C]' : 'border-b'}`} justify="between">    
                <Heading>{heading}</Heading>
                <Flex gap="5" align="center">
                  <button>
                    <LuBell size={20} />
                  </button>

                  <Flex>
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger className='hover:cursor-pointer'>
                        <Text>
                          <Avatar fallback={auth.cookies.auth.nombre ? auth.cookies.auth.nombre[0] : "M"} size="2" />
                        </Text>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content variant="soft" className='mr-2'>
                        <DropdownMenu.Item disabled>
                          <Text size="2" className={`${theme === 'dark' ? 'text-white' : 'text-[#252525]'}`}>
                            {auth.cookies.auth.nombre} {auth.cookies.auth.apellido}
                          </Text>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <ProfileModerator />
                       
                        <DropdownMenu.Item>
                          <Flex align='center' gap='2'>
                            <LuMoon size={20} />
                            <Text size='2'>Modo oscuro</Text>
                            <Switch 
                              className='hover:cursor-pointer'
                              checked={theme === 'dark'} 
                              onCheckedChange={toggleTheme} 
                              onClick={(event) => event.stopPropagation()}
                            />
                          </Flex>
                        </DropdownMenu.Item>
                        <DropdownMenu.Separator />
                        <DropdownMenu.Item color='red'>
                          <Button size='2' color="red" onClick={handleLogout}
                            className='hover:cursor-pointer w-full'>
                              Cerrar Sesión
                          </Button>
                        </DropdownMenu.Item>
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  </Flex>
                </Flex>
              </Flex>

              <div className="px-4 py-3 flex-grow ">
                <Outlet />
              </div>
            </Flex>
          </Flex>
        )}
      </div>
    </Theme>
  );
}

export default Dashboard;
