import React, { useState, useEffect } from 'react';
import QuestionnaireList from './QuestionnaireList';
import QuestionnaireBuilder from './QuestionnaireBuilder';
import { Button } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { api } from '../../../services/Api';
import QuestionnaireViewer from '../QuestionnaireViewer/QuestionnaireViewer';

const QuestionnaireManager = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState([]);
    const [existingQuestionnaires, setExistingQuestionnaires] = useState([]);
    const items = data; // Array of form elements
    // To store the selected questionnaire ID
    const [selectedQuestionnaireId, setSelectedQuestionnaireId] = useState(null);

    const [previewMode, setPreviewMode] = useState(false); // New state for preview mode

    useEffect(() => {
        api.get('http://localhost:8000/questionarios')
            .then((response) => {
                setExistingQuestionnaires(response.data);
            })
            .catch((error) => console.error('Failed to fetch questionnaires', error));
    }, []);

    const deleteQuestionnaire = (questionnaireId) => {
        fetch(`http://localhost:8000/questionarios/${questionnaireId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok) {
                    setExistingQuestionnaires((prev) => prev.filter((questionnaire) => questionnaire.id !== questionnaireId));
                } else {
                    console.error('Failed to delete questionnaire');
                }
            })
            .catch((error) => {
                console.error('Error deleting questionnaire:', error);
            });
        setExistingQuestionnaires((prev) => prev.filter((questionnaire) => questionnaire.id !== questionnaireId));
    };
    const fetchQuestionnaireDetails = (questionnaireId) => {
        setSelectedQuestionnaireId(questionnaireId); // Store the ID of the selected questionnaire
        fetch(`http://localhost:8000/questionarios/${questionnaireId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json(); // Parse the JSON response
                }
                throw new Error('Failed to fetch form data');
            })
            .then((responseData) => {
                //console.log('Response Data:', responseData);
                return responseData;
            })
            .then((data) => {
                console.log('title:', JSON.parse(data).title);
                console.log('description:', JSON.parse(data).description);
                console.log('data:', JSON.parse(data).data);
                setTitle(JSON.parse(data).title);
                setDescription(JSON.parse(data).description);
                setFormData(JSON.parse(data).data);
                setData(JSON.parse(data).data);
            })
            .catch((error) => {
                console.error('Error fetching form data:', error);
            });
    };

    const createNewQuestionnaire = () => {
        setTitle(''); // Clear questionatire
        setDescription('');
        setFormData([]);
        setData([]);
        setSelectedQuestionnaireId(null);
        setPreviewMode(false);
    };

    const togglePreviewMode = () => {
        setPreviewMode(!previewMode);
    };

    return (
        <QuestionnaireList
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            onDelete={deleteQuestionnaire}
            existingQuestionnaires={existingQuestionnaires}
            fetchQuestionnaireDetails={fetchQuestionnaireDetails}
            createNewQuestionnaire={createNewQuestionnaire}
            selectedQuestionnaireId={selectedQuestionnaireId}
        >
            {previewMode ? (
                <QuestionnaireViewer
                    title={title}
                    description={description}
                    formData={formData}
                    togglePreviewMode={togglePreviewMode}
                    previewMode={previewMode}
                />
            ) : (
                <QuestionnaireBuilder
                    formData={formData}
                    setData={setFormData}
                    db_data={items}
                    title={title}
                    description={description}
                    selectedQuestionnaireId={selectedQuestionnaireId}
                    setSelectedQuestionnaireId={setSelectedQuestionnaireId}
                    togglePreviewMode={togglePreviewMode}
                    previewMode={previewMode}
                />
            )}
            {previewMode && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingBottom: '30px' }}>
                    <Tooltip title={'Editar'} aria-label="preview-form">
                        <Button variant="outlined" onClick={togglePreviewMode}>
                            {'Modo Edição'}
                        </Button>
                    </Tooltip>
                </div>
            )}
        </QuestionnaireList>
    );
};

export default QuestionnaireManager;
