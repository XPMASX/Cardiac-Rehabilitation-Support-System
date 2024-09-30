import { useEffect, useState } from 'react';
import { Box, Container, Grid } from '@mui/material';
import RemainingWorkouts from './RemainingWorkouts';
import RehabilitationPlan from './RehabilitationPlan';
import CardioWait from '../../../../ui-component/extended/cardioWait';
import TrainingSection from './TrainingSection';

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

async function fetchTrainings() {
    const url = 'http://localhost:8000/exercises';
    return fetchApi(url);
}

function transformExerciseData(exercisesData) {
    return Object.values(exercisesData).map((exercise) => {
        const parsedData = JSON.parse(exercise.JSON);
        return {
            type: parsedData.TIPO,
            name: parsedData.nome_do_exercicio,
            description: parsedData.descricao_do_exercicio,
            sets: parsedData.repeticoes,
            reps: parsedData.repeticoes,
            duration: parsedData.duracao,
            objectives: parsedData.objetivos
        };
    });
}

function TrainingPlans() {
    const [trainingPlans, setTrainingPlans] = useState([]);
    const [trainings, setTrainings] = useState([]);
    const [totalWorkouts, setTotalWorkouts] = useState(0);
    const [completedWorkouts, setCompletedWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    const [totalTrainings, setTotalTrainings] = useState(0);
    const [completedTrainings, setCompletedTrainings] = useState(0);
    const [progressPercentage, setProgressPercentage] = useState(0);

    useEffect(() => {
        const fetchPlansAndTrainings = async () => {
            try {
                const NumUtenteSaude = 2001;
                const plans = await fetchTrainingPlans(NumUtenteSaude);
                setTrainingPlans(plans);

                const trainingsData = await fetchTrainings();
                const transformedTrainings = transformExerciseData(trainingsData);
                setTrainings(transformedTrainings);

                let total = 0;
                plans.forEach((plan) => {
                    JSON.parse(plan.DadosPlano).forEach((dadosPlano) => {
                        total += Object.values(dadosPlano.exercisesList).length;
                    });
                });
                setTotalWorkouts(total);

                setLoading(false);
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

        setTotalTrainings(total);
        setCompletedTrainings(completed);
        setProgressPercentage(total > 0 ? (completed / total) * 100 : 0);
    };

    const handleComplete = (id) => {
        setCompletedWorkouts([...completedWorkouts, id]);
        setCompletedTrainings((prev) => prev + 1);
        setProgressPercentage(((completedTrainings + 1) / totalTrainings) * 100);
    };

    const handleUndo = (id) => {
        setCompletedWorkouts(completedWorkouts.filter((workoutId) => workoutId !== id));
        setCompletedTrainings((prev) => Math.max(prev - 1, 0));
        setProgressPercentage(((completedTrainings - 1) / totalTrainings) * 100);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CardioWait />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh' }}>
            <Container px={2}>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={6}>
                        <RehabilitationPlan progress={progressPercentage} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <RemainingWorkouts remainingWorkouts={totalTrainings - completedTrainings} />
                    </Grid>
                    <Grid item xs={12}>
                        <TrainingSection
                            trainingPlans={trainingPlans}
                            trainings={trainings}
                            onComplete={handleComplete}
                            onUndo={handleUndo}
                            remainingWorkouts={totalTrainings - completedTrainings}
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default TrainingPlans;
