import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Button, Typography } from '@mui/material';
import { IconPencil } from '@tabler/icons';

// ==============================|| AVATAR ||============================== //

function EditButton({ name, link, color, outline, size, sx, disabled, onViewClick, ...others }) {
    const colorValue = typeof color !== 'undefined' ? color : 'inherit';
    const theme = useTheme();
    return (
        <Button href={link} variant="outlined" disabled={disabled} onClick={onViewClick}>
            <IconPencil />
            <Typography variant="subtitle2">{name}</Typography>
        </Button>
    );
}

EditButton.propTypes = {
    name: PropTypes.string,
    link: PropTypes.string,
    className: PropTypes.string,
    color: PropTypes.string,
    outline: PropTypes.bool,
    size: PropTypes.string,
    sx: PropTypes.object,
    disabled: PropTypes.bool,
    onViewClick: PropTypes.func
};

export default EditButton;
