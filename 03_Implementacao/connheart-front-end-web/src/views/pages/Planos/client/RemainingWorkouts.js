import React from 'react';

const EstiloRetangulo = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: '600px',
    height: '265px',
    boxSizing: 'border-box',
    margin: '0 auto',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '15px',
    overflow: 'hidden'
};

const MetadeAzulClaro = {
    ...EstiloRetangulo,
    flex: '1',
    backgroundColor: '#00c3ff',
    color: '#ffffff',
    textAlign: 'center',
    borderRadius: '15px 0 0 15px'
};

const MetadeBranca = {
    ...EstiloRetangulo,
    flex: '1',
    backgroundColor: '#ffffff',
    color: '#000000',
    textAlign: 'left',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderLeft: '1px solid #00c3ff',
    borderRadius: '0 15px 15px 0'
};

const h2Style = {
    fontSize: '1.6em',
    textAlign: 'center',
    fontWeight: 'normal',
    marginBottom: '10px'
};

const pStyle = {
    fontSize: '5em',
    textAlign: 'center',
    fontWeight: 'normal',
    marginTop: '60px',
    marginBottom: '40px'
};

const textStyle = {
    fontSize: '1em',
    marginLeft: '2em',
    fontWeight: 'normal',
    marginBottom: '0.5em',
    textAlign: 'left'
};

const RemainingWorkouts = ({ remainingWorkouts }) => {
    return (
        <div style={EstiloRetangulo}>
            <div style={MetadeAzulClaro}>
                <div style={{ padding: '20px' }}>
                    <h2 style={h2Style}>TREINOS RESTANTES:</h2>
                    <p style={pStyle}>{remainingWorkouts}</p>
                </div>
            </div>
            <div style={MetadeBranca}>
                <p style={textStyle}>
                    <strong>ESTADO:</strong> ATIVO
                </p>
                <p style={textStyle}>
                    <strong>INÍCIO:</strong> 05/07/2024
                </p>
                <p style={textStyle}>
                    <strong>DATA FINAL PREVISTA:</strong> 24/09/2024
                </p>
                <p style={textStyle}>
                    <strong>DIAS RESTANTES:</strong> 82 DIAS
                </p>
            </div>
        </div>
    );
};

export default RemainingWorkouts;
