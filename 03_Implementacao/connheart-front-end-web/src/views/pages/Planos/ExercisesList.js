import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
    Typography,
    Checkbox,
    FormControlLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Divider
} from '@mui/material';

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
    marginTop: theme.spacing(2)
}));

const TitleWrapper = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.primary.dark,
    padding: '20px',
    marginBottom: '20px'
}));

const Title = styled(Typography)({
    color: 'white'
});

const TextWrapper = styled('div')({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px'
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: '#F0F0F0',
    color: theme.palette.primary.dark
}));

const ExerciseList = ({ exercises, selectedExercise }) => {
    const [filters, setFilters] = useState({
        Aquecimento: true,
        Aeróbio: true,
        Força: true,
        Alongamentos: true
    });

    useEffect(() => {
        if (['Aquecimento', 'Aeróbio', 'Força', 'Alongamentos'].includes(selectedExercise)) {
            setFilters((prevFilters) => ({
                ...prevFilters,
                Aquecimento: selectedExercise === 'Aquecimento',
                Aeróbio: selectedExercise === 'Aeróbio',
                Força: selectedExercise === 'Força',
                Alongamentos: selectedExercise === 'Alongamentos'
            }));
        } else {
            setFilters({
                Aquecimento: true,
                Aeróbio: true,
                Força: true,
                Alongamentos: true
            });
        }
    }, [selectedExercise]);

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFilters({
            ...filters,
            [name]: checked
        });
    };

    const filteredExercises = exercises.filter((exercise) => {
        const exerciseData = JSON.parse(exercise.JSON);
        return !!filters[exerciseData.TIPO];
    });

    return (
        <StyledTableContainer component={Paper}>
            <TitleWrapper>
                <Title variant="h4" gutterBottom>
                    EXERCÍCIOS DISPONÍVEIS
                </Title>
            </TitleWrapper>
            <TextWrapper>
                <Typography marginRight="15px" variant="body1">
                    Ver:
                </Typography>
                <FormControlLabel
                    control={<Checkbox checked={filters.Aquecimento} onChange={handleCheckboxChange} name="Aquecimento" />}
                    label="Aquecimento"
                />
                <FormControlLabel
                    control={<Checkbox checked={filters.Aeróbio} onChange={handleCheckboxChange} name="Aeróbio" />}
                    label="Aeróbio"
                />
                <FormControlLabel
                    control={<Checkbox checked={filters.Força} onChange={handleCheckboxChange} name="Força" />}
                    label="Força"
                />
                <FormControlLabel
                    control={<Checkbox checked={filters.Alongamentos} onChange={handleCheckboxChange} name="Alongamentos" />}
                    label="Alongamentos"
                />
            </TextWrapper>
            <Table>
                <TableHead>
                    <TableRow>
                        <StyledTableCell>NOME</StyledTableCell>
                        <StyledTableCell>TIPO DE EXERCÍCIO</StyledTableCell>
                        <StyledTableCell>DESCRIÇÃO DO EXERCÍCIO</StyledTableCell>
                        <StyledTableCell>REPETIÇÕES</StyledTableCell>
                        <StyledTableCell>DURAÇÃO</StyledTableCell>
                        <StyledTableCell>OBJETIVOS</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredExercises.map((exercise, index) => {
                        const exerciseData = JSON.parse(exercise.JSON);
                        console.log(exerciseData);
                        return (
                            <TableRow key={index}>
                                <TableCell>{exerciseData.nome_do_exercicio}</TableCell>
                                <TableCell>{exerciseData.TIPO}</TableCell>
                                <TableCell>{exerciseData.descricao_do_exercicio}</TableCell>
                                <TableCell>{exerciseData.repeticoes}</TableCell>
                                <TableCell>{exerciseData.duracao}</TableCell>
                                <TableCell>{exerciseData.objetivos}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </StyledTableContainer>
    );
};

ExerciseList.propTypes = {
    exercises: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            repetitions: PropTypes.number.isRequired,
            duration: PropTypes.string.isRequired,
            objectives: PropTypes.string.isRequired
        })
    ).isRequired,
    selectedExercise: PropTypes.string.isRequired
};

export default ExerciseList;
