// assets
import { ReactComponent as IconHome } from 'assets/images/icons/icon_home.svg';

// constant
const icons = {
    IconHome
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
    id: 'dashboard',
    type: 'group',
    children: [
        {
            title: 'INÍCIO',
            key: 'dashboard.inicio',
            type: 'item',
            url: '/dashboard/default',
            icon: icons.IconHome,
            breadcrumbs: false
        },
        {
            type: 'divider'
        }
    ]
};

export default dashboard;
