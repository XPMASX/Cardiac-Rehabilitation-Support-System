import React from 'react';
import { Typography } from '@mui/material';
import NavGroup from './NavGroup';
import NavItem from './NavItem';
import { useRole } from '../../../../utils/RoleContext';
import getMenuItems from 'menu-items';

function MenuList() {
    const { role } = useRole();
    const menuItems = getMenuItems(role);

    return menuItems.items.map((item) => {
        if (item.disabled) return null;
        switch (item.type) {
            case 'group':
                return <NavGroup key={item.id} item={item} />;
            case 'item':
                return <NavItem key={item.id} item={item} />;
            default:
                return (
                    <Typography key={item.id} variant="h6" color="error" align="center">
                        Menu Items Error
                    </Typography>
                );
        }
    });
}

export default MenuList;
