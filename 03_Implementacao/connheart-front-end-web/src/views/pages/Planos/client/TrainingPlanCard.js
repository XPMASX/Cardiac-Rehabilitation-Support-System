import { Box, Divider, List, Paper, Typography } from '@mui/material';
import TrainingCard from './TrainingCard';

const SectionTitle = ({ children }) => (
    <Box sx={{ mb: 2 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#00c3ff', mb: 1 }}>
            {children}
        </Typography>
        <Divider sx={{ borderColor: '#00c3ff', borderWidth: 2 }} />
    </Box>
);

const TrainingPlanCard = ({ plan, level, maxHeartRate, totalDuration, description, exercisesList, trainings, onComplete, onUndo }) => {
    const updateExerciseStatus = async (plan, exerciseId, status) => {
        try {
            const response = await fetch(`http://localhost:8000/updateExerciseStatus/${plan.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    exerciseId: exerciseId,
                    status: status
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Erro ao atualizar o status do exercício:', errorData);
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Status do exercício atualizado:', data);
            return data;
        } catch (error) {
            console.error('Erro ao atualizar o status do exercício:', error);
            return null;
        }
    };

    const handleComplete = async (exerciseId) => {
        try {
            const updatedPlan = await updateExerciseStatus(plan, exerciseId, 'yes');
            if (updatedPlan) {
                onComplete();
            }
        } catch (error) {
            console.error('Erro ao completar o exercício:', error);
        }
    };

    const handleUndo = async (exerciseId) => {
        try {
            const updatedPlan = await updateExerciseStatus(plan, exerciseId, 'no');
            if (updatedPlan) {
                onUndo();
            }
        } catch (error) {
            console.error('Erro ao desfazer o exercício:', error);
        }
    };

    return (
        <Box sx={{ mb: 2 }}>
            <Paper elevation={3} sx={{ minHeight: 300, padding: 3, marginBottom: 2, borderRadius: 2 }}>
                <SectionTitle>Descrição</SectionTitle>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    {description}
                </Typography>
                <SectionTitle>Treinos</SectionTitle>
                <List>
                    {exercisesList.map((exercise) => {
                        const exerciseName = exercise.selectedExercise.split(' - ')[1];
                        const matchingTraining = trainings.find((training) => training.name === exerciseName);
                        if (matchingTraining) {
                            return (
                                <TrainingCard
                                    key={exercise.selectedExercise}
                                    id={exercise.selectedExercise}
                                    totalDuration={`${matchingTraining.duration} mins`}
                                    exercises={[matchingTraining]}
                                    completed={exercise.exercicioFeito === 'yes'}
                                    onComplete={() => handleComplete(exercise.selectedExercise)}
                                    onUndo={() => handleUndo(exercise.selectedExercise)}
                                />
                            );
                        }
                        return null;
                    })}
                </List>
                <SectionTitle>Nível</SectionTitle>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    {level}
                </Typography>

                <SectionTitle>Frequência Cardíaca Máxima</SectionTitle>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    {maxHeartRate}
                </Typography>

                <SectionTitle>Duração:</SectionTitle>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    {totalDuration}
                </Typography>
            </Paper>
        </Box>
    );
};

export default TrainingPlanCard;
