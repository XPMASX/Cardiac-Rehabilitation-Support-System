import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, Typography, IconButton } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { Assignment } from '@mui/icons-material';
import theme from '../../../themes'; // Assignment and Delete icons

const role = 'PATIENT';
const cardColor = role === 'DOCTOR' ? theme.palette.primary.dark : '#599FCC';

const CardWrapper = styled(MainCard)(({ theme, highlight }) => ({
    backgroundColor: highlight ? theme.palette.primary.main : cardColor,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    width: '100%'
}));

const StyledAssignmentIcon = styled(Assignment)(() => ({
    width: '70px',
    height: '70px',
    color: '#fff'
}));

function ExistingQuestionnaireCard({ isLoading, questionnaire, onClick, onDelete, highlight }) {
    const theme = useTheme();

    const handleCardClick = () => {
        onClick(); // Trigger the onClick function to select the questionnaire
        console.log('Selected Questionnaire:', questionnaire);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
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
                    <CardWrapper content={false} highlight={highlight}>
                        <Card sx={{ display: 'flex', width: '100%' }}>
                            {/* Display the Questionnaire icon */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    width: '45%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: highlight ? theme.palette.secondary.dark : cardColor
                                }}
                                className="QuestionarioCard-counter"
                            >
                                <StyledAssignmentIcon />
                            </Box>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'flex-start', // Align children to the top
                                    width: '150%',
                                    height: '170px',
                                    padding: '12px'
                                }}
                            >
                                <Typography
                                    component="div"
                                    variant="h4"
                                    color="text.primary"
                                    sx={{
                                        textOverflow: 'ellipsis',
                                        paddingBottom: '10px'
                                    }}
                                >
                                    {questionnaire.title}
                                </Typography>
                                <Typography
                                    component="div"
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{
                                        paddingRight: '33px',
                                        textOverflow: 'ellipsis',
                                        overflow: 'hidden'
                                    }}
                                >
                                    {questionnaire.description}
                                </Typography>
                            </Box>
                        </Card>
                    </CardWrapper>
                </div>
            )}
        </>
    );
}

ExistingQuestionnaireCard.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    questionnaire: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired,
    onDelete: PropTypes.func,
    highlight: PropTypes.bool
};

export default ExistingQuestionnaireCard;
