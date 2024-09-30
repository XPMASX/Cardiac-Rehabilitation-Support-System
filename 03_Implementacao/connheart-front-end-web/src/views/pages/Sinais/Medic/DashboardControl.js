import Grid from '@mui/material/Grid';
import SelectableCard from '../../../dashboard/components/SelectableCard';
import { useState } from 'react';

function DashboardControl({ onSelectionChange }) {
    const [selected, setSelected] = useState(0);
    const disabledIndices = [1, 4];

    const handleClick = (index) => {
        setSelected(index);
        onSelectionChange(index); // Call the callback with the new index
    };

    const cardTexts = ['DASHBOARD', 'DADOS MÉDICOS', 'VER/AJUSTAR PLANO', 'ENVIAR QUESTIONÁRIO', 'ENVIAR MENSAGEM'];

    return (
        <Grid container spacing={2} sx={{ height: '100%' }} justifyContent={{ xs: 'center', sm: 'center' }}>
            {cardTexts.map((text, index) => (
                <Grid item xs={6} sm={4} md={2.4} key={index}>
                    <SelectableCard
                        isLoading={false}
                        text={text}
                        selected={selected === index}
                        onClick={() => handleClick(index)}
                        disabled={disabledIndices.includes(index)}
                    />
                </Grid>
            ))}
        </Grid>
    );
}

export default DashboardControl;

import PropTypes from 'prop-types';

DashboardControl.propTypes = {
    onSelectionChange: PropTypes.func.isRequired
};
