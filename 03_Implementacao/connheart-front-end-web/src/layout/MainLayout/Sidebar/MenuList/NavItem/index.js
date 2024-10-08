import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { ListItemButton, ListItemIcon, ListItemText, Typography, useMediaQuery } from '@mui/material';

// project imports
import { MENU_OPEN, SET_MENU } from 'store/actions';
import config from 'config';

// assets
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

// ==============================|| SIDEBAR MENU LIST ITEMS ||============================== //

function NavItem({ item, level }) {
    const theme = useTheme();
    const dispatch = useDispatch();
    const customization = useSelector((state) => state.customization);
    const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));

    const isOpen = customization.isOpen.findIndex((id) => id === item.id) > -1;
    const Icon = item.icon;
    const itemIcon = item?.icon ? (
        <Icon stroke={1.5} size="1.3rem" width="1.3rem" />
    ) : (
        <FiberManualRecordIcon
            sx={{
                width: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
                height: customization.isOpen.findIndex((id) => id === item?.id) > -1 ? 8 : 6
            }}
            fontSize={level > 0 ? 'inherit' : 'medium'}
        />
    );

    const itemHandler = (id) => {
        dispatch({ type: MENU_OPEN, id });
        if (matchesSM) dispatch({ type: SET_MENU, opened: false });
    };

    // active menu item on page load
    useEffect(() => {
        const currentIndex = document.location.pathname
            .toString()
            .split('/')
            .findIndex((id) => id === item.id);
        if (currentIndex > -1) {
            dispatch({ type: MENU_OPEN, id: item.id });
        }
        // eslint-disable-next-line
    }, []);

    return (
        <ListItemButton
            component={Link}
            to={`${config.basename}${item.url}`}
            target="_self"
            disabled={item.disabled}
            sx={{
                borderRadius: 0,
                alignItems: 'flex-start',
                backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
                py: level > 1 ? 1 : 1.25,
                pl: `${level * 24}px`
            }}
            selected={isOpen}
            onClick={() => itemHandler(item.id)}
        >
            <ListItemIcon className="sidebar-itemNav" sx={{ my: 'auto', minWidth: !item?.icon ? 18 : 36 }}>
                {itemIcon}
            </ListItemIcon>
            <ListItemText
                primary={
                    <Typography variant={isOpen ? 'h5' : 'body1'} color="inherit">
                        {item.title}
                    </Typography>
                }
            />
        </ListItemButton>
    );
}

NavItem.propTypes = {
    item: PropTypes.object,
    level: PropTypes.number
};

export default NavItem;
