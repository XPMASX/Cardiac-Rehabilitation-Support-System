import React, { Fragment, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Nestable from 'react-nestable';
import 'react-nestable/dist/styles/index.css';

// Material UI Components
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Tooltip from '@mui/material/Tooltip';

// Form Elements (assuming these are separate components)
import { CheckboxBuilder, ScaleBuilder, RadioBuilder, TextAreaBuilder, TextFieldBuilder } from './formElements';

import { formEl } from './constants.js';
import { Divider, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const QuestionnaireBuilder = ({
    title,
    description,
    db_data,
    selectedQuestionnaireId,
    setSelectedQuestionnaireId,
    togglePreviewMode,
    previewMode
}) => {
    const initVal = formEl[0]?.value; // Initial form element type

    // States
    const [data, setData] = useState([]); // Array to store form elements

    useEffect(() => {
        if (db_data) {
            setData(db_data);
        }
    }, [db_data]); // Only re-run when db_data changes

    // Type of question being added
    const [formData, setFormData] = useState(initVal); // Current question type

    // Contains the Form Data (questions)
    const items = data; // Array of form elements for rendering

    // Function to generate a new UUID
    const generateUUID = () => {
        return uuidv4();
    };

    // Function to export form data
    const exportFormData = () => {
        const formData = {
            title: title,
            description: description,
            data: data
        };

        // If questionnaire is selected, update the existing questionnaire
        // Otherwise, create a new questionnaire
        const url = selectedQuestionnaireId
            ? `http://localhost:8000/questionarios/${selectedQuestionnaireId}`
            : `http://localhost:8000/questionarios/${generateUUID()}`;

        // If questionnaire is selected, use PUT method to update the existing questionnaire
        // Otherwise, use POST method to create a new questionnaire
        const method = selectedQuestionnaireId ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((response) => {
                if (response.ok) {
                    console.log('Form data saved successfully');
                    setSelectedQuestionnaireId(null);
                    //window.location.reload(); // Refresh the page
                    window.scrollTo(0, 0); // scroll to top
                } else {
                    console.error('Failed to save form data');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    // Function to add a new form element to the data array
    const addElement = () => {
        const newElement = {
            id: uuidv4(),
            value: null,
            type: formData, // Use the current question type
            required: false,
            // Add scaleType and radioCount for scale elements
            ...(formData === 'scale' && { scaleType: 'text', radioCount: 5 })
        };
        setData((prevState) => [...prevState, newElement]);
        setFormData(initVal); // Reset the question type for the next element
    };

    // Function to delete an element
    const deleteEl = (id) => {
        setData((prevState) => prevState.filter((val) => val.id !== id));
    };

    // Function to add an element at a specific position and return the updated array
    const addAfter = (elArray, index, newEl) => {
        return [...elArray.slice(0, index + 1), newEl, ...elArray.slice(index + 1)];
    };

    // Function to duplicate an element
    const duplicateElement = (element, elType) => {
        const elIdx = data.findIndex((el) => el.id === element.id);
        const newEl = {
            id: uuidv4(),
            value: element.value,
            type: elType,
            required: false,
            options: element?.options
        };
        const newArr = addAfter(data, elIdx, newEl);
        setData(newArr);
    };

    // Function to handle sorting of form elements
    const handleOnChangeSort = ({ items }) => {
        setData(items); // Update the data state with the new order
    };

    //Function to Handle Input Values
    const handleValue = (id, e) => {
        let newArr = data.map((el) => {
            if (el.id === id) {
                return { ...el, value: e.target.value };
            } else {
                return el;
            }
        });
        setData(newArr);
    };

    //Function to Handle Required
    const handleRequired = (id) => {
        let newArr = data.map((el) => {
            if (el.id == id) {
                return { ...el, required: !el.required };
            } else {
                return el;
            }
        });
        setData(newArr);
    };

    //Function to Handle Element Type
    const handleElType = (id, type) => {
        let newArr = data.map((el) => {
            if (el.id == id) {
                return {
                    ...el,
                    type: type,
                    ...(type === 'scale' && { scaleType: el.scaleType || 'text', radioCount: el.radioCount || 5 })
                };
            } else {
                return el;
            }
        });
        setData(newArr);
    };

    //Function to Handle Options
    const addOption = (id, newOption) => {
        let newArr = data.map((el) => {
            if (el.id == id) {
                const objVal = 'options' in el ? el?.options : [];
                return { ...el, options: [...objVal, newOption] };
            } else {
                return el;
            }
        });
        setData(newArr);
    };

    //Function to Change Option Values
    const handleOptionValues = (elId, optionId, optionVal) => {
        let newArr = data.map((el) => {
            if (el.id == elId) {
                el?.options &&
                    el?.options.map((opt) => {
                        if (opt.id == optionId) {
                            opt.value = optionVal;
                        }
                    });
                return el;
            } else {
                return el;
            }
        });
        setData(newArr);
    };

    //Function to Delete Option
    const deleteOption = (elId, optionId) => {
        let newArr = data.map((el) => {
            if (el.id == elId) {
                let newOptions = el?.options && el?.options.filter((opt) => opt.id != optionId);
                return { ...el, options: newOptions };
            } else {
                return el;
            }
        });
        setData(newArr);
    };

    //Render items according to their type of question
    const renderElements = ({ item, index }) => {
        switch (item.type) {
            case 'text':
                return (
                    <TextFieldBuilder
                        item={item}
                        questionNumber={index + 1}
                        handleValue={handleValue}
                        deleteEl={deleteEl}
                        handleRequired={handleRequired}
                        handleElType={handleElType}
                        duplicateElement={duplicateElement}
                    />
                );
            case 'textarea':
                return (
                    <TextAreaBuilder
                        item={item}
                        questionNumber={index + 1}
                        handleValue={handleValue}
                        deleteEl={deleteEl}
                        handleRequired={handleRequired}
                        handleElType={handleElType}
                        duplicateElement={duplicateElement}
                    />
                );
            case 'radio':
                return (
                    <RadioBuilder
                        item={item}
                        questionNumber={index + 1}
                        handleValue={handleValue}
                        deleteEl={deleteEl}
                        handleRequired={handleRequired}
                        handleElType={handleElType}
                        addOption={addOption}
                        handleOptionValues={handleOptionValues}
                        deleteOption={deleteOption}
                        duplicateElement={duplicateElement}
                    />
                );
            case 'checkbox':
                return (
                    <CheckboxBuilder
                        item={item}
                        questionNumber={index + 1}
                        handleValue={handleValue}
                        deleteEl={deleteEl}
                        handleRequired={handleRequired}
                        handleElType={handleElType}
                        addOption={addOption}
                        handleOptionValues={handleOptionValues}
                        deleteOption={deleteOption}
                        duplicateElement={duplicateElement}
                    />
                );

            case 'scale':
                return (
                    <ScaleBuilder
                        item={item}
                        questionNumber={index + 1}
                        handleValue={handleValue}
                        deleteEl={deleteEl}
                        handleRequired={handleRequired}
                        handleElType={handleElType}
                        addOption={addOption}
                        handleOptionValues={handleOptionValues}
                        deleteOption={deleteOption}
                        duplicateElement={duplicateElement}
                        data={data} // Pass data
                        setData={setData} // Pass setData
                    />
                );
        }
    };

    //console.log('forms data: ', data);

    return (
        <Fragment>
            <Grid container spacing={2} direction="column">
                <Grid item xs={12}>
                    <Nestable
                        items={items}
                        renderItem={renderElements}
                        maxDepth={1}
                        onChange={handleOnChangeSort}
                        renderCollapseIcon={() => <Typography>-</Typography>}
                        renderExpandIcon={() => <Typography>+</Typography>}
                    />
                </Grid>
                <Grid container direction="row" justifyContent="space-around" alignItems="center" paddingBottom={'15px'}>
                    <Tooltip title="Adicionar Questão" aria-label="add-element">
                        <Button variant="outlined" aria-label="add-element" onClick={addElement}>
                            Adicionar Questão {/*<AddCircleOutlineOutlinedIcon color="secondary" />*/}
                        </Button>
                    </Tooltip>
                </Grid>
                <Divider />
                <Grid container direction="row" justifyContent="space-between" alignItems="center" padding={'15px'}>
                    <Tooltip title={previewMode ? 'Editar' : 'Visualizar'} aria-label="preview-form">
                        <Button variant="outlined" onClick={togglePreviewMode}>
                            {previewMode ? 'Voltar a Editar' : 'Pré-Visualizar Questionário'}
                        </Button>
                    </Tooltip>
                    <Tooltip title="Exportar JSON" aria-label="export-form">
                        <Button variant="outlined" onClick={exportFormData}>
                            Exportar Questionário
                        </Button>
                    </Tooltip>
                </Grid>
            </Grid>
        </Fragment>
    );
};
export default QuestionnaireBuilder;

//PropTypes help to validate the props that a component should receive.
QuestionnaireBuilder.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    db_data: PropTypes.array.isRequired,
    selectedQuestionnaireId: PropTypes.string,
    setSelectedQuestionnaireId: PropTypes.func.isRequired,
    togglePreviewMode: PropTypes.func.isRequired
};
