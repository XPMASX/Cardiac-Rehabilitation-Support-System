import { Fragment } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import { Grid } from '@mui/material';
import QuestionnaireHeader from './QuestionnaireHeader';
import ExistingQuestionnaireCard from './QuestionarioCard';
import { gridSpacing } from '../../../store/constant';
import PropTypes from 'prop-types';
import NewQuestionnaireCard from './NewQuestionnaireCard';

// Has List of Existing Forms and Form Creation
const QuestionnaireList = ({
    title,
    setTitle,
    description,
    setDescription,
    existingQuestionnaires,
    fetchQuestionnaireDetails,
    children, // QuestionnaireBuilder or Previewer
    createNewQuestionnaire,
    onDelete,
    selectedQuestionnaireId
}) => {
    return (
        <Fragment>
            <MainCard border boxShadow={true} content={false} title="Questionários Existentes">
                <Grid container spacing={2} justifyContent="space-around" alignItems="start" marginTop={2} marginBottom={2}>
                    <Grid item xs={11}>
                        <Grid container spacing={gridSpacing} justifyContent="start">
                            {existingQuestionnaires.map((questionnaire, index) => (
                                <Grid item key={index} lg={4} md={5} sm={10} xs={12}>
                                    <ExistingQuestionnaireCard
                                        isLoading={false}
                                        questionnaire={questionnaire}
                                        onClick={() => fetchQuestionnaireDetails(questionnaire.id)}
                                        fetchQuestionnaireDetails={fetchQuestionnaireDetails}
                                        onDelete={onDelete}
                                        highlight={questionnaire.id === selectedQuestionnaireId} // Pass highlight prop
                                    />
                                </Grid>
                            ))}
                            <Grid item key={'auto'} lg={4} md={5} sm={10} xs={12}>
                                <NewQuestionnaireCard createNewQuestionnaire={createNewQuestionnaire} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
            <MainCard border boxShadow={true} content={false} title="Criação de Questionário">
                <Grid container spacing={2} justifyContent="center" marginTop={2}>
                    <Grid item xs={10}>
                        <QuestionnaireHeader title={title} setTitle={setTitle} description={description} setDescription={setDescription} />
                    </Grid>
                    <Grid item xs={10}>
                        {children}
                    </Grid>
                </Grid>
            </MainCard>
        </Fragment>
    );
};

QuestionnaireList.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    setTitle: PropTypes.func.isRequired,
    setDescription: PropTypes.func.isRequired,
    existingQuestionnaires: PropTypes.array.isRequired,
    fetchQuestionnaireDetails: PropTypes.func.isRequired,
    children: PropTypes.node,
    createNewQuestionnaire: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    selectedQuestionnaireId: PropTypes.string
};

export default QuestionnaireList;
