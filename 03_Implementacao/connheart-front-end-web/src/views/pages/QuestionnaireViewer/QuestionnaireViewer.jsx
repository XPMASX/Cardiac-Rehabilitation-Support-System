import React, { Fragment, useEffect } from 'react';
import { Typography, Grid } from '@mui/material';
import TextInput from './formElements/TextInput';
import TextFieldInput from './formElements/TextFieldInput';
import RadioInput from './formElements/RadioInput';
import CheckboxInput from './formElements/CheckboxInput';
import ScaleInput from './formElements/ScaleInput';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';

const QuestionnaireViewer = ({ title, description, formData, onInputChange }) => {
    const theme = useTheme();

    const renderFormElement = (item, index) => {
        const commonProps = {
            questionnaireData: { ...item, questionNumber: index + 1 },
            onInputChange: onInputChange
        };

        console.log('Rendering form element:', item);

        switch (item.type) {
            case 'text':
                return <TextInput key={index} {...commonProps} />;
            case 'textarea':
                return <TextFieldInput key={index} {...commonProps} />;
            case 'radio':
                return <RadioInput key={index} {...commonProps} />;
            case 'checkbox':
                return <CheckboxInput key={index} {...commonProps} />;
            case 'scale':
                return <ScaleInput key={index} {...commonProps} />;
            default:
                return null;
        }
    };

    return (
        <Fragment>
            <Grid container spacing={2} direction="column">
                <Grid item xs={12}>
                    <Typography variant="h1" align="center" gutterBottom sx={{ color: theme.palette.primary.dark }}>
                        {title}
                    </Typography>
                    <Typography variant="body1" align="center" gutterBottom sx={{ fontSize: '20px' }}>
                        {description}
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    {formData.map((item, index) => renderFormElement(item, index))}
                </Grid>
            </Grid>
        </Fragment>
    );
};

QuestionnaireViewer.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    formData: PropTypes.array,
    onInputChange: PropTypes.func
};

export default QuestionnaireViewer;
