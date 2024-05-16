import { LuLayoutDashboard, LuHome, LuBell, LuFileCheck} from 'react-icons/lu';
import Sidebar, { SidebarItem } from '../../components/Sidebar';
import { Flex, Avatar, Heading } from '@radix-ui/themes';
import { Link, Outlet } from 'react-router-dom';

function Dashboard() {

  

  return (
    <div>
      <Flex>
        <Sidebar>
          <Link to='dashboard'>
           <SidebarItem icon={<LuLayoutDashboard size={20} />} text="Dashboard"/>
          </Link>
          <Link to='moderadores'>
          <SidebarItem icon={<LuFileCheck size={20} />} text="Registrar Moderador" active />
          </Link>
        </Sidebar>
        <Flex direction="column" className="flex-1">
          <Flex gap="2" className="px-4 py-3 w-full border-b " justify="between">
            <Heading>Dashboard</Heading>
            <Flex gap="5" align="center">
              <LuBell size={20} />
              <Avatar fallback="M" size="2" />
            </Flex>
          </Flex>

          <div className="px-4 py-3 flex-grow ">
            <Outlet />
          </div>

        </Flex>
      </Flex>
    </div>
  );
}

export default Dashboard;
