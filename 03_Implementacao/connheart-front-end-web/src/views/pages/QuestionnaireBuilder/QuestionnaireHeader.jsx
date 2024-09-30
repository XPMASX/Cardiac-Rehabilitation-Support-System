import React, { Fragment } from 'react';
import TextField from '@mui/material/TextField';
import { Grid } from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import { Box } from '@mui/system';

const QuestionnaireHeader = ({ title, setTitle, description, setDescription }) => {
    return (
        <Fragment>
            <MainCard title={'Questionário'}>
                <Box sx={{ p: 3 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={9}>
                            <TextField
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                variant="outlined"
                                placeholder="Titulo do Questionário"
                                name="title"
                                fullWidth
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                name="description"
                                defaultValue={description}
                                onBlur={(e) => setDescription(e.target.value)}
                                variant="outlined"
                                placeholder="Descrição do Questionário"
                                fullWidth
                                multiline
                                InputProps={{
                                    sx: { height: 'auto' } // Set height to 'auto'
                                }}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </MainCard>
        </Fragment>
    );
};

export default QuestionnaireHeader;
