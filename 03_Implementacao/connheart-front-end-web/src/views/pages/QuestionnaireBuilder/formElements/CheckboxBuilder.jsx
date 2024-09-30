import { Component, Fragment } from 'react';
import MainCard from '../../../../ui-component/cards/MainCard';

import { TextField, Box, Grid, FormControl, InputLabel, Select, MenuItem, Button, IconButton, Tooltip, Checkbox } from '@mui/material';
import { DeleteOutlineOutlined as DeleteOutlineOutlinedIcon } from '@mui/icons-material';

import QuestionActions from './QuestionActions';
import * as PropTypes from 'prop-types';
import Divider from '@mui/material/Divider';
import { formEl } from '../constants';

const generateUniqueId = () => {
    return Math.random().toString(36).substring(2, 11);
};

class CheckboxBuilder extends Component {
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
        // Function to create a new option for the checkbox input
        const createNewOption = (id) => {
            // Generate a unique ID for the new option
            const data = {
                id: generateUniqueId(),
                value: ''
            };
            // Add the new option to the checkbox input
            addOption(id, data);
        };

        // Function to render the options of the checkbox input
        const renderOptions = () => {
            // Initialize options as an empty array if it's undefined
            const options = item.options || [];
            return options.map((opt, key) => (
                <Box sx={{ display: 'flex' }} key={opt.id}>
                    <Checkbox
                        checked={opt.checked}
                        onChange={(e) => handleOptionValues(item?.id, opt?.id, e.target.checked)}
                        sx={{ mb: 1 }}
                    />
                    <TextField
                        variant="outlined"
                        fullWidth
                        placeholder={`Adicione uma Resposta`} //${key + 1}`}
                        defaultValue={opt?.value}
                        onBlur={(e) => handleOptionValues(item?.id, opt?.id, e.target.value)}
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
                                <TextField
                                    defaultValue={item.value}
                                    variant="outlined"
                                    onBlur={(e) => handleValue(item.id, e)}
                                    fullWidth
                                    required={item.required}
                                    placeholder="Introduza a Questão"
                                    sx={{ mb: 2 }}
                                />
                                {/* Render the options of the checkbox input */}
                                {renderOptions()}
                                {/* Button to add a new option */}
                                <Button variant="text" onClick={() => createNewOption(item.id)}>
                                    Adicione uma Alinea
                                </Button>
                            </Grid>
                            <Grid item xs={3}>
                                {/* Dropdown to select the type of the element */}
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
                                            <MenuItem key={el.id + key} value={el.value}>
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

CheckboxBuilder.propTypes = {
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

export default CheckboxBuilder;
