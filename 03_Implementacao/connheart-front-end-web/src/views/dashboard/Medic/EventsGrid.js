import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';

// material-ui
import { useTheme } from '@mui/material/styles';
import { FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';

// project imports
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { DataGrid } from '@mui/x-data-grid';
import SubCard from '../../../ui-component/cards/SubCard';
import EventController from '../../../controllers/EventController';
import DateUtils from '../../../utils/dateUtils';
import NamedAvatar from '../../../ui-component/extended/NamedAvatar';
import SubCardDashboard from '../../../ui-component/cards/SubCardDashboard';

// assets

// ===========================|| DEFAULT - EVENTS GRID ||=========================== //

function EventsCard({ isLoading }) {
    const theme = useTheme();
    const [order, setOrder] = useState('recent'); // Initialize order state to "recent"
    const [rows, setRows] = useState([]);

    useEffect(() => {
        // Fetch all events
        const allEvents = EventController.get();
        // Filter for the event with id = 1
        const eventWithId1 = allEvents.filter((event) => event.id === 1);
        setRows(eventWithId1);
    }, []);

    const eventCellFormat = (params) => {
        const eventName = params.row.eventName;
        const date = params.row.date;

        if (eventName === 'Queda' || eventName === 'Susto') {
            if (DateUtils.isToday(date) && (params.field === 'eventName' || params.field === 'date' || params.field === 'lastTrans')) {
                let additionalClass = '';
                if (params.field === 'eventName') {
                    additionalClass = ' CardioId-DataGrid-EventsCell-event';
                } else if (params.field === 'lastTrans') {
                    additionalClass = ' CardioId-DataGrid-EventsCell-lastTrans';
                }

                switch (eventName) {
                    case 'Queda':
                        return 'CardioId-DataGrid-EventsCell-Severe' + additionalClass;
                    case 'Susto':
                        return 'CardioId-DataGrid-EventsCell-Mid' + additionalClass;
                    default:
                        return '';
                }
            }
            return 'CardioId-DataGrid-EventsCell-Low';
        }

        return '';
    };

    const rendUserCell = (params) => {
        return (
            <MuiLink component={RouterLink} to={`/medicSinais`} underline="none" color="inherit">
                <NamedAvatar name={params.row.patient} src={params.row.img} />
            </MuiLink>
        );
    };

    const columns = [
        { field: 'patient', headerName: 'PACIENTE', flex: 1, cellClassName: eventCellFormat, renderCell: rendUserCell },
        { field: 'eventName', headerName: 'EVENTO', flex: 0.5, cellClassName: eventCellFormat },
        { field: 'date', headerName: 'DATA/HORA', flex: 1, cellClassName: eventCellFormat },
        { field: 'lastTrans', headerName: 'ÚLTIMA TRANSFERÊNCIA', flex: 1, cellClassName: eventCellFormat },
        {
            field: 'progress',
            headerName: 'PROGRESSO',
            flex: 1,
            cellClassName: eventCellFormat,
            renderCell: (params) => (
                <Box display="flex" alignItems="center" justifyContent="center">
                    <Box width="15%" mr={1} display="flex" justifyContent="center">
                        {params.value}
                    </Box>
                    <Box width="85%">
                        <LinearProgress className="progress-bar" variant="determinate" value={100} />
                    </Box>
                </Box>
            )
        }
    ];

    return (
        <SubCardDashboard title="EVENTOS">
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <>
                    <Grid container>
                        <Grid item xs={2.4}>
                            <FormControl fullWidth>
                                <InputLabel id="order-label">Ordem</InputLabel>
                                <Select
                                    labelId="order-label"
                                    id="order"
                                    value={order} // Controlled by state
                                    label="Ordem"
                                    onChange={(e) => setOrder(e.target.value)} // Update state on change
                                >
                                    <MenuItem value="recent">Mais recentes</MenuItem>
                                    <MenuItem value="old">Mais antigos</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        <DataGrid autoHeight style={{ width: '100%' }} density="standard" hideFooter rows={rows} columns={columns} />
                    </Box>
                </>
            )}
        </SubCardDashboard>
    );
}

EventsCard.propTypes = {
    isLoading: PropTypes.bool
};

export default EventsCard;
