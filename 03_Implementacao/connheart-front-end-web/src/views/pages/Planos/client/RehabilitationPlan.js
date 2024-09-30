import React, { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

const ProgressBar = ({ width }) => {
    const progressStyle = {
        width: `${width}%`,
        height: '20px',
        backgroundColor: 'white',
        borderRadius: '20px',
        position: 'relative'
    };

    return (
        <Box sx={{ border: '1px solid white', width: '100%', height: '20px', borderRadius: '20px', overflow: 'hidden' }}>
            <div style={progressStyle}></div>
        </Box>
    );
};

const RehabilitationPlan = ({ progress }) => {
    const theme = useTheme();

    const containerStyle = {
        backgroundColor: theme.palette.primary.dark,
        color: 'white',
        padding: '52px',
        height: 'auto',
        maxWidth: '800px',
        boxSizing: 'border-box',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
        textAlign: 'center',
        borderRadius: '15px'
    };

    const headingStyle = {
        fontSize: '2em',
        textAlign: 'center',
        fontWeight: 'normal',
        marginBottom: '10px'
    };

    const progressTextStyle = {
        fontSize: '5em',
        textAlign: 'center',
        fontWeight: 'normal',
        marginTop: '40px',
        marginBottom: '40px'
    };

    return (
        <div style={containerStyle}>
            <h2 style={headingStyle}>PLANO DE REABILITAÇÃO</h2>
            <p style={progressTextStyle}>{progress.toFixed(1)}%</p>
            <ProgressBar width={progress} />
        </div>
    );
};

export default RehabilitationPlan;
