import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, Typography, Grid, useMediaQuery } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import IconPlano from '../../../../assets/images/icons/Branco/Icones_Branco-28.svg';
import MainCardDashboard from '../../../../ui-component/cards/MainCardDashboard';

const CardWrapper = styled(MainCardDashboard)(({ theme }) => ({
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
    border: 'none'
}));

function PlanoEstado({ isLoading }) {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <Grid container spacing={2}>
                    <Grid item xs={7} md={6}>
                        <CardWrapper content={false} sx={{ height: '100%' }}>
                            <Card sx={{ display: 'flex', width: '100%', height: '100%' }}>
                                {!isSmallScreen && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            width: '20%',
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                        className="CardioId-CardContent-Active-Patients-counter"
                                    >
                                        <img src={IconPlano} alt="icon" style={{ width: '65%', height: '65%' }} />
                                    </Box>
                                )}
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
                                    className="CardioId-CardContent-Active-Patients-counter"
                                >
                                    <Typography variant="body1" sx={{ mb: 0.5 }}>
                                        <Typography component="span" sx={{ color: 'inherit' }}>
                                            TIPO DE PLANO:
                                        </Typography>{' '}
                                        <Typography component="span" sx={{ fontWeight: 'bold', color: 'inherit' }}>
                                            REGENERATIVO CARDIOVASCULAR 1
                                        </Typography>
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 0.5 }}>
                                        <Typography component="span" sx={{ color: 'inherit' }}>
                                            PROGRESSO:
                                        </Typography>{' '}
                                        <Typography component="span" sx={{ fontWeight: 'bold', color: 'inherit' }}>
                                            INICIO FASE 4 A 02/06/2020
                                        </Typography>
                                    </Typography>
                                </Box>
                            </Card>
                        </CardWrapper>
                    </Grid>
                    <Grid item xs={5} md={6}>
                        <CardWrapper content={false} sx={{ height: '100%' }}>
                            <Card sx={{ display: 'flex', width: '100%', height: '100%' }}>
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
                                    className="CardioId-CardContent-Active-Patients-counter"
                                >
                                    <Typography variant="body1" sx={{ mb: 0.5 }}>
                                        <Typography component="span" sx={{ color: 'inherit' }}>
                                            ESTADO:
                                        </Typography>{' '}
                                        <Typography component="span" sx={{ fontWeight: 'bold', color: 'inherit' }}>
                                            ACTIVO
                                        </Typography>
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 0.5 }}>
                                        <Typography component="span" sx={{ color: 'inherit' }}>
                                            ÚLTIMA TRANSMISSÃO:
                                        </Typography>{' '}
                                        <Typography component="span" sx={{ fontWeight: 'bold', color: 'inherit' }}>
                                            02/06/2024 às 02h39
                                        </Typography>
                                    </Typography>
                                </Box>
                            </Card>
                        </CardWrapper>
                    </Grid>
                </Grid>
            )}
        </>
    );
}

PlanoEstado.propTypes = {
    isLoading: PropTypes.bool
};

export default PlanoEstado;
