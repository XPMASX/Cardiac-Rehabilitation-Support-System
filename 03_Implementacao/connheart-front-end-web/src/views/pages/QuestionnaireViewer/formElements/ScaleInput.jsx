import React, { Fragment, useState, useEffect } from 'react';
import { RadioGroup, FormControlLabel, Radio, Typography, Box, Grid } from '@mui/material';
import MainCard from '../../../../ui-component/cards/MainCard';
import PropTypes from 'prop-types';

const ScaleInput = ({ questionnaireData, onInputChange }) => {
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        console.log('ScaleInput item prop: ', questionnaireData);
    }, [questionnaireData]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        if (onInputChange) {
            onInputChange(questionnaireData.id, event.target.value);
        }
    };

    if (!questionnaireData || !questionnaireData.options) {
        console.error('ScaleInput: Invalid item prop structure');
        return <Typography variant="body1">Invalid data provided</Typography>;
    }

    const { scaleType = 'text', radioCount = 5 } = questionnaireData;

    const generateDefaultOptions = () => {
        return Array.from({ length: radioCount }, (_, index) => ({
            value: index,
            label:
                index === 0
                    ? 'Discordo Totalmente'
                    : index === Math.floor(radioCount / 2)
                      ? 'Neutro'
                      : index === radioCount - 1
                        ? 'Concordo Totalmente'
                        : `${index}`
        }));
    };

    const options = questionnaireData.options.length > 0 ? questionnaireData.options : generateDefaultOptions();

    const renderOptions = () => {
        if (scaleType === 'numbers') {
            return (
                <RadioGroup
                    row
                    aria-labelledby="escala-num-label"
                    name="grupo-escala-num"
                    value={selectedValue}
                    onChange={handleChange}
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingBottom: '8px',
                        paddingLeft: '10%',
                        flexWrap: 'nowrap'
                    }}
                >
                    {options.map((option, index) => (
                        <FormControlLabel
                            key={index}
                            value={index.toString()}
                            control={<Radio />}
                            label={<Typography sx={{ fontSize: '16px' }}>{index}</Typography>}
                            labelPlacement="top"
                            sx={{
                                margin: '0 4px',
                                fontSize: '0.75rem',
                                minWidth: '32px' // Ensures each option has a minimum width
                            }}
                        />
                    ))}
                </RadioGroup>
            );
        } else {
            return (
                <RadioGroup
                    aria-labelledby="escala-likert-label"
                    name="grupo-escala-likert"
                    value={selectedValue}
                    onChange={handleChange}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        paddingBottom: '8px',
                        paddingLeft: '10%'
                    }}
                >
                    {options.map((option, index) => (
                        <FormControlLabel
                            key={index}
                            value={index.toString()}
                            control={<Radio />}
                            label={<Typography sx={{ fontSize: '16px' }}>{option.label}</Typography>}
                            labelPlacement="end"
                        />
                    ))}
                </RadioGroup>
            );
        }
    };

    return (
        <Fragment>
            <MainCard title={questionnaireData.questionNumber ? `Questão ${questionnaireData.questionNumber}` : null} sx={{ mb: 2 }}>
                <Box sx={{ p: 3 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={9}>
                            <Typography variant="body1" sx={{ padding: '10px', fontSize: '20px' }}>
                                {questionnaireData.value || ''}
                            </Typography>
                            {renderOptions()}
                        </Grid>
                    </Grid>
                </Box>
            </MainCard>
        </Fragment>
    );
};

ScaleInput.propTypes = {
    questionnaireData: PropTypes.shape({
        id: PropTypes.any.isRequired,
        questionNumber: PropTypes.number,
        value: PropTypes.string,
        scaleType: PropTypes.string,
        radioCount: PropTypes.number,
        options: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
                label: PropTypes.string
            })
        )
    }).isRequired,
    onInputChange: PropTypes.func.isRequired
};

export default ScaleInput;
