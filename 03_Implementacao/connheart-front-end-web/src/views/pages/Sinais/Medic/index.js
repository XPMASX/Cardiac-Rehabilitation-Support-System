import { useEffect, useState } from 'react';
import axios from 'axios';

// material-ui
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';

// project imports
import EventsGrid from './EventsGrid';
import OrderButtonGroup from '../../../dashboard/components/OrderButtonGroup';
import EventCard from './EventCard';
import DadosPaciente from './DadosPaciente';
import VerticalCardDados from './VerticalCardDados';
import AtividadeCard from './AtividadeCard';
import PlanoEstado from './PlanoEstado';
import DadosCuidador from './DadosCuidador';
import DadosEquipa from './DadosEquipa';
import InfoClinica from './InfoClinica';
import DashboardControl from './DashboardControl';
import HeartRateChart from '../../../dashboard/components/HeartRateChart';
import StepsBarChart from '../../../dashboard/components/StepsBarChart';
import AssignPlan from '../../Planos/AssignPlan';
import AssignQuestionario from '../../../dashboard/components/AssignQuestionario';
import SubCardDashboard from '../../../../ui-component/cards/SubCardDashboard';
import MainCardDashboard from '../../../../ui-component/cards/MainCardDashboard';

function Dashboard() {
    const theme = useTheme();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [timeSpan, setTimeSpan] = useState('day');
    const [dType, setDType] = useState('BatCardiaco');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [selectedDashboard, setselectedDashboard] = useState(0);
    const [dashboardTitle, setDashboardTitle] = useState('DASHBOARD');

    const color = theme.palette.primary.dark;

    useEffect(() => {
        setLoading(false);
        fetchData();
    }, [timeSpan, dType, startDate, endDate]);

    const fetchData = async () => {
        try {
            // Calculate timezone offset in minutes and convert it to milliseconds
            const timezoneOffset = new Date().getTimezoneOffset() * 60000;

            // Adjust startDate and endDate by the timezone offset before converting to ISO strings
            const adjustedStartDate = startDate
                ? new Date(new Date(startDate).getTime() - timezoneOffset).toISOString().split('T')[0]
                : undefined;
            const adjustedEndDate = endDate
                ? new Date(new Date(endDate).getTime() - timezoneOffset).toISOString().split('T')[0]
                : undefined;

            const response = await axios.get(`http://localhost:8000/sinais/1`, {
                params: {
                    tipoSinal: dType,
                    timeSpan: timeSpan,
                    startDate: adjustedStartDate,
                    endDate: adjustedEndDate
                }
            });
            console.log('Fetched data:', response.data);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleTime = (time, newStartDate, newEndDate) => {
        setTimeSpan(time);
        setStartDate(newStartDate);
        setEndDate(newEndDate);
    };

    const handleDashboardChange = (index) => {
        setselectedDashboard(index);
        const titles = ['DASHBOARD', 'DADOS MÉDICOS', 'VER/AJUSTAR PLANO', 'ENVIAR QUESTIONÁRIO', 'ENVIAR MENSAGEM'];
        setDashboardTitle(titles[index]);
    };

    return (
        <>
            <SubCardDashboard title="DADOS PACIENTE">
                <Box display="flex" alignItems="stretch">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <EventCard />
                            <Box mt={2} />
                            <DadosPaciente />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <VerticalCardDados />
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <AtividadeCard />
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <PlanoEstado />
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ mt: 2 }}>
                    <DadosCuidador />
                    <Box mb={2} />
                    <DadosEquipa />
                    <Box mb={2} />
                    <InfoClinica />
                </Box>
            </SubCardDashboard>
            <MainCardDashboard title={dashboardTitle} sx={{ mt: 2 }}>
                {selectedDashboard === 0 && (
                    <>
                        <Box mt={2}>
                            <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
                                <Grid item xs={2.4} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                                    <FormControl fullWidth>
                                        <InputLabel id="order-label">Sinal</InputLabel>
                                        <Select
                                            labelId="order-label"
                                            id="order"
                                            label="Sinal"
                                            value={dType}
                                            onChange={(e) => setDType(e.target.value)}
                                        >
                                            <MenuItem value="BatCardiaco">Batimento Cardíaco</MenuItem>
                                            <MenuItem value="Passos">Passos</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item>
                                    <OrderButtonGroup color={color} selectedOrder={timeSpan} handleOrder={handleTime} theme={theme} />
                                </Grid>
                            </Grid>
                        </Box>
                        <Grid container mt={2} spacing={2}>
                            {dType === 'BatCardiaco' ? (
                                <HeartRateChart
                                    data={data}
                                    color={color}
                                    timeSpan={timeSpan}
                                    height={300}
                                    margin={-13}
                                    startDate={startDate}
                                    endDate={endDate}
                                />
                            ) : (
                                <StepsBarChart
                                    data={data}
                                    color={color}
                                    timeSpan={timeSpan}
                                    height={300}
                                    margin={-13}
                                    startDate={startDate}
                                    endDate={endDate}
                                />
                            )}
                        </Grid>
                    </>
                )}
                {selectedDashboard === 2 && <AssignPlan />}
                {selectedDashboard === 3 && <AssignQuestionario />}
                <Box sx={{ mt: 2 }}>
                    <DashboardControl onSelectionChange={handleDashboardChange} />
                </Box>
            </MainCardDashboard>
            <Grid item xs={12} sx={{ mt: 2 }}>
                <EventsGrid data={data} />
            </Grid>
        </>
    );
}

export default Dashboard;
