import { useState } from 'react';
import { Button, Divider, List, ListItem, ListItemText, Paper, Typography, Box } from '@mui/material';

const TrainingCard = ({ id, totalDuration, exercises, completed, onComplete, onUndo }) => {
    const [isCompleted, setIsCompleted] = useState(completed);

    const handleComplete = () => {
        setIsCompleted(true);
        onComplete(id);
    };

    const handleUndo = () => {
        setIsCompleted(false);
        onUndo(id);
    };

    return (
        <Paper elevation={3} sx={{ padding: 2, marginBottom: 2, borderRadius: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: isCompleted ? '#8c8c8c' : '#00c3ff', marginBottom: 1 }}>
                Treino {id}
            </Typography>
            <Divider sx={{ borderColor: isCompleted ? '#8c8c8c' : '#00c3ff', borderWidth: 2, marginY: 1 }} />
            <Box sx={{ filter: isCompleted ? 'blur(4px)' : 'none', marginTop: 1 }}>
                <List>
                    {exercises.map((exercise, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemText
                                secondary={
                                    <Typography component="div">
                                        <Typography variant="body2" color="textPrimary" sx={{ marginBottom: 2 }}>
                                            <strong>Descrição:</strong> {exercise.description}
                                            <br />
                                            <strong>Séries:</strong> {exercise.sets}, <strong>Repetições:</strong> {exercise.reps},{' '}
                                            <strong>Duração:</strong> {exercise.duration} mins, <strong>Objetivos:</strong>{' '}
                                            {exercise.objectives}
                                        </Typography>
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
            {!isCompleted ? (
                <Button variant="outlined" onClick={handleComplete} sx={{ mt: 2 }}>
                    MARCAR COMO FEITO
                </Button>
            ) : (
                <Button variant="outlined" onClick={handleUndo} sx={{ mt: 2 }}>
                    DESFAZER
                </Button>
            )}
        </Paper>
    );
};

export default TrainingCard;
