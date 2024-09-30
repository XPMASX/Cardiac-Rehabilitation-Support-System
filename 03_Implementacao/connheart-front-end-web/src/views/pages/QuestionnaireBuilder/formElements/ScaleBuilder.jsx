import React, { Fragment, useState, useEffect } from 'react';
import {
    Box,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Divider
} from '@mui/material';
import MainCard from '../../../../ui-component/cards/MainCard';
import QuestionActions from './QuestionActions';
import PropTypes from 'prop-types';
import { formEl } from '../constants';

const generateUniqueId = () => Math.random().toString(36).substring(2, 11);

const ScaleBuilder = ({
    item,
    questionNumber,
    handleValue,
    deleteEl,
    handleRequired,
    handleElType,
    addOption,
    handleOptionValues,
    deleteOption,
    duplicateElement,
    data,
    setData
}) => {
    const [radioCount, setRadioCount] = useState(item.radioCount || 5);
    const [scaleType, setScaleType] = useState(item.scaleType || 'text');

    const handleItemUpdate = (id, updates) => {
        const newArr = data.map((el) => (el.id === id ? { ...el, ...updates } : el));
        setData(newArr);
    };

    useEffect(() => {
        if (item.options?.length !== radioCount) {
            const defaultLabels = Array.from({ length: radioCount }, (_, index) => {
                const { isFirst, isMiddle, isLast } = getPosition(index, radioCount);
                return {
                    id: generateUniqueId(),
                    label:
                        item.options?.[index]?.label ||
                        (isFirst ? 'Discordo Totalmente' : isMiddle ? 'Neutro' : isLast ? 'Concordo Totalmente' : ''),
                    value: item.options?.[index]?.value || index
                };
            });
            handleItemUpdate(item.id, { options: defaultLabels });
        }
    }, [radioCount, item.options, item.id]);

    const getPosition = (index, radioCount) => {
        const isFirst = index === 0;
        const isMiddle = index === Math.floor(radioCount / 2);
        const isLast = index === radioCount - 1;

        return { isFirst, isMiddle, isLast };
    };

    const handleScaleTypeChange = (e) => {
        const newScaleType = e.target.value;
        setScaleType(newScaleType);
        handleItemUpdate(item.id, { scaleType: newScaleType });
    };

    const handleRadioCountChange = (e) => {
        const newRadioCount = Number(e.target.value);
        setRadioCount(newRadioCount);
        const defaultLabels = Array.from({ length: newRadioCount }, (_, index) => {
            const { isFirst, isMiddle, isLast } = getPosition(index, newRadioCount);
            return {
                id: generateUniqueId(),
                label:
                    item.options?.[index]?.label ||
                    (isFirst ? 'Discordo Totalmente' : isMiddle ? 'Neutro' : isLast ? 'Concordo Totalmente' : ''),
                value: item.options?.[index]?.value || index
            };
        });
        handleItemUpdate(item.id, { radioCount: newRadioCount, options: defaultLabels });
    };

    const handleOptionLabelChange = (index, value) => {
        const updatedOptions = [...(item.options || [])];
        if (!updatedOptions[index]) {
            updatedOptions[index] = { id: generateUniqueId(), value: index, label: value };
        } else {
            updatedOptions[index].label = value;
        }
        handleItemUpdate(item.id, { options: updatedOptions });
    };

    const renderOptions = () => {
        if (scaleType === 'numbers') {
            return (
                <RadioGroup
                    row
                    aria-labelledby="escala-num-label"
                    name="grupo-escala-num"
                    sx={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px' }}
                >
                    {Array.from({ length: radioCount }, (_, i) => (
                        <FormControlLabel
                            key={i}
                            value={i}
                            control={<Radio sx={{ padding: '4px' }} />}
                            label={i.toString()}
                            labelPlacement="top"
                            sx={{ margin: '0 4px', fontSize: '0.75rem' }}
                        />
                    ))}
                </RadioGroup>
            );
        } else {
            return (
                <RadioGroup
                    aria-labelledby="escala-likert-label"
                    name="grupo-escala-likert"
                    sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingBottom: '8px' }}
                >
                    {Array.from({ length: radioCount }, (_, index) => {
                        const { isFirst, isMiddle, isLast } = getPosition(index, radioCount);
                        const defaultLabel = isFirst ? 'Discordo Totalmente' : isMiddle ? 'Neutro' : isLast ? 'Concordo Totalmente' : '';
                        const optionLabel = item.options?.[index]?.label || defaultLabel;

                        return (
                            <FormControlLabel
                                key={index}
                                value={index}
                                control={<Radio sx={{ padding: '4px' }} />}
                                label={
                                    <TextField
                                        value={optionLabel}
                                        onChange={(e) => handleOptionLabelChange(index, e.target.value)}
                                        variant="outlined"
                                        fullWidth
                                        placeholder=""
                                        sx={{
                                            mb: 2,
                                            width: '150px',
                                            '& .MuiInputBase-input': {
                                                textAlign: 'center',
                                                fontSize: '0.75rem',
                                                padding: '4px'
                                            }
                                        }}
                                        onFocus={(e) => e.target.select()}
                                    />
                                }
                                labelPlacement="end"
                                sx={{ margin: '4px 0' }}
                            />
                        );
                    })}
                </RadioGroup>
            );
        }
    };

    const handleSubmit = () => {
        const formData = data.map((item) => ({
            ...item,
            options: item.options?.map((option) => ({ id: option.id, label: option.label, value: option.value })) || []
        }));
        console.log(JSON.stringify(formData, null, 2)); // Exporting JSON data
    };

    return (
        <Fragment>
            <MainCard title={questionNumber ? `Questão ${questionNumber}` : null} sx={{ mb: 2 }}>
                <Box sx={{ p: 2 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={9}>
                            <TextField
                                defaultValue={item.value}
                                variant="outlined"
                                onBlur={(e) => handleValue(item.id, e)}
                                fullWidth
                                multiline
                                placeholder="Introduza a Questão"
                                sx={{ mb: 1, '& .MuiInputBase-input': { fontSize: '0.875rem' } }}
                            />
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
                                    sx={{ fontSize: '0.875rem' }}
                                >
                                    {formEl.map((el, key) => (
                                        <MenuItem key={key} value={el.value} sx={{ fontSize: '0.875rem' }}>
                                            {el.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={9}></Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel id="radio-count-label">Dimensão da Escala</InputLabel>
                                <Select
                                    labelId="radio-count-label"
                                    id="radio-count"
                                    value={radioCount}
                                    onChange={handleRadioCountChange}
                                    label="Dimensão da Escala"
                                    sx={{ fontSize: '0.875rem' }}
                                >
                                    {[5, 6, 7, 8, 9, 10, 11].map((number) => (
                                        <MenuItem key={number} value={number} sx={{ fontSize: '0.875rem' }}>
                                            {number}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={9}>
                            <FormControl fullWidth hiddenLabel>
                                <Box display="flex" justifyContent="center" mt={-7}>
                                    {renderOptions()}
                                </Box>
                            </FormControl>
                        </Grid>
                        <Grid item xs={3}>
                            <FormControl fullWidth>
                                <InputLabel id="scale-type-label">Tipo de Escala</InputLabel>
                                <Select
                                    labelId="scale-type-label"
                                    id="scale-type"
                                    value={scaleType}
                                    onChange={handleScaleTypeChange}
                                    label="Tipo de Escala"
                                    sx={{ fontSize: '0.875rem' }}
                                >
                                    <MenuItem value="text" sx={{ fontSize: '0.875rem' }}>
                                        Textual
                                    </MenuItem>
                                    <MenuItem value="numbers" sx={{ fontSize: '0.875rem' }}>
                                        Numérica
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Divider sx={{ pt: 1 }} />
                    <QuestionActions
                        item={item}
                        deleteEl={deleteEl}
                        duplicateElement={duplicateElement}
                        handleRequired={handleRequired}
                        handleSubmit={handleSubmit}
                    />
                </Box>
            </MainCard>
        </Fragment>
    );
};

ScaleBuilder.propTypes = {
    item: PropTypes.object.isRequired,
    questionNumber: PropTypes.number,
    handleValue: PropTypes.func.isRequired,
    deleteEl: PropTypes.func.isRequired,
    handleRequired: PropTypes.func.isRequired,
    handleElType: PropTypes.func.isRequired,
    addOption: PropTypes.func.isRequired,
    handleOptionValues: PropTypes.func.isRequired,
    deleteOption: PropTypes.func.isRequired,
    duplicateElement: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    setData: PropTypes.func.isRequired
};

export default ScaleBuilder;
