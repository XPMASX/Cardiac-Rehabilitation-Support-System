import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';

// project imports
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import IconEvento from '../../../../assets/images/icons/Branco/Icones_Branco-27.svg';
import MainCardDashboard from '../../../../ui-component/cards/MainCardDashboard';

// assets

const CardWrapper = styled(MainCardDashboard)(({ theme }) => ({
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
    border: 'none'
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

function EventCard({ isLoading }) {
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <div>
                    <CardWrapper content={false}>
                        <Card sx={{ display: 'flex', height: '100px' }}>
                            <Box
                                sx={{ display: 'flex', width: '20%', justifyContent: 'center', alignItems: 'center' }}
                                className="CardioId-CardContent-Events-counter"
                            >
                                <img src={IconEvento} alt="icon" style={{ width: '80px', height: '80px' }} />
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
                                    <Typography component="div" variant="h4">
                                        QUEDA: Jul 02 2024 02:38:40
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

EventCard.propTypes = {
    isLoading: PropTypes.bool
};

export default EventCard;
