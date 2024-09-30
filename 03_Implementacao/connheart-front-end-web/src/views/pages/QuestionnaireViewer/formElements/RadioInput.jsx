import React, { Fragment, useState, useEffect } from 'react';
import { RadioGroup, FormControlLabel, Radio, Typography, Box, Grid } from '@mui/material';
import MainCard from '../../../../ui-component/cards/MainCard';
import PropTypes from 'prop-types';

const RadioInput = ({ questionnaireData, onInputChange }) => {
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        console.log('RadioInput item prop: ', questionnaireData);
    }, [questionnaireData]);

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        if (onInputChange) {
            onInputChange(questionnaireData.id, event.target.value);
        }
    };

    if (!questionnaireData || !Array.isArray(questionnaireData.options)) {
        console.error('RadioInput: Invalid questionnaireData prop structure');
        return <Typography variant="body1">Invalid data provided</Typography>;
    }

    return (
        <Fragment>
            <MainCard title={questionnaireData.questionNumber ? `Questão ${questionnaireData.questionNumber}` : null} sx={{ mb: 2 }}>
                <Box sx={{ p: 3 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={9}>
                            <Typography variant="body1" sx={{ padding: '10px', fontSize: '20px' }}>
                                {questionnaireData.value || ''}
                            </Typography>
                            <RadioGroup value={selectedValue} onChange={handleChange} sx={{ paddingLeft: '10%' }}>
                                {questionnaireData.options.map((option, i) => (
                                    <FormControlLabel
                                        key={i}
                                        value={option.value}
                                        control={<Radio />}
                                        label={<Typography sx={{ fontSize: '18px' }}>{option.value}</Typography>}
                                    />
                                ))}
                            </RadioGroup>
                        </Grid>
                    </Grid>
                </Box>
            </MainCard>
        </Fragment>
    );
};

RadioInput.propTypes = {
    questionnaireData: PropTypes.shape({
        id: PropTypes.any.isRequired,
        questionNumber: PropTypes.number,
        value: PropTypes.string,
        options: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.string.isRequired
            }).isRequired
        ).isRequired
    }).isRequired,
    onInputChange: PropTypes.func.isRequired
};

export default RadioInput;
