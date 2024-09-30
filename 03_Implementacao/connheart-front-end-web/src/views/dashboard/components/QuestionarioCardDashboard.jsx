import PropTypes from 'prop-types';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, Typography, IconButton } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { Assignment, Delete } from '@mui/icons-material'; // Assignment and Delete icons

const CardWrapper = styled(MainCard)(({ theme, highlight }) => ({
    backgroundColor: highlight ? theme.palette.primary.main : theme.palette.secondary.dark,
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

function ExistingQuestionnaireCardDashboard({ isLoading, questionnaire }) {
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <div role="button" tabIndex={0}>
                    <CardWrapper content={false}>
                        <Card sx={{ display: 'flex', width: '100%' }}>
                            {/* Display the Questionnaire icon */}
                            <Box
                                sx={{
                                    display: 'flex',
                                    width: '45%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: theme.palette.secondary.dark
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
                                <IconButton
                                    aria-label="delete"
                                    size="large"
                                    sx={{
                                        position: 'absolute',
                                        top: '75%',
                                        right: '1%',
                                        color: '#c12929',
                                        padding: '0 10px'
                                    }}
                                ></IconButton>
                            </Box>
                        </Card>
                    </CardWrapper>
                </div>
            )}
        </>
    );
}

ExistingQuestionnaireCardDashboard.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    questionnaire: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired
    }).isRequired
};

export default ExistingQuestionnaireCardDashboard;
