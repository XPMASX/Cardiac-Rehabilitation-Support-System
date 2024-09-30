import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, Typography, SvgIcon, LinearProgress } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

import IconBPM from '../../../../assets/images/icons/Branco/Icones_Branco-26.svg';
import IconPassos from '../../../../assets/images/icons/Branco/Icones_Branco-10.svg';
import IconPeso from '../../../../assets/images/icons/Branco/Icones_Branco-15.svg';
import DoubleCardNoClick from '../../../dashboard/components/DoubleCardNoClick';
import MainCardDashboard from '../../../../ui-component/cards/MainCardDashboard';
import { useEffect, useState } from 'react';

const CardWrapper = styled(MainCardDashboard)(({ theme }) => ({
    color: '#fff',
    width: '100%',
    height: '100%',
    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
    border: 'none'
}));

function VerticalCardDados({ isLoading }) {
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
                <div style={{ height: '100%' }}>
                    <CardWrapper content={false}>
                        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: '30%',
                                    justifyContent: 'flex-start',
                                    alignItems: 'center',
                                    gap: '20px'
                                }}
                                className="CardioId-CardContent-Active-Patients-counter"
                            >
                                <Typography component="div" variant="h5" color="inherit" sx={{ fontWeight: 'normal', mt: 1 }}>
                                    {'PLANO DE REABILITAÇÃO'}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'baseline', mt: -2 }}>
                                    <Typography
                                        component="div"
                                        variant="h5"
                                        color="inherit"
                                        sx={{ fontWeight: 'normal', fontSize: '2rem' }}
                                    >
                                        {`${progressPercentage.toFixed(1)}%`}
                                    </Typography>
                                </Box>
                                <Box width="85%" sx={{ mt: -2 }}>
                                    <LinearProgress className="progress-bar-reverse" variant="determinate" value={progressPercentage} />
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignContent: 'flex-start',
                                    gap: '7px',
                                    padding: '12px',
                                    height: '70%'
                                }}
                            >
                                <DoubleCardNoClick
                                    isLoading={isLoading}
                                    imageIcon={IconBPM}
                                    text1={'90'}
                                    text2={'BPM'}
                                    className={'CardioId-CardContent-Active-Patients-counter'}
                                />
                                <DoubleCardNoClick
                                    isLoading={isLoading}
                                    imageIcon={IconPassos}
                                    text1={'1080'}
                                    text2={'PASSOS'}
                                    className={'CardioId-CardContent-Active-Patients-counter'}
                                />
                                <DoubleCardNoClick
                                    isLoading={isLoading}
                                    imageIcon={IconPeso}
                                    text1={'90kg'}
                                    text2={'PESO'}
                                    className={'CardioId-CardContent-Active-Patients-counter'}
                                />
                            </Box>
                        </Card>
                    </CardWrapper>
                </div>
            )}
        </>
    );
}

VerticalCardDados.propTypes = {
    isLoading: PropTypes.bool
};

export default VerticalCardDados;
