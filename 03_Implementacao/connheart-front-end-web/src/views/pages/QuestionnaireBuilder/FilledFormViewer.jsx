import React, { useEffect, useState } from 'react';
import { Grid, Typography, Card, CardContent, List, ListItem, ListItemText } from '@mui/material';
import { useParams } from 'react-router-dom';

// NOT WORKING CORRECTLY
const FilledFormsViewer = () => {
    const [filledForms, setFilledForms] = useState([]);
    const { pacienteNumUtenteSaude } = useParams();

    useEffect(() => {
        fetch(`http://localhost:8000/questionarios-preenchidos/${pacienteNumUtenteSaude}`)
            .then((response) => response.json())
            .then((data) => setFilledForms(data))
            .catch((error) => console.error('Error fetching filled forms:', error));
    }, [pacienteNumUtenteSaude]);

    const getTextForScaleValue = (question, answerIndex) => {
        if (!question.options || !Array.isArray(question.options)) {
            return 'Não Respondeu';
        }

        const selectedOption = question.options.find((option) => option.value.toString() === answerIndex.toString());
        return selectedOption ? selectedOption.label : 'Não Respondeu';
    };

    return (
        <Grid container spacing={3} direction="column" alignItems="center">
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom>
                    Questionários Preenchidos pelo Paciente com o id {pacienteNumUtenteSaude}
                </Typography>
            </Grid>
            {filledForms.map((form, index) => (
                <Grid item xs={12} md={8} key={index}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Questionário: {form.title}
                            </Typography>
                            <List>
                                {form.DadosQuests.map((item, itemIndex) => (
                                    <ListItem key={itemIndex}>
                                        <ListItemText
                                            primary={item.value}
                                            secondary={`Resposta: ${item.answer ? getTextForScaleValue(item, item.answer) : 'Não Respondeu'}`}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default FilledFormsViewer;
