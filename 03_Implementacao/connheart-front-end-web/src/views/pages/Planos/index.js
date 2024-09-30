import { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import MainCard from '../../../ui-component/cards/MainCard';
import EditButton from '../../../ui-component/extended/EditButton';
import DeleteButton from '../../../ui-component/extended/DeleteButton';
import PlanosCard from './PlanosCard';
import ExerciseCard from './ExerciseCard';
import { gridSpacing } from 'store/constant';
import SeeButton from '../../../ui-component/extended/SeeButton';
import ExercisesList from './ExercisesList';
import CreateExercise from './CreateExercise';
import CreatePlans from './CreatePlans';
import EditPlan from './EditPlan';
import AssignPlan from './AssignPlan';

function DashboardPlanos() {
    const [isLoading, setLoading] = useState(true);
    const [showNewMainCard, setShowNewMainCard] = useState(false);
    const [showEditMainCard, setShowEditMainCard] = useState(false);
    const [showEdit2MainCard, setShowEdit2MainCard] = useState(false);
    const [showSeeMainCard, setShowSeeMainCard] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState('');
    const [exercises, setExercises] = useState([]);
    const [planos, setPlanos] = useState([]);
    const [planToDelete, setPlanToDelete] = useState(null);
    const [selectedPlanoId, setSelectedPlanoId] = useState('');
    let number = 1;

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                const response = await fetch('http://localhost:8000/exercises');
                if (!response.ok) {
                    throw new Error(`Failed to fetch exercises: ${response.statusText}`);
                }
                const data = await response.json();
                setExercises(data);
            } catch (error) {
                console.error('Error fetching exercises:', error);
            }
        };
        fetchExercises();

        const fetchPlanos = async () => {
            try {
                const response = await fetch('http://localhost:8000/planos?active=true');
                if (!response.ok) {
                    throw new Error(`Failed to fetch planos: ${response.statusText}`);
                }
                const data = await response.json();
                setPlanos(data);
            } catch (error) {
                console.error('Error fetching planos:', error);
            }
        };
        fetchPlanos();

        setLoading(false);
    }, []);

    const countTreinos = (plano) => {
        try {
            const parsedData = JSON.parse(plano.DadosPlano);
            return parsedData.length;
        } catch (error) {
            console.error('Error parsing DadosPlano:', error);
            return 0;
        }
    };

    const countExercisesByType = (type) => {
        type = type.toLowerCase();
        return exercises.filter((exercise) => {
            const json = JSON.parse(exercise.JSON);
            return json.TIPO.toLowerCase() === type;
        }).length;
    };

    const handleAddButtonClick = () => {
        setShowNewMainCard(true);
        setShowEditMainCard(false);
        setShowEdit2MainCard(false);
        setShowSeeMainCard(false);
    };

    const handleEditButtonClick = (plano) => {
        setSelectedPlanoId(plano.idPlano);
        setShowEditMainCard(true);
        setShowNewMainCard(false);
        setShowEdit2MainCard(false);
        setShowSeeMainCard(false);
    };

    const handleEdit2ButtonClick = () => {
        setShowEdit2MainCard(true);
        setShowNewMainCard(false);
        setShowEditMainCard(false);
        setShowSeeMainCard(false);
    };

    const handleSeeButtonClick = (exerciseName) => {
        setShowSeeMainCard(true);
        setSelectedExercise(exerciseName);
        setShowNewMainCard(false);
        setShowEditMainCard(false);
        setShowEdit2MainCard(false);
    };

    const handleDeletePlan = async (planoId) => {
        try {
            const response = await fetch(`http://localhost:8000/planos/${planoId}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete plano');
            }
            setPlanos(planos.map((plano) => (plano.idPlano === planoId ? { ...plano, Active: 0 } : plano)));
        } catch (error) {
            console.error('Error deleting plano:', error);
        }
        setPlanToDelete(null);
    };

    return (
        <>
            <MainCard title="PLANOS CRIADOS">
                <Grid container spacing={3}>
                    {planos
                        .filter((plano) => plano.Active !== 0)
                        .map((plano) => (
                            <Grid key={plano.idPlano} item lg={4} md={6} sm={6} xs={12}>
                                <PlanosCard
                                    planName={`Plano Regenerativo ${number++}`}
                                    pacientType={`Número de Treinos: ${countTreinos(plano)}`}
                                />
                                {planToDelete === plano.idPlano ? (
                                    <Grid container direction="row" alignItems="center" spacing={1}>
                                        <Grid item sx={{ marginTop: '10px' }}>
                                            <DeleteButton name="Confirmar Exclusão" onClick={() => handleDeletePlan(plano.idPlano)} />
                                        </Grid>
                                        <Grid item sx={{ marginTop: '10px' }}>
                                            <EditButton name="Editar Plano" onViewClick={() => handleEditButtonClick(plano)} />
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <Grid container direction="row" alignItems="center" spacing={1}>
                                        <Grid item sx={{ marginTop: '10px' }}>
                                            <DeleteButton name="Apagar Plano" onClick={() => setPlanToDelete(plano.idPlano)} />
                                        </Grid>
                                        <Grid item sx={{ marginTop: '10px' }}>
                                            <EditButton name="Editar Plano" onViewClick={() => handleEditButtonClick(plano)} />
                                        </Grid>
                                    </Grid>
                                )}
                            </Grid>
                        ))}
                    <Grid item xs={12}>
                        <Grid container justifyContent="flex-end" spacing={2}>
                            <Grid item>
                                <EditButton name="Adicionar novo Plano" onViewClick={handleAddButtonClick} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
            <MainCard title="EXERCÍCIOS DISPONÍVEIS">
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container justify="flex-end" direction="row" spacing={1}>
                            <Grid item lg={3} md={6} sm={6} xs={6}>
                                <ExerciseCard
                                    name="AQUECIMENTO"
                                    number={countExercisesByType('Aquecimento')}
                                    onViewClick={() => handleSeeButtonClick('Aquecimento')}
                                />
                            </Grid>
                            <Grid item lg={3} md={6} sm={6} xs={6}>
                                <ExerciseCard
                                    name="AERÓBIO"
                                    number={countExercisesByType('Aeróbio')}
                                    onViewClick={() => handleSeeButtonClick('Aeróbio')}
                                />
                            </Grid>
                            <Grid item lg={3} md={6} sm={6} xs={6}>
                                <ExerciseCard
                                    name="FORÇA"
                                    number={countExercisesByType('Força')}
                                    onViewClick={() => handleSeeButtonClick('Força')}
                                />
                            </Grid>
                            <Grid item lg={3} md={6} sm={6} xs={6}>
                                <ExerciseCard
                                    name="ALONGAMENTOS"
                                    number={countExercisesByType('Alongamentos')}
                                    onViewClick={() => handleSeeButtonClick('Alongamentos')}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container justifyContent="flex-end" spacing={2}>
                                    <Grid item>
                                        <EditButton name="Adicionar novo exercício" onViewClick={handleEdit2ButtonClick} />
                                    </Grid>
                                    <Grid item>
                                        <SeeButton name="Ver lista completa" onViewClick={handleSeeButtonClick} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </MainCard>
            {showNewMainCard && (
                <MainCard title="ADICIONAR PLANO">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <CreatePlans availableExercises={exercises} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
            {showEditMainCard && (
                <MainCard title="EDITAR PLANO">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <EditPlan selectedPlanoId={selectedPlanoId} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
            {showEdit2MainCard && (
                <MainCard title="CRIAÇÃO DE EXERCÍCIOS">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <CreateExercise />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
            {showSeeMainCard && (
                <MainCard title="EXERCÍCIOS DISPONÍVEIS">
                    <Grid container spacing={gridSpacing}>
                        <Grid item xs={12}>
                            <ExercisesList exercises={exercises} selectedExercise={selectedExercise} />
                        </Grid>
                    </Grid>
                </MainCard>
            )}
        </>
    );
}

export default DashboardPlanos;
