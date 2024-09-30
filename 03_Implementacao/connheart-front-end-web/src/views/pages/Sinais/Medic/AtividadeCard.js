import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, Typography, SvgIcon, LinearProgress, Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import IconBPM from '../../../../assets/images/icons/Branco/Icones_Branco-26.svg';
import IconPassos from '../../../../assets/images/icons/Branco/Icones_Branco-10.svg';
import IconPeso from '../../../../assets/images/icons/Branco/Icones_Branco-15.svg';
import DoubleCardNoClick from '../../../dashboard/components/DoubleCardNoClick';
import { PieChart } from 'react-minimal-pie-chart';
import { useState } from 'react';
import Indicator from '../../../dashboard/components/Indicator';
import MainCardDashboard from '../../../../ui-component/cards/MainCardDashboard';

const CardWrapper = styled(MainCardDashboard)(({ theme }) => ({
    color: '#fff',
    width: '100%',
    height: '100%',
    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
    border: 'none'
}));

const StyledBall = styled('div')(({ theme }) => ({
    position: 'relative',
    width: '90%',
    height: '85%',
    borderRadius: '50%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2)
}));

const StyledIndicator = styled(Indicator)(({ theme }) => ({
    marginBottom: '20px'
}));

const Ball = ({ theme }) => (
    <StyledBall>
        <PieChart
            data={[
                { value: 30, color: theme.palette.primary[200] },
                { value: 50, color: theme.palette.primary.dark },
                { value: 20, color: theme.palette.error.light }
            ]}
            totalValue={100}
            lineWidth={10}
            rounded
            animate
            paddingAngle={8}
            startAngle={-90}
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '100%',
                height: '100%'
            }}
        />
        <Typography variant="h4" component="div" color="text.primary" gutterBottom>
            {'ATIVIDADE'}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {'AVANÇADO'}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
            {'ATIVO DESDE:'}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ marginTop: '-0.4em' }}>
            {'01/06/2019'}
        </Typography>
    </StyledBall>
);

function AtividadeCard({ isLoading }) {
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <div style={{ height: '100%' }}>
                    <CardWrapper content={false}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '55%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center'
                                }}
                            >
                                <Ball theme={theme} />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    marginLeft: '10px',
                                    height: '45%'
                                }}
                            >
                                <Grid container direction="column">
                                    <Indicator
                                        style={{ marginBottom: '15px' }}
                                        color={theme.palette.primary.dark}
                                        label="Atividade Física Regular"
                                        space={0.8}
                                    />
                                    <Indicator
                                        style={{ marginBottom: '15px' }}
                                        color={theme.palette.primary[200]}
                                        label="Pouca Atividade"
                                        space={0.8}
                                    />
                                    <Indicator color={theme.palette.error.light} label="Sedentarismo" space={0.6} />
                                </Grid>
                            </Box>
                        </Card>
                    </CardWrapper>
                </div>
            )}
        </>
    );
}

AtividadeCard.propTypes = {
    isLoading: PropTypes.bool
};

export default AtividadeCard;
