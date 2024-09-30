import React, { useState, useEffect } from 'react';
import { Typography, Button, TextField, Select, MenuItem, Box, Grid } from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import { useTheme } from '@mui/material/styles';
import CardioWait from '../../../ui-component/extended/cardioWait';
import EditButton from '../../../ui-component/extended/EditButton';
import DeleteButton from '../../../ui-component/extended/DeleteButton';

const EditPlan = ({ selectedPlanoId }) => {
    const theme = useTheme();
    const [plans, setPlans] = useState([]);
    const [availableExercises, setAvailableExercises] = useState([]);

    useEffect(() => {
        const fetchPlan = async () => {
            try {
                const response = await fetch(`http://localhost:8000/planos/${selectedPlanoId}`);
                if (response.ok) {
                    const data = await response.json();
                    const parsedPlans = JSON.parse(data.DadosPlano);
                    console.log(parsedPlans);
                    setPlans(parsedPlans);
                } else {
                    console.error('Failed to fetch plan');
                }
            } catch (error) {
                console.error('Error fetching plan:', error);
            }
        };

        const fetchExercises = async () => {
            try {
                const response = await fetch('http://localhost:8000/exercises');
                if (response.ok) {
                    const data = await response.json();
                    const filteredExercises = data.map((exercise) => {
                        const exerciseDetails = JSON.parse(exercise.JSON);
                        return `${exerciseDetails.TIPO} - ${exerciseDetails.nome_do_exercicio}`;
                    });
                    setAvailableExercises(filteredExercises);
                } else {
                    console.error('Failed to fetch exercises');
                }
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };

        fetchPlan();
        fetchExercises();
    }, [selectedPlanoId]);

    const handleLevelChange = (event, planIndex) => {
        const updatedPlans = [...plans];
        updatedPlans[planIndex].level = event.target.value;
        setPlans(updatedPlans);
    };

    const handleDescriptionChange = (event, planIndex) => {
        const updatedPlans = [...plans];
        updatedPlans[planIndex].description = event.target.value;
        setPlans(updatedPlans);
    };

    const handleMaxHeartRateChange = (event, planIndex) => {
        const updatedPlans = [...plans];
        updatedPlans[planIndex].maxHeartRate = event.target.value;
        setPlans(updatedPlans);
    };

    const handleDurationChange = (event, planIndex) => {
        const updatedPlans = [...plans];
        updatedPlans[planIndex].duration = event.target.value;
        setPlans(updatedPlans);
    };

    const handleSelectExercise = (event, planIndex, sceneId) => {
        const updatedPlans = [...plans];
        updatedPlans[planIndex].exercisesList[sceneId].selectedExercise = event.target.value;
        setPlans(updatedPlans);
    };

    const addPlan = () => {
        const nextTitle = `TREINO ${plans.length + 1}`;
        const updatedPlans = [...plans];
        updatedPlans.push({
            title: nextTitle,
            level: '',
            description: '',
            maxHeartRate: '',
            duration: '',
            exercisesList: {}
        });
        setPlans(updatedPlans);
    };

    const removePlan = (planIndex) => {
        const updatedPlans = [...plans];
        const plan = updatedPlans[planIndex];
        plan.level = '';
        plan.duration = '';
        plan.maxHeartRate = '';
        plan.description = '';
        plan.exercisesList = {};
        setPlans(updatedPlans);
    };

    const addAdditionalScene = (planIndex) => {
        const updatedPlans = [...plans];
        const sceneId = Object.keys(updatedPlans[planIndex].exercisesList).length;
        updatedPlans[planIndex].exercisesList[sceneId] = { exercicioFeito: 'no', selectedExercise: '' };
        setPlans(updatedPlans);
    };

    const removeAdditionalScene = (planIndex, sceneId) => {
        const updatedPlans = [...plans];
        const plan = updatedPlans[planIndex];
        delete plan.exercisesList[sceneId];
        plan.exercisesList = plan.exercisesList.filter((exercise) => exercise !== null);
        setPlans(updatedPlans);
    };

    const savePlans = async () => {
        try {
            for (const plan of plans) {
                if (
                    !plan.duration ||
                    !plan.maxHeartRate ||
                    !plan.level ||
                    !plan.description ||
                    Object.values(plan.exercisesList).some((scene) => !scene.selectedExercise)
                ) {
                    window.alert('Por favor, preencha todas as opções antes de gravar o plano.');
                    return;
                }
            }

            const jsonPlans = JSON.stringify(plans);
            const response = await fetch(`http://localhost:8000/planos/${selectedPlanoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: jsonPlans
            });

            if (response.ok) {
                window.alert('Plano salvo com sucesso!');
            } else {
                const errorText = await response.text();
                throw new Error(`Erro ao salvar plano: ${errorText}`);
            }
        } catch (error) {
            console.error('Erro ao salvar plano:', error);
            window.alert('Erro ao salvar plano. Verifique o console para mais detalhes.');
        }
    };

    if (plans.length === 0) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CardioWait />
            </Box>
        );
    }
    return (
        <Grid container spacing={2}>
            {plans.map((plan, planIndex) => (
                <Grid item xs={12} key={planIndex}>
                    <MainCard title={plan.title}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h4" style={{ color: theme.palette.primary.dark }}>
                                    Nível:
                                </Typography>
                                <Select value={plan.level} onChange={(e) => handleLevelChange(e, planIndex)} fullWidth>
                                    {['Treino Suave(25%)', 'Treino Médio (50%)', 'Treino Intenso (75%)'].map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h4" style={{ color: theme.palette.primary.dark }}>
                                    Frequência Cardíaca Máxima:
                                </Typography>
                                <Select value={plan.maxHeartRate} onChange={(e) => handleMaxHeartRateChange(e, planIndex)} fullWidth>
                                    {[...Array(200).keys()].map((option) => (
                                        <MenuItem key={option + 60} value={option + 60}>
                                            {option + 60}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12} sm={4}>
                                <Typography variant="h4" style={{ color: theme.palette.primary.dark }}>
                                    Duração Total de cada treino (minutos):
                                </Typography>
                                <Select value={plan.duration} onChange={(e) => handleDurationChange(e, planIndex)} fullWidth>
                                    {[...Array(120).keys()].map((option) => (
                                        <MenuItem key={option + 5} value={option + 5}>
                                            {option + 5}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h4" style={{ color: theme.palette.primary.dark }}>
                                    Descrição:
                                </Typography>
                                <TextField
                                    value={plan.description}
                                    onChange={(e) => handleDescriptionChange(e, planIndex)}
                                    multiline
                                    rows={4}
                                    fullWidth
                                />
                            </Grid>
                            {Object.keys(plan.exercisesList).map((sceneId) => (
                                <Grid item xs={12} key={sceneId}>
                                    <Typography variant="h4" style={{ color: theme.palette.primary.dark }}>
                                        Escolha o exercício:
                                    </Typography>
                                    <Select
                                        value={plan.exercisesList[sceneId].selectedExercise || ''}
                                        onChange={(event) => handleSelectExercise(event, planIndex, sceneId)}
                                        fullWidth
                                    >
                                        <MenuItem value="">
                                            <em>Escolha...</em>
                                        </MenuItem>
                                        {availableExercises.map((exercise, index) => (
                                            <MenuItem key={index} value={exercise}>
                                                {exercise}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <DeleteButton
                                        name="Remover Exercicio"
                                        style={{ marginTop: '15px' }}
                                        onClick={() => removeAdditionalScene(planIndex, sceneId)}
                                    />
                                </Grid>
                            ))}
                            <Grid item xs={12}>
                                <Grid container direction="row" alignItems="center" spacing={1}>
                                    <Grid item>
                                        <EditButton name="Adicionar Exercicio" onViewClick={() => addAdditionalScene(planIndex)} />
                                    </Grid>
                                    <Grid item>
                                        <DeleteButton name="Apagar Treino" onClick={() => removePlan(planIndex)} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </MainCard>
                </Grid>
            ))}
            <Grid item xs={12}>
                <Grid container direction="row" alignItems="center" spacing={1}>
                    <Grid item sx={{ marginLeft: '15px' }}>
                        <EditButton name="Adicionar Treino" onViewClick={addPlan} />
                    </Grid>
                    <Grid item>
                        <EditButton name="Gravar Plano" onViewClick={savePlans} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default EditPlan;
