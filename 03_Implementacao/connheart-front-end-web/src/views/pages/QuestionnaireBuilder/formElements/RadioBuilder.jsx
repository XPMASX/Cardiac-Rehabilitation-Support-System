import React, { Component, Fragment } from 'react';
import MainCard from '../../../../ui-component/cards/MainCard';
import { TextField, Box, Grid, FormControl, InputLabel, Select, MenuItem, Button, IconButton, Tooltip, Radio } from '@mui/material';
import { DeleteOutlineOutlined as DeleteOutlineOutlinedIcon } from '@mui/icons-material';
import { formEl } from '../constants';
import QuestionActions from './QuestionActions';
import * as PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';

const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 11);
};

class RadioBuilder extends Component {
    // Function to handle option change
    handleOptionChange = (itemId, optionId) => {
        const updatedOptions = this.props.item.options.map((opt) => ({
            ...opt,
            checked: opt.id === optionId // Set checked to true for the selected option, false for others
        }));
        this.props.handleOptionValues(itemId, updatedOptions);
    };

    render() {
        let {
            item,
            questionNumber, //  questionNumber in form
            handleValue,
            deleteEl,
            handleRequired,
            handleElType,
            addOption,
            handleOptionValues,
            deleteOption,
            duplicateElement
        } = this.props;

        // Function to create a new option for the radio input
        const createNewOption = (id) => {
            // Generate a unique ID for the new option
            const data = {
                id: generateUniqueId(),
                value: '',
                checked: false // Set the checked property initially to false
            };
            // Add the new option to the radio input
            addOption(id, data);
        };

        // Function to render the options of the radio input
        const renderOptions = () => {
            // Initialize options as an empty array if it's undefined
            const options = item.options || [];
            return options.map((opt, key) => (
                <Box sx={{ display: 'flex' }} key={opt.id}>
                    <Radio checked={opt.checked} onChange={() => this.handleOptionChange(item.id, opt.id)} sx={{ mb: 1 }} />
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder={`Adicione uma Resposta`} //${key + 1}`}
                        defaultValue={opt?.value}
                        onBlur={(e) => handleOptionValues(item?.id, opt?.id, e.target.value)}
                        required={item.required}
                        sx={{ mb: 1 }}
                    />
                    <Tooltip title="Apagar Alinea" aria-label="delete-option">
                        <IconButton aria-label="delete-option" onClick={() => deleteOption(item.id, opt?.id)} sx={{ ml: 2 }}>
                            <DeleteOutlineOutlinedIcon color="secondary" />
                        </IconButton>
                    </Tooltip>
                </Box>
            ));
        };

        return (
            <Fragment>
                <MainCard title={questionNumber ? `Questão ${questionNumber}` : null} sx={{ mb: 2 }}>
                    <Box sx={{ p: 3 }}>
                        <Grid container spacing={1}>
                            <Grid item xs={9}>
                                {/* Text field for the radio label */}
                                <TextField
                                    defaultValue={item.value}
                                    variant="outlined"
                                    onBlur={(e) => handleValue(item.id, e)}
                                    fullWidth
                                    required={item.required}
                                    placeholder="Introduza a Questão"
                                    sx={{ mb: 2 }}
                                />
                                {/* Render the options of the radio input */}
                                {renderOptions()}
                                {/* Button to add a new option */}
                                <Button variant="text" onClick={() => createNewOption(item.id)}>
                                    Adicione uma Alinea
                                </Button>
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
                                        {/* Render the options for selecting the type of the element */}
                                        {formEl.map((el, key) => (
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

RadioBuilder.propTypes = {
    item: PropTypes.any,
    questionNumber: PropTypes.any,
    handleValue: PropTypes.any,
    deleteEl: PropTypes.any,
    handleRequired: PropTypes.any,
    handleElType: PropTypes.any,
    addOption: PropTypes.any,
    handleOptionValues: PropTypes.any,
    deleteOption: PropTypes.any,
    duplicateElement: PropTypes.any
};

export default RadioBuilder;
