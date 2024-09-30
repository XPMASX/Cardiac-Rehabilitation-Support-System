import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import { Typography, Button } from '@mui/material';
import { IconEye } from '@tabler/icons';
import SeeButton from '../../../ui-component/extended/SeeButton';
import { PieChart } from 'react-minimal-pie-chart';

const StyledBall = styled('div')(({ theme }) => ({
    position: 'relative', // Add this line
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(4)
}));

const ExerciseCard = ({ number, name, onViewClick }) => {
    const theme = useTheme();

    const handleViewClick = () => {
        if (onViewClick) {
            onViewClick(name);
        }
    };

    return (
        <StyledBall>
            <PieChart
                data={[{ value: 100, color: theme.palette.primary.dark }]}
                totalValue={100}
                lineWidth={10}
                rounded
                animate
                paddingAngle={8}
                startAngle={-90}
                style={{
                    position: 'absolute',
                    width: '200px',
                    height: '200px'
                }}
            />
            <Typography variant="h1" color={theme.palette.primary.dark} gutterBottom>
                {}
                {number}
            </Typography>
            <Typography variant="h4" color={theme.palette.primary.dark} gutterBottom>
                {name}
            </Typography>
            <SeeButton name="Ver" onViewClick={handleViewClick} />
        </StyledBall>
    );
};

ExerciseCard.propTypes = {
    number: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onViewClick: PropTypes.func.isRequired
};

export default ExerciseCard;
