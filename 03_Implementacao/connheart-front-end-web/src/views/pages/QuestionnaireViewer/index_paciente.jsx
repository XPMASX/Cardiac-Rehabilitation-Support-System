import React, { useState, useEffect } from 'react';
import { Fragment } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Button, Grid, Tooltip } from '@mui/material';
import { gridSpacing } from '../../../store/constant';
import QuestionnaireViewer from './QuestionnaireViewer';
import ExistingQuestionnaireCard from './QuestionarioCard';

const QuestionnaireManagerPatient = ({ pacienteNumUtenteSaude }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState([]);
    const [existingQuestionnaires, setExistingQuestionnaires] = useState([]);
    const [selectedQuestionnaireId, setSelectedQuestionnaireId] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:8000/questionarios-atribuidos/2001`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to fetch assigned questionnaires');
            })
            .then((data) => {
                setExistingQuestionnaires(data);
            })
            .catch((error) => console.error(error));
    }, [pacienteNumUtenteSaude]);

    const fetchQuestionnaireDetails = (questionnaireId) => {
        setSelectedQuestionnaireId(questionnaireId);
        fetch(`http://localhost:8000/questionarios/${questionnaireId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to fetch form data');
            })
            .then((responseData) => {
                const parsedData = JSON.parse(responseData);
                setTitle(parsedData.title);
                setDescription(parsedData.description);
                setFormData(parsedData.data);
                setData(parsedData.data);
                console.log('Parsed data:', parsedData.data);
            })
            .catch((error) => {
                console.error('Error fetching form data:', error);
            });
    };

    const handleInputChange = (itemId, value) => {
        setFormData((prevFormData) => prevFormData.map((item) => (item.id === itemId ? { ...item, answer: value } : item)));
    };

    const uploadQuestionnaire = () => {
        const filledData = {
            idQuestionario: selectedQuestionnaireId,
            DadosQuests: formData,
            PacienteNumUtenteSaude: 2001
        };

        fetch(`http://localhost:8000/guardar-preenchido/${selectedQuestionnaireId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(filledData)
        })
            .then((response) => {
                if (response.ok) {
                    alert('Submissão efetuada com sucesso!');
                } else {
                    throw new Error('Failed to submit questionnaire');
                }
            })
            .catch((error) => {
                console.error('Error submitting questionnaire:', error);
            });
    };

    return (
        <Fragment>
            <MainCard border boxShadow={true} content={false} title="Questionários Atribuídos">
                <Grid container spacing={2} justifyContent="space-around" alignItems="flex-start" marginTop={2} marginBottom={2}>
                    <Grid item xs={11}>
                        <Grid container spacing={gridSpacing} justifyContent="flex-start">
                            {existingQuestionnaires.map((questionnaire, index) => (
                                <Grid item key={index} lg={4} md={5} sm={10} xs={12}>
                                    <ExistingQuestionnaireCard
                                        isLoading={false}
                                        questionnaire={questionnaire}
                                        onClick={() => fetchQuestionnaireDetails(questionnaire.id)}
                                        highlight={questionnaire.id === selectedQuestionnaireId}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
            {selectedQuestionnaireId && (
                <MainCard border boxShadow={true} content={false} title="Preenchimento de Questionário">
                    <Grid container spacing={2} justifyContent="center" marginTop={2}>
                        <Grid item xs={10}>
                            <QuestionnaireViewer
                                title={title}
                                description={description}
                                formData={formData}
                                onInputChange={handleInputChange}
                            />
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px' }}>
                                <Tooltip title={'Submeter'} aria-label="preview-form">
                                    <Button variant="outlined" onClick={uploadQuestionnaire}>
                                        {'Submeter'}
                                    </Button>
                                </Tooltip>
                            </div>
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </Fragment>
    );
};

export default QuestionnaireManagerPatient;
