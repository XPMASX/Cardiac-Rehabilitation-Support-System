import { Component, Fragment } from 'react';
//Material UI Components
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// project imports
import { formEl } from '../constants';
import MainCard from '../../../../ui-component/cards/MainCard';
import QuestionActions from './QuestionActions';
import * as PropTypes from 'prop-types';

class TextAreaBuilder extends Component {
    render() {
        let { item, questionNumber, handleValue, deleteEl, handleRequired, handleElType, duplicateElement } = this.props;
        return (
            <Fragment>
                <MainCard title={questionNumber ? `Questão ${questionNumber}` : null} sx={{ mb: 2 }}>
                    <Box sx={{ p: 3 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={9}>
                                <TextField
                                    defaultValue={item.value}
                                    variant="outlined"
                                    onBlur={(e) => handleValue(item.id, e)}
                                    fullWidth
                                    multiline
                                    required={item.required}
                                    placeholder="Introduza a Questão"
                                    sx={{ mb: 2 }}
                                />
                                <TextField variant="outlined" fullWidth placeholder="Campo de Resposta Longa" disabled multiline rows={3} />
                            </Grid>
                            <Grid item xs={3}>
                                <FormControl fullWidth>
                                    <InputLabel id="el-type-label">Tipo</InputLabel>
                                    <Select
                                        labelId="el-type-label"
                                        id="el-type"
                                        label="Type"
                                        value={item.type}
                                        onChange={(e) => handleElType(item.id, e.target.value)}
                                    >
                                        {formEl &&
                                            formEl.map((el, key) => (
                                                <MenuItem key={key} value={el.value}>
                                                    {el.label}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                    </Box>
                    <Divider />
                    <QuestionActions item={item} deleteEl={deleteEl} duplicateElement={duplicateElement} handleRequired={handleRequired} />
                </MainCard>
            </Fragment>
        );
    }
}

TextAreaBuilder.propTypes = {
    item: PropTypes.any,
    questionNumber: PropTypes.any,
    handleValue: PropTypes.any,
    deleteEl: PropTypes.any,
    handleRequired: PropTypes.any,
    handleElType: PropTypes.any,
    duplicateElement: PropTypes.any
};

export default TextAreaBuilder;
