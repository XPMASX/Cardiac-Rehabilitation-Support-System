import { Box, Typography } from '@mui/material';

const Indicator = ({ color, label, style, space }) => {
    return (
        <Box display="flex" flexDirection="column" mr={6} style={style}>
            <Box width={24} height={12} borderRadius="40%" bgcolor={color} mb={space} />
            <Typography variant="body2">{label}</Typography>
        </Box>
    );
};

export default Indicator;
