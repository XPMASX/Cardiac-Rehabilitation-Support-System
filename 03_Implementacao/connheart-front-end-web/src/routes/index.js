import { useRoutes } from 'react-router-dom';
import getMainRoutes, { ProtectRoute } from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import config from 'config';
import { useRole } from '../utils/RoleContext';

export default function ThemeRoutes() {
    const { role } = useRole();
    const mainRoutes = {
        path: '/',
        element: <ProtectRoute />,
        children: getMainRoutes(role)
    };
    return useRoutes([mainRoutes, AuthenticationRoutes], config.basename);
}
