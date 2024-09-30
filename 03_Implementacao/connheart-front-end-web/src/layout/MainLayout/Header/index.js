import PropTypes from 'prop-types';
import { Provider, useSelector } from 'react-redux';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Avatar, Box, ButtonBase, Typography } from '@mui/material';

// project imports
import SearchSection from './SearchSection';
import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';
import { reducer } from '../../../store';

// assets
import { IconMenu2 } from '@tabler/icons';
import greetingsFormaters from '../../../utils/greetingsFormaters';

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

function Header({ handleLeftDrawerToggle }) {
    const theme = useTheme();
    const user = useSelector((state) => state.user);
    const greetingString = greetingsFormaters(user, true);

    return (
        <Provider store={reducer}>
            <>
                {/* logo & toggler button */}
                <Box
                    sx={{
                        display: 'flex',
                        [theme.breakpoints.down('md')]: {
                            width: 'auto'
                        }
                    }}
                >
                    <ButtonBase sx={{ borderRadius: '12px', overflow: 'hidden' }}>
                        <Avatar
                            variant="rounded"
                            sx={{
                                ...theme.typography.commonAvatar,
                                ...theme.typography.mediumAvatar,
                                transition: 'all .2s ease-in-out',
                                background: theme.palette.secondary.light,
                                color: theme.palette.secondary.dark,
                                '&:hover': {
                                    background: theme.palette.secondary.dark,
                                    color: theme.palette.secondary.light
                                }
                            }}
                            onClick={handleLeftDrawerToggle}
                            color="inherit"
                        >
                            <IconMenu2 stroke={1.5} size="1.3rem" />
                        </Avatar>
                    </ButtonBase>
                </Box>
                <Typography
                    variant="h3"
                    noWrap
                    component="div"
                    color={theme.palette.primary.dark}
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    {greetingString}
                </Typography>
                {/* header search */}
                <SearchSection />

                {/* notification & profile */}
                <NotificationSection />
                <ProfileSection />
            </>
        </Provider>
    );
}

Header.propTypes = {
    handleLeftDrawerToggle: PropTypes.func
};

export default Header;
