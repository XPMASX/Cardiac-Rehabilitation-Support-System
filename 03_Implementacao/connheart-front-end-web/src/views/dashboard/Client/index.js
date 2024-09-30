import { useEffect, useState } from 'react';

// material-ui
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';

// project imports
import { gridSpacing } from 'store/constant';
import VerticalCard from './VerticalCard';
import EditButton from '../../../ui-component/extended/EditButton';
import AtualizarCards from './AtualizarCards';
import ConsultarCards from './ConsultarCards';
import HeartRateChart from '../components/HeartRateChart';
import axios from 'axios';
import StepsBarChart from '../components/StepsBarChart';
import MainCardDashboard from '../../../ui-component/cards/MainCardDashboard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

function Dashboard() {
    const theme = useTheme();
    const [isLoading, setLoading] = useState(true);

    const [data, setData] = useState([]);

    const [timeSpan] = useState('day');
    const [dType, setDType] = useState('BatCardiaco');
    const [startDate] = useState(null);
    const [endDate] = useState(null);

    const color = theme.palette.primary[200];

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

    return (
        <>
            <ConsultarCards isLoading={isLoading} />
            <AtualizarCards isLoading={isLoading} />
            <MainCardDashboard title={`DASHBOARD`} sx={{ mt: 2 }} color={color}>
                <Box mt={2}>
                    <Grid container alignItems="center" justify="space-between" spacing={2} style={{ justifyContent: 'space-between' }}>
                        <Grid item xs={2.5}>
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
                            <EditButton name="Configurações" disabled={true} />
                        </Grid>
                    </Grid>
                </Box>
                <Grid container spacing={gridSpacing} justifyContent="flex-end">
                    <Grid item xs={12} md={8} mt={2}>
                        {dType === 'BatCardiaco' ? (
                            <HeartRateChart
                                data={data}
                                color={color}
                                timeSpan={timeSpan}
                                height={600}
                                margin={-21}
                                startDate={startDate}
                                endDate={endDate}
                            />
                        ) : (
                            <StepsBarChart data={data} color={color} height={600} margin={-18} startDate={startDate} endDate={endDate} />
                        )}
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <VerticalCard isLoading={isLoading} />
                    </Grid>
                </Grid>
            </MainCardDashboard>
        </>
    );
}

export default Dashboard;
