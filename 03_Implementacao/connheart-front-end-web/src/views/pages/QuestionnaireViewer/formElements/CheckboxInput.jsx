import React, { Fragment, useState } from 'react';
import { Checkbox, FormControlLabel, Typography, Box, Grid } from '@mui/material';
import MainCard from '../../../../ui-component/cards/MainCard';
import PropTypes from 'prop-types';

const CheckboxInput = ({ questionnaireData, onInputChange }) => {
    const [checkedValues, setCheckedValues] = useState([]);

    const handleChange = (event, value) => {
        const newCheckedValues = event.target.checked ? [...checkedValues, value] : checkedValues.filter((v) => v !== value);
        setCheckedValues(newCheckedValues);
        if (onInputChange) {
            onInputChange(questionnaireData.id, newCheckedValues);
        }
    };

    if (!questionnaireData || !Array.isArray(questionnaireData.options)) {
        console.error('CheckboxInput: Invalid questionnaireData prop structure');
        return <Typography variant="body1">Invalid data provided</Typography>;
    }

    return (
        <Fragment>
            <MainCard title={questionnaireData.questionNumber ? `Questão ${questionnaireData.questionNumber}` : null} sx={{ mb: 2 }}>
                <Box sx={{ p: 3 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={11}>
                            <Typography variant="body1" sx={{ paddingBottom: '5%', fontSize: '25px' }}>
                                {questionnaireData.value || ''}
                            </Typography>
                            {questionnaireData.options.map((option, i) => (
                                <Grid item xs={12} key={i} container justify="center" alignItems="center" sx={{ paddingLeft: '10%' }}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                sx={{ paddingBottom: '5%' }}
                                                checked={checkedValues.includes(option.value)}
                                                onChange={(e) => handleChange(e, option.value)}
                                            />
                                        }
                                        label={<Typography sx={{ fontSize: '18px', paddingBottom: '5%' }}>{option.value}</Typography>}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Box>
            </MainCard>
        </Fragment>
    );
};

CheckboxInput.propTypes = {
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

export default CheckboxInput;
