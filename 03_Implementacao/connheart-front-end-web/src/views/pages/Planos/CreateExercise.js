import React, { useState } from 'react';
import { Button, TextField, Checkbox, FormControlLabel, Box, Typography, Divider, Grid } from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import EditButton from '../../../ui-component/extended/EditButton';
import { useTheme } from '@mui/material/styles';
import { v4 as uuidv4 } from 'uuid';
import DeleteButton from '../../../ui-component/extended/DeleteButton';

const ExerciseForm = ({ id, initialData, onSave, onDelete }) => {
    const theme = useTheme();
    const [exerciseName, setExerciseName] = useState(initialData.exerciseName || '');
    const [exerciseDescription, setExerciseDescription] = useState(initialData.exerciseDescription || '');
    const [repeticoes, setRepeticoes] = useState(initialData.repeticoes || '');
    const [duracao, setDuracao] = useState(initialData.duracao || '');
    const [objetivos, setObjetivos] = useState(initialData.objetivos || '');
    const [selectedCheckbox, setSelectedCheckbox] = useState(initialData.checkBoxSelected || '');

    const handleExerciseNameChange = (event) => {
        setExerciseName(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setSelectedCheckbox(checked ? name : '');
    };

    const handleSave = () => {
        if (exerciseName && exerciseDescription && repeticoes && duracao && objetivos && selectedCheckbox) {
            const updatedExercise = {
                id,
                checkBoxSelected: selectedCheckbox,
                exerciseName,
                exerciseDescription,
                repeticoes,
                duracao,
                objetivos
            };
            onSave(updatedExercise, false);
        } else {
            alert('Por favor, preencha todos os campos antes de gravar.');
        }
    };

    const handleDelete = () => {
        onDelete(id);
    };

    return (
        <MainCard title={exerciseName || 'Nome'}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox name="Aquecimento" checked={selectedCheckbox === 'Aquecimento'} onChange={handleCheckboxChange} />
                        }
                        label="Aquecimento"
                    />
                    <FormControlLabel
                        control={<Checkbox name="Aeróbio" checked={selectedCheckbox === 'Aeróbio'} onChange={handleCheckboxChange} />}
                        label="Aeróbio"
                    />
                    <FormControlLabel
                        control={<Checkbox name="Força" checked={selectedCheckbox === 'Força'} onChange={handleCheckboxChange} />}
                        label="Força"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox name="Alongamentos" checked={selectedCheckbox === 'Alongamentos'} onChange={handleCheckboxChange} />
                        }
                        label="Alongamentos"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4" style={{ color: theme.palette.primary.dark }}>
                                Nome:
                            </Typography>
                            <TextField id="nome-exercicio" fullWidth value={exerciseName} onChange={handleExerciseNameChange} />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4" style={{ color: theme.palette.primary.dark }}>
                                Repetições:
                            </Typography>
                            <TextField
                                id="repeticoes"
                                value={repeticoes}
                                onChange={(event) => setRepeticoes(event.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <Typography variant="h4" style={{ color: theme.palette.primary.dark }}>
                                Duração:
                            </Typography>
                            <TextField id="duracao" value={duracao} onChange={(event) => setDuracao(event.target.value)} fullWidth />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" style={{ color: theme.palette.primary.dark }}>
                        Descrição/Comentários:
                    </Typography>
                    <TextField
                        id="descricao-exercicio"
                        multiline
                        fullWidth
                        rows={2}
                        value={exerciseDescription}
                        onChange={(event) => setExerciseDescription(event.target.value)}
                        sx={{ mb: 2 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="h4" style={{ color: theme.palette.primary.dark }}>
                        Objetivos:
                    </Typography>
                    <TextField
                        id="objetivos"
                        multiline
                        fullWidth
                        rows={3}
                        value={objetivos}
                        onChange={(event) => setObjetivos(event.target.value)}
                        sx={{ mb: 2 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Grid container direction="row" alignItems="center" spacing={1}>
                        <Grid item>
                            <EditButton name="Gravar Exercicío" onViewClick={handleSave} />
                        </Grid>
                        <Grid item>
                            <DeleteButton name="Apagar Exercicio" onClick={handleDelete} />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </MainCard>
    );
};

const ExerciseCard = () => {
    // Adiciona um exercício inicial para que a MainCard apareça quando a página for aberta
    const [exercises, setExercises] = useState([
        { id: uuidv4(), exerciseName: '', exerciseDescription: '', repeticoes: '', duracao: '', objetivos: '', checkBoxSelected: '' }
    ]);

    const handleAddCard = () => {
        setExercises((prevExercises) => [...prevExercises, { id: uuidv4() }]);
    };

    const handleSave = async (updatedExercise, isNewExercise) => {
        setExercises((prevExercises) => {
            const index = prevExercises.findIndex((exercise) => exercise.id === updatedExercise.id);
            if (index !== -1) {
                const updatedExercises = [...prevExercises];
                updatedExercises[index] = updatedExercise;
                return updatedExercises;
            } else if (isNewExercise) {
                return [...prevExercises, updatedExercise];
            } else {
                return prevExercises;
            }
        });

        const formattedExercise = {
            TIPO: updatedExercise.checkBoxSelected,
            duracao: updatedExercise.duracao,
            objetivos: updatedExercise.objetivos,
            repeticoes: updatedExercise.repeticoes,
            nome_do_exercicio: updatedExercise.exerciseName,
            descricao_do_exercicio: updatedExercise.exerciseDescription
        };

        try {
            const response = await fetch('http://localhost:8000/exercises', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formattedExercise)
            });

            if (!response.ok) {
                throw new Error('Failed to save exercise');
            }
            alert('Exercício salvo com sucesso!');
        } catch (error) {
            console.error('Error saving exercise:', error);
        }
    };

    const handleDeleteExercise = (id) => {
        setExercises((prevExercises) => prevExercises.filter((exercise) => exercise.id !== id));
    };

    return (
        <>
            {exercises.map((exercise) => (
                <ExerciseForm
                    key={exercise.id}
                    id={exercise.id}
                    initialData={exercise}
                    onSave={handleSave}
                    onDelete={handleDeleteExercise}
                />
            ))}
            <Grid item sx={{ marginLeft: '15px', marginTop: '15px' }}>
                <EditButton name="Adicionar Novo Exercício" onViewClick={handleAddCard} />
            </Grid>
        </>
    );
};

export default ExerciseCard;
