import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Typography } from '@mui/material';
import { IconEye, IconX } from '@tabler/icons';

// ==============================|| AVATAR ||============================== //

function SeeButton({ name, link, color, disabled, onViewClick, ...others }) {
    const colorValue = typeof color !== 'undefined' ? color : 'inherit';
    const theme = useTheme();
    return (
        <Button href={link} variant="outlined" disabled={disabled} onClick={onViewClick}>
            <IconEye />
            <Typography variant="subtitle2">{name}</Typography>
        </Button>
    );
}

SeeButton.propTypes = {
    name: PropTypes.string,
    link: PropTypes.string,
    color: PropTypes.string,
    disabled: PropTypes.bool,
    onViewClick: PropTypes.func.isRequired
};

export default SeeButton;
