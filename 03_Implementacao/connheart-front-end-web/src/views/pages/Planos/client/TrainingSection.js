import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Button } from '@mui/material';
import TrainingPlanCard from './TrainingPlanCard';

const TrainingSection = ({ trainingPlans, trainings, onComplete, onUndo, remainingWorkouts, onUpdate }) => {
    const [selectedPlanIndex, setSelectedPlanIndex] = useState(null);

    const handlePlanClick = (index) => {
        setSelectedPlanIndex(index === selectedPlanIndex ? null : index);
    };
    return (
        <Grid container spacing={2} maxWidth="lg">
            {trainingPlans.map((plan, index) => (
                <Grid item key={plan.idPlano}>
                    <Button
                        variant="outlined"
                        onClick={() => handlePlanClick(index)}
                        sx={{
                            marginTop: 2,
                            color: selectedPlanIndex === index ? '#ffffff' : '#2196f3',
                            borderColor: selectedPlanIndex === index ? '#2196f3' : 'inherit',
                            backgroundColor: selectedPlanIndex === index ? '#2196f3' : 'inherit',
                            '&:hover': {
                                backgroundColor: selectedPlanIndex === index ? '#1565c0' : '#f2f2f2',
                                borderColor: selectedPlanIndex === index ? '#1565c0' : 'inherit',
                                color: selectedPlanIndex === index ? '#ffffff' : '#1565c0'
                            },
                            '&:active': {
                                backgroundColor: selectedPlanIndex === index ? '#2196f3' : '#2196f3',
                                borderColor: selectedPlanIndex === index ? '#2196f3' : 'inherit',
                                color: selectedPlanIndex === index ? '#ffffff' : '#2196f3'
                            }
                        }}
                    >
                        Plano {index + 1}
                    </Button>
                </Grid>
            ))}
            {selectedPlanIndex !== null && (
                <Box mt={4} mb={4} width="100%">
                    <Typography variant="h5" gutterBottom paddingLeft={2}>
                        Detalhes do Plano {selectedPlanIndex + 1}
                    </Typography>
                    <Grid container spacing={2} paddingLeft={2}>
                        {JSON.parse(trainingPlans[selectedPlanIndex].DadosPlano).map((dadosPlano) => (
                            <Grid item xs={12} sm={8} md={6} key={dadosPlano.id}>
                                <TrainingPlanCard
                                    plan={trainingPlans[selectedPlanIndex]}
                                    planIndex={selectedPlanIndex}
                                    id={trainingPlans[selectedPlanIndex].id}
                                    level={dadosPlano.level}
                                    maxHeartRate={dadosPlano.maxHeartRate}
                                    totalDuration={`${dadosPlano.duration} mins`}
                                    description={dadosPlano.description}
                                    exercisesList={dadosPlano.exercisesList}
                                    trainings={trainings}
                                    onComplete={(planId, exerciseTitle) => onComplete(`${planId}_${exerciseTitle}`)}
                                    onUndo={(planId, exerciseTitle) => onUndo(`${planId}_${exerciseTitle}`)}
                                    remainingWorkouts={remainingWorkouts}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            )}
        </Grid>
    );
};

export default TrainingSection;
