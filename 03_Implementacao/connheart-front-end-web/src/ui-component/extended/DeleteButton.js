import PropTypes from 'prop-types';
import { Button, Typography } from '@mui/material';
import { IconX } from '@tabler/icons';

const DeleteButton = ({ name, onDelete, disabled, ...others }) => {
    return (
        <Button onClick={onDelete} variant="outlined" disabled={disabled} {...others}>
            <IconX />
            <Typography variant="subtitle2">{name}</Typography>
        </Button>
    );
};

DeleteButton.propTypes = {
    name: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
    disabled: PropTypes.bool
};

export default DeleteButton;
