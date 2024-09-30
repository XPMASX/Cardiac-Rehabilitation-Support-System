import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, Typography, LinearProgress } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import DoubleCard from '../components/DoubleCard';

import IconTreino from '../../../assets/images/icons/Branco/Icones_Branco-21.svg';
import IconGrupo from '../../../assets/images/icons/Branco/Icones_Branco-09.svg';
import MainCardDashboard from '../../../ui-component/cards/MainCardDashboard';
import { useEffect, useState } from 'react';

const CardWrapper = styled(MainCardDashboard)(({ theme }) => ({
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    marginTop: '2%',
    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
    border: 'none'
}));

function VerticalCard({ isLoading }) {
    const theme = useTheme();
    const [trainingPlans, setTrainingPlans] = useState([]);
    const [progressPercentage, setProgressPercentage] = useState(0);
    useEffect(() => {
        const fetchPlansAndTrainings = async () => {
            try {
                const NumUtenteSaude = 201; // MUDAR ISTO AQUI PARA AS PESSOAS CERTAS
                const plans = await fetchTrainingPlans(NumUtenteSaude);
                setTrainingPlans(plans);
            } catch (error) {
                console.error('Erro ao buscar os dados:', error);
            }
        };
        fetchPlansAndTrainings();
    }, []);

    useEffect(() => {
        updateTrainings();
    }, [trainingPlans]);

    const updateTrainings = () => {
        let total = 0;
        let completed = 0;

        trainingPlans.forEach((plan) => {
            JSON.parse(plan.DadosPlano).forEach((dadosPlano) => {
                dadosPlano.exercisesList.forEach((exercise) => {
                    if (Array.isArray(exercise)) {
                        total += exercise.length;
                        completed += exercise.filter((subExercise) => subExercise.exercicioFeito === 'yes').length;
                    } else {
                        total += 1;
                        if (exercise.exercicioFeito === 'yes') {
                            completed += 1;
                        }
                    }
                });
            });
        });
        setProgressPercentage(total > 0 ? (completed / total) * 100 : 0);
    };

    async function fetchApi(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Erro ao buscar os dados');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Erro ao buscar os dados:', error);
            return [];
        }
    }

    async function fetchTrainingPlans(NumUtenteSaude) {
        const url = `http://localhost:8000/planoCliente?NumUtenteSaude=${NumUtenteSaude}`;
        return fetchApi(url);
    }

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <div>
                    <CardWrapper content={false}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '600px' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '35%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    gap: '20px'
                                }}
                                className="CardioId-CardContent-Active-Patients-counter"
                            >
                                <Typography component="div" variant="h3" color="inherit" sx={{ fontWeight: 'normal', mt: 2 }}>
                                    {'PLANO DE REABILITAÇÃO'}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'baseline', mt: -3 }}>
                                    <Typography
                                        component="div"
                                        variant="h3"
                                        color="inherit"
                                        sx={{ fontWeight: 'normal', fontSize: '5rem' }}
                                    >
                                        {`${progressPercentage.toFixed(1)}%`}
                                    </Typography>
                                    {/* <Typography
                                        component="div"
                                        variant="h2"
                                        color="inherit"
                                        sx={{ fontWeight: 'normal', marginLeft: '4px' }}
                                    >
                                        {'%'}
                                    </Typography> */}
                                </Box>
                                <Box width="85%" sx={{ mt: -2 }}>
                                    <LinearProgress className="progress-bar-reverse" variant="determinate" value={progressPercentage} />
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
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'flex-start',
                                        padding: '10px',
                                        border: '1px solid',
                                        borderRadius: '5px',
                                        width: '100%',
                                        height: '100px' // Set height to match DoubleCard height
                                    }}
                                >
                                    <Typography variant="body1" sx={{ mb: 0.5 }}>
                                        ESTADO:{' '}
                                        <Box component="span" sx={{ fontWeight: 'bold' }}>
                                            ACTIVO
                                        </Box>
                                    </Typography>
                                    <Typography variant="body1" sx={{ mb: 0.5 }}>
                                        ÚLTIMA TRANSMISSÃO:
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ fontWeight: 'bold' }}
                                    >{`${new Date().toLocaleDateString()} às ${new Date().toLocaleTimeString()}`}</Typography>
                                </Box>
                                <DoubleCard
                                    isLoading={isLoading}
                                    imageIcon={IconTreino}
                                    text1={'Treino Diário'}
                                    text2={'VER PLANO'}
                                    to={'/planos'}
                                    className={'CardioId-CardContent-Active-Patients-counter'}
                                    hovercolor={theme.palette.secondary.dark}
                                />
                                <DoubleCard
                                    isLoading={isLoading}
                                    imageIcon={IconGrupo}
                                    text1={'Grupo de Treino'}
                                    text2={'VER EVOLUÇÃO'}
                                    to={'/'}
                                    className={'CardioId-CardContent-Active-Patients-counter'}
                                    hovercolor={theme.palette.secondary.dark}
                                    disabled={true}
                                />
                            </Box>
                        </Card>
                    </CardWrapper>
                </div>
            )}
        </>
    );
}

VerticalCard.propTypes = {
    isLoading: PropTypes.bool
};

export default VerticalCard;
