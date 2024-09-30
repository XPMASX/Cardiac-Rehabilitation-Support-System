import dashboard from './dashboard';
import { getMenuItemsForRole } from './pages';

// ===========================|| MENU ITEMS ||=========================== //
const getMenuItems = (role) => {
    const pages = getMenuItemsForRole(role);
    return {
        items: [dashboard, { id: 'pages', type: 'group', children: pages }]
    };
};

export default getMenuItems;
