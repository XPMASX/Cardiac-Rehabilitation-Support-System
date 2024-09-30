import PropTypes from 'prop-types';

// material-ui
import { Avatar, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';

// ==============================|| AVATAR ||============================== //

function NamedAvatar({ name, src, color, outline, size, sx, ...others }) {
    const colorValue = typeof color !== 'undefined' ? color : 'inherit';
    const theme = useTheme();
    return (
        <Box display="flex" alignItems="center">
            <Avatar
                src={src}
                size={size}
                outline={outline}
                sx={{
                    ...theme.typography.mediumAvatar,
                    margin: '8px 0 8px 8px !important',
                    cursor: 'pointer',
                    ...sx
                }}
                color={colorValue}
            />
            <Typography color={theme.paper} fontWeight="bold" ml={2}>
                {name}
            </Typography>
        </Box>
    );
}

NamedAvatar.propTypes = {
    name: PropTypes.string,
    src: PropTypes.string,
    className: PropTypes.string,
    color: PropTypes.string,
    outline: PropTypes.bool,
    size: PropTypes.string,
    sx: PropTypes.object
};

export default NamedAvatar;
