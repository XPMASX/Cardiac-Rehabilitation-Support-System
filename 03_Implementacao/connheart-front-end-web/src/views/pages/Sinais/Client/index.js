import { useEffect, useState } from 'react';

// material-ui
import { FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { useTheme } from '@mui/material';
import { Box } from '@mui/system';

// project imports
import { gridSpacing } from 'store/constant';
import EventsCard from './EventsCards';
import ActiveGroupsCard from './ActiveGroupsCard';
import ActivePatientsCard from './ActivePatientsCard';
import OrderButtonGroup from '../../../dashboard/components/OrderButtonGroup';
import HeartRateChart from '../../../dashboard/components/HeartRateChart';
import StepsBarChart from '../../../dashboard/components/StepsBarChart';
import axios from 'axios';
import SubCardDashboard from '../../../../ui-component/cards/SubCardDashboard';
import MainCardDashboard from '../../../../ui-component/cards/MainCardDashboard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

function Dashboard() {
    const theme = useTheme();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const [timeSpan, setTimeSpan] = useState('day');
    const [dType, setDType] = useState('BatCardiaco');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const start = new Date(startDate);
    const end = new Date(endDate);
    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in one day
    const differenceInDays = (end - start) / oneDay;

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

    const handleTime = (time, newStartDate, newEndDate) => {
        setTimeSpan(time);
        setStartDate(newStartDate);
        setEndDate(newEndDate);
    };

    return (
        <>
            <SubCardDashboard title="ÚLTIMAS LEITURAS" color={theme.palette.primary[200]}>
                <Box display="flex" alignItems="stretch">
                    <Grid container spacing={gridSpacing} justifyContent={{ xs: 'center', sm: 'center' }}>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <ActiveGroupsCard isLoading={isLoading} />
                        </Grid>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <ActivePatientsCard isLoading={isLoading} />
                        </Grid>
                        <Grid item lg={4} md={6} sm={6} xs={12}>
                            <EventsCard isLoading={isLoading} />
                        </Grid>
                    </Grid>
                </Box>
            </SubCardDashboard>
            <MainCardDashboard title={`DASHBOARD`} sx={{ mt: 2 }} color={theme.palette.primary[200]}>
                <Box mt={2}>
                    <Grid container alignItems="center" justify="space-between" spacing={2} style={{ justifyContent: 'space-between' }}>
                        <Grid item xs={2.4}>
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
                            height={500}
                            margin={-13}
                            startDate={startDate}
                            endDate={endDate}
                        />
                    ) : (
                        <StepsBarChart data={data} color={color} height={500} margin={-13} startDate={startDate} endDate={endDate} />
                    )}
                </Grid>
            </MainCardDashboard>
        </>
    );
}

export default Dashboard;
