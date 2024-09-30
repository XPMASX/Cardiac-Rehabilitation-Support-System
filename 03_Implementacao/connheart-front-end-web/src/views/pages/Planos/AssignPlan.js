import React, { useState, useEffect } from 'react';
import PlanosCard from './PlanosCard';
import EditButton from '../../../ui-component/extended/EditButton';
import { Grid, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const AssignPlan = () => {
    const [planos, setPlanos] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [selectedPaciente, setSelectedPaciente] = useState('');
    const [selectedPlano, setSelectedPlano] = useState(null);
    let number = 1;

    useEffect(() => {
        const fetchPacientes = async () => {
            try {
                const response = await fetch('http://localhost:8000/pacientes');
                if (!response.ok) {
                    throw new Error('Falha ao buscar pacientes');
                }
                const data = await response.json();
                setPacientes(data);
            } catch (error) {
                console.error('Erro ao buscar pacientes:', error);
            }
        };
        fetchPacientes();

        const fetchPlanos = async () => {
            try {
                const response = await fetch('http://localhost:8000/planos?active=true');
                if (!response.ok) {
                    throw new Error('Falha ao buscar planos');
                }
                const data = await response.json();
                setPlanos(data);
            } catch (error) {
                console.error('Erro ao buscar planos:', error);
            }
        };
        fetchPlanos();
    }, []);

    const countTreinos = (plano) => {
        try {
            const parsedData = JSON.parse(plano.DadosPlano);
            return parsedData.length;
        } catch (error) {
            console.error('Erro ao analisar DadosPlano:', error);
            return 0;
        }
    };

    const handleAssignPlan = async () => {
        if (!selectedPaciente || !selectedPlano) {
            alert('Por favor, selecione um paciente e um plano');
            return;
        }

        try {
            const data = {
                numUtenteSaude: selectedPaciente,
                dadosPlano: selectedPlano.DadosPlano
            };
            console.log('Data being sent:', data);

            const response = await fetch(`http://localhost:8000/assign-plan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            console.log('Server response:', response);

            if (!response.ok) {
                throw new Error('Falha ao atribuir plano');
            }

            alert('Plano atribuído com sucesso');
        } catch (error) {
            console.error('Erro ao atribuir plano:', error);
            alert('Falha ao atribuir plano');
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Grid item xs={2.4}>
                    <FormControl fullWidth>
                        <InputLabel id="paciente-select-label">Selecione Paciente</InputLabel>
                        <Select
                            labelId="paciente-select-label"
                            value={selectedPaciente}
                            onChange={(e) => setSelectedPaciente(e.target.value)}
                        >
                            {pacientes.map((paciente) => {
                                const [nome] = paciente.DadosPessoais.split(',');
                                return (
                                    <MenuItem key={paciente.NumUtenteSaude} value={paciente.NumUtenteSaude}>
                                        {nome} ({paciente.NumUtenteSaude})
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            {planos
                .filter((plano) => plano.Active !== 0)
                .map((plano) => (
                    <Grid key={plano.idPlano} item lg={4} md={6} sm={6} xs={12}>
                        <PlanosCard planName={`Plano Regenerativo ${number++}`} pacientType={`Número de Treinos: ${countTreinos(plano)}`} />
                        <Grid item sx={{ marginTop: '10px' }}>
                            <EditButton
                                name={selectedPlano === plano ? 'PLANO SELECIONADO' : 'Selecionar Plano'}
                                variant="contained"
                                onViewClick={() => setSelectedPlano(plano)}
                            ></EditButton>
                        </Grid>
                    </Grid>
                ))}
            <Grid item xs={12}>
                <Grid container justifyContent="flex-end" spacing={2}>
                    <Grid item>
                        <EditButton name="Atribuir Plano" variant="contained" color="primary" onViewClick={handleAssignPlan}></EditButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AssignPlan;
