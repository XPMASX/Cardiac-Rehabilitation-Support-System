import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { FormControl, Grid, InputLabel, LinearProgress, MenuItem, Select } from '@mui/material';
import { Box } from '@mui/system';

// project imports
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { DataGrid } from '@mui/x-data-grid';
import SubCard from '../../../../ui-component/cards/SubCard';
import EventController from '../../../../controllers/EventController';
import DateUtils from '../../../../utils/dateUtils';
import NamedAvatar from '../../../../ui-component/extended/NamedAvatar';
import SubCardDashboard from '../../../../ui-component/cards/SubCardDashboard';

// assets

// ===========================|| DEFAULT - EVENTS GRID ||=========================== //

function EventsCard({ isLoading }) {
    const theme = useTheme();
    const [order, setOrder] = useState('recent');

    useEffect(() => {
        // Fetch all events
        const allEvents = EventController.get();
        // Filter for the event with id = 2
        const eventWithId2 = allEvents.filter((event) => event.id === 2);
        setRows(eventWithId2);
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
        return <NamedAvatar name={params.row.patient} src={params.row.img} />;
    };

    const [rows, setRows] = useState(EventController.get);
    const columns = [
        { field: 'day', headerName: 'DATA', flex: 1, cellClassName: eventCellFormat },
        { field: 'hour', headerName: 'HORA', flex: 1, cellClassName: eventCellFormat },
        { field: 'eventName', headerName: 'EVENTO', flex: 0.5, cellClassName: eventCellFormat },
        { field: 'medic', headerName: 'MÉDICO', flex: 1, cellClassName: eventCellFormat },
        { field: 'nurse', headerName: 'TÉCNICO', flex: 1, cellClassName: eventCellFormat }
    ];

    return (
        <SubCardDashboard title="1  EVENTO">
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <>
                    <Grid container>
                        <Grid item xs={2.3}>
                            <FormControl fullWidth>
                                <InputLabel id="order-label">Ordem</InputLabel>
                                <Select labelId="order-label" id="order" label="Ordem" value={order}>
                                    <MenuItem value="recent">Mais recentes</MenuItem>
                                    <MenuItem value="old">Mais antigos</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Box mt={5}>
                        {' '}
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
