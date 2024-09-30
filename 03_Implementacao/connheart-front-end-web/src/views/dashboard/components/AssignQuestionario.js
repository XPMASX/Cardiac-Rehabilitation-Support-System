import React, { useState, useEffect } from 'react';
import EditButton from '../../../ui-component/extended/EditButton';
import { Grid, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import QuestionarioCardDashboard from './QuestionarioCardDashboard';

const AssignQuestionario = () => {
    const [questionarios, setQuestionarios] = useState([]);
    const [pacientes, setPacientes] = useState([]);
    const [selectedPaciente, setSelectedPaciente] = useState('');
    const [selectedQuestionario, setSelectedQuestionario] = useState(null); // Armazena o objeto completo do plano selecionado
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
                //console.log('PACIENTES!!!!!!!!!!!!!!', data);
            } catch (error) {
                console.error('Erro ao buscar pacientes:', error);
            }
        };
        fetchPacientes();

        const fetchQuestionarios = async () => {
            try {
                const response = await fetch('http://localhost:8000/questionarios');
                if (!response.ok) {
                    throw new Error('Falha ao buscar questionarios');
                }
                const data = await response.json();
                setQuestionarios(data);
            } catch (error) {
                console.error('Erro ao buscar questionarios:', error);
            }
        };
        fetchQuestionarios();
    }, []);

    const countTreinos = (questionario) => {
        try {
            const parsedData = JSON.parse(questionario.DadosQuests);
            return parsedData.length;
        } catch (error) {
            console.error('Erro ao analisar DadosQuestionario:', error);
            return 0;
        }
    };

    const handleAssignQuestionario = async () => {
        if (!selectedPaciente || !selectedQuestionario) {
            alert('Por favor, selecione um paciente e um questionario');
            return;
        }

        try {
            const data = {
                numUtenteSaude: selectedPaciente,
                dadosPlano: selectedQuestionario.id
            };
            console.log('Data being sent:', data);

            const response = await fetch(`http://localhost:8000/atrbuir-questionario/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            console.log('Server response:', response);

            if (!response.ok) {
                throw new Error('Falha ao atribuir questionario');
            }

            alert('Questionario atribuído com sucesso');
        } catch (error) {
            console.error('Erro ao atribuir questionario:', error);
            alert('Falha ao atribuir questionario');
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid container item xs={12} spacing={3}>
                <Grid item xs={2.4}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel id="paciente-select-label">Selecione Paciente</InputLabel>
                        <Select
                            labelId="paciente-select-label"
                            label="Selecione Paciente"
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
            {questionarios
                .filter((questionario) => questionario.Active !== 0)
                .map((questionario) => (
                    <Grid key={questionario.id} item lg={4} md={6} sm={6} xs={12}>
                        <QuestionarioCardDashboard isLoading={false} questionnaire={questionario} onClick={null} />
                        <Grid item sx={{ marginTop: '10px' }}>
                            <EditButton
                                name={selectedQuestionario === questionario ? 'QUESTIONÁRIO SELECIONADO' : 'Selecionar Questionário'}
                                variant="contained"
                                onViewClick={() => setSelectedQuestionario(questionario)}
                            ></EditButton>
                        </Grid>
                    </Grid>
                ))}
            <Grid item xs={12}>
                <Grid container justifyContent="flex-end" spacing={2}>
                    <Grid item>
                        <EditButton
                            sx={{ mt: 2 }}
                            name="Atribuir Questionário"
                            variant="contained"
                            color="primary"
                            onViewClick={handleAssignQuestionario}
                        ></EditButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AssignQuestionario;
