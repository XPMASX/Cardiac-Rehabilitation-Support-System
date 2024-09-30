import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import MainCardDashboard from '../../../ui-component/cards/MainCardDashboard';

// assets

const CardWrapper = styled(MainCardDashboard)(({ theme }) => ({
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
    border: 'none'
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

function EventsCard({ isLoading }) {
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <div>
                    <Typography variant="subtitle1_2" component="div">
                        EVENTOS
                    </Typography>
                    <CardWrapper content={false}>
                        <Card sx={{ display: 'flex' }}>
                            <Box
                                sx={{ display: 'flex', width: 2 / 7, justifyContent: 'center', alignItems: 'center' }}
                                className="CardioId-CardContent-Events-counter"
                            >
                                <Typography variant="h1" color="inherit" sx={{ fontSize: '3rem' }}>
                                    145
                                </Typography>
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
                                <Box>
                                    <Typography component="div" variant="h5">
                                        Urgentes:
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        24
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography component="div" variant="h5">
                                        Regulares:
                                    </Typography>
                                    <Typography variant="subtitle1" color="text.secondary" component="div">
                                        121
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </CardWrapper>
                </div>
            )}
        </>
    );
}

EventsCard.propTypes = {
    isLoading: PropTypes.bool
};

export default EventsCard;
