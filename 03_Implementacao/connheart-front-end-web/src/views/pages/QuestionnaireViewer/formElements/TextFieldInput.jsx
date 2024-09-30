import React, { Fragment, useState } from 'react';
import { TextField, Typography, Box, Grid } from '@mui/material';
import MainCard from '../../../../ui-component/cards/MainCard';
import PropTypes from 'prop-types';

const TextFieldInput = ({ data }) => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <Fragment>
            <MainCard title={data.questionNumber ? `Questão ${data.questionNumber}` : null} sx={{ mb: 2 }}>
                <Box sx={{ p: 3 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={9}>
                            <Typography variant="body1" sx={{ padding: '10px', fontSize: '20px' }}>
                                {data.item ? data.item.value : ''}
                            </Typography>
                            <TextField
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={4}
                                placeholder="Campo de Resposta Longa"
                                value={value}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </MainCard>
        </Fragment>
    );
};

TextFieldInput.propTypes = {
    data: PropTypes.object,
    onInputChange: PropTypes.func.isRequired
};

export default TextFieldInput;
