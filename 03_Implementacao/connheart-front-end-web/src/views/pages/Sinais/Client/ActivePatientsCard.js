import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import MainCardDashboard from '../../../../ui-component/cards/MainCardDashboard';

// assets

const CardWrapper = styled(MainCardDashboard)(() => ({
    color: '#fff',
    overflow: 'hidden',
    position: 'relative'
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

function ActivePatientsCard({ isLoading }) {
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <div>
                    <Typography variant="subtitle1_2" component="div">
                        INPENDÂNCIA TORÁCICA
                    </Typography>
                    <CardWrapper content={false}>
                        <Card sx={{ display: 'flex' }}>
                            <Box
                                sx={{ display: 'flex', width: 2 / 7 }}
                                className="CardioId-CardContent-Active-Patients-counter"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', alignItems: 'center' }}>
                                    <Typography variant="h1" color="inherit" sx={{ fontSize: '2.5rem' }}>
                                        123
                                    </Typography>
                                    <Typography variant="h4" color="inherit" sx={{ marginLeft: '28px', marginTop: '-8px' }}>
                                        BPM
                                    </Typography>
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    flex: 'auto',
                                    flexDirection: 'column',
                                    alignContent: 'flex-start',
                                    justifyContent: 'space-around',
                                    padding: '12px'
                                }}
                            >
                                <Typography component="div" variant="h5">
                                    CONDIÇÕES:
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    APÓS SESSÃO DE TREINO
                                </Typography>
                                <Typography component="div" variant="h5">
                                    ÚLTIMA TRANSMISSÃO:
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    24/05/2024 às 18h34
                                </Typography>
                            </Box>
                        </Card>
                    </CardWrapper>
                </div>
            )}
        </>
    );
}

ActivePatientsCard.propTypes = {
    isLoading: PropTypes.bool
};

export default ActivePatientsCard;
