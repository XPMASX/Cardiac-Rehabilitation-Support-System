import React from 'react';
import { IconButton, Switch, Tooltip, FormGroup, Grid, Divider } from '@mui/material';
import { DeleteOutlineOutlined as DeleteOutlineOutlinedIcon, FileCopy as FileCopyIcon } from '@mui/icons-material';
import * as PropTypes from 'prop-types';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

class QuestionActions extends React.Component {
    handleDragStart = (e) => {
        // Prevent default behavior to allow dragging
        e.preventDefault();
    };

    handleDragOver = (e) => {
        // Prevent default behavior to allow dropping
        e.preventDefault();
    };
    render() {
        const { item, deleteEl, duplicateElement, handleRequired } = this.props;
        return (
            <FormGroup row>
                <Grid container alignItems="center" justifyContent="left">
                    <Grid item>
                        <label htmlFor={`required-switch-${item.id}`}>Resposta Obrigatória</label>
                        <Switch
                            id={`required-switch-${item.id}`}
                            checked={item.required}
                            onChange={() => handleRequired(item.id)}
                            name="required-field"
                            color="secondary"
                            sx={{ ml: 2 }}
                        />
                    </Grid>
                    <Grid item>
                        <Tooltip title="Duplicar Pergunta" aria-label="duplicate-element">
                            <IconButton aria-label="duplicate-element" onClick={() => duplicateElement(item, item.type)} sx={{ ml: 2 }}>
                                <FileCopyIcon color="primary" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Apagar Pergunta" aria-label="delete-element">
                            <IconButton aria-label="delete-element" onClick={() => deleteEl(item.id)} sx={{ ml: 2 }} size={'large'}>
                                <DeleteOutlineOutlinedIcon color="error" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
                <Grid container alignItems="center" justifyContent="center">
                    <Grid item>
                        <DragIndicatorIcon
                            sx={{ transform: 'rotate(-90deg)', cursor: 'grab', fontSize: 32 }}
                            draggable="true" // Add draggable attribute
                            onDragStart={this.handleDragStart} // Handle drag start event
                            onDragOver={this.handleDragOver} // Handle drag over event
                        />
                    </Grid>
                </Grid>
                <Divider />
            </FormGroup>
        );
    }
}

QuestionActions.propTypes = {
    item: PropTypes.any,
    deleteEl: PropTypes.any,
    duplicateElement: PropTypes.any,
    handleRequired: PropTypes.any
};

export default QuestionActions;
