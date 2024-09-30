import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, CardContent, LinearProgress, Typography } from '@mui/material';

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

function ActiveGroupsCard({ isLoading }) {
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <div>
                    <Typography variant="subtitle1_2" component="div">
                        GRUPOS ATIVOS
                    </Typography>
                    <CardWrapper content={false}>
                        <Card sx={{ display: 'flex' }}>
                            <Box
                                sx={{ display: 'flex', flexDirection: 'column', width: 2 / 7 }}
                                className="CardioId-CardContent-Active-Groups-counter"
                                justifyContent="center"
                                alignItems="center"
                            >
                                <Typography variant="h1" color="inherit" sx={{ fontSize: '3rem' }}>
                                    17
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
                                <Typography component="div" variant="h5">
                                    Novos Grupos:
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    5
                                </Typography>
                                <Typography component="div" variant="h5" mb={0.5}>
                                    Capacidade:
                                </Typography>
                                <Typography variant="subtitle1" color="text.secondary" component="div">
                                    20
                                </Typography>
                            </Box>
                        </Card>
                    </CardWrapper>
                </div>
            )}
        </>
    );
}

ActiveGroupsCard.propTypes = {
    isLoading: PropTypes.bool
};

export default ActiveGroupsCard;
