import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { IconHeartbeat } from '@tabler/icons';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    color: '#fff'
}));

const StyledIconHeartbeat = styled(IconHeartbeat)(() => ({
    width: '100px',
    height: '100px'
}));

function PlanosCard({ isLoading, planName, pacientType }) {
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <div>
                    <CardWrapper content={false}>
                        <Card sx={{ display: 'flex' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '20px'
                                }}
                                className="CardioId-CardContent-Planos-counter"
                            >
                                <StyledIconHeartbeat />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    flex: 'auto',
                                    flexDirection: 'column',
                                    alignContent: 'flex-start',
                                    justifyContent: 'space-around',
                                    padding: '10px'
                                }}
                            >
                                <Typography component="div" variant="h4" color="text.primary">
                                    {planName}
                                </Typography>
                                <Typography component="div" variant="h5" color="text.secondary">
                                    {pacientType}
                                </Typography>
                            </Box>
                        </Card>
                    </CardWrapper>
                </div>
            )}
        </>
    );
}

PlanosCard.propTypes = {
    isLoading: PropTypes.bool,
    pacientType: PropTypes.string.isRequired,
    planName: PropTypes.string.isRequired
};

export default PlanosCard;
