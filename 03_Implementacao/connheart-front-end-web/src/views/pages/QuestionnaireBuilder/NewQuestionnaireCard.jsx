import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, Typography, Button } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import NoteAddIcon from '@mui/icons-material/NoteAdd';

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    height: '100%'
}));

const StyledAssignmentIcon = styled(NoteAddIcon)(() => ({
    width: '70px',
    height: '70px',
    color: '#fff'
}));

function NewQuestionnaireCard({ createNewQuestionnaire }) {
    const theme = useTheme();

    const handleCardClick = () => {
        createNewQuestionnaire();
    };

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={handleCardClick}
            onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                    handleCardClick();
                }
            }}
        >
            <CardWrapper content={false}>
                <Card sx={{ display: 'flex', width: '100%' }}>
                    {/* Display the New Questionnaire icon */}
                    <Box
                        sx={{ display: 'flex', width: '45%', justifyContent: 'center', alignItems: 'center' }}
                        className="QuestionarioCard-counter"
                        backgroundColor={theme.palette.secondary.dark}
                    >
                        <StyledAssignmentIcon />
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-around',
                            width: '150%',
                            height: '170px',
                            padding: '12px'
                        }}
                    >
                        <Typography component="div" variant="h4" color="text.primary">
                            Novo Questionário
                        </Typography>
                    </Box>
                </Card>
            </CardWrapper>
        </div>
    );
}

NewQuestionnaireCard.propTypes = {
    createNewQuestionnaire: PropTypes.func.isRequired // Define the createNewQuestionnaire prop
};

export default NewQuestionnaireCard;
