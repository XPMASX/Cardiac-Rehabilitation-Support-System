import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// project imports
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { DataGrid } from '@mui/x-data-grid';
import SubCard from '../../../ui-component/cards/SubCard';
import EventController from '../../../controllers/EventController';
import DateUtils from '../../../utils/dateUtils';
import { Avatar, Typography } from '@mui/material';

// assets

// ===========================|| DEFAULT - EVENTS GRID ||=========================== //

function ClinicsCard({ isLoading }) {
    const theme = useTheme();

    const [rows, setRows] = useState([]);
    const columns = [
        { field: 'patient', headerName: 'PACIENTE', flex: 1 },
        { field: 'eventName', headerName: 'EVENTO', flex: 1 },
        { field: 'date', headerName: 'DATA/HORA', flex: 1 },
        { field: 'lastTrans', headerName: 'ÚLTIMA TRANSFERÊNCIA' },
        { field: 'progress', headerName: 'PROGRESSO', flex: 1 }
    ];

    return (
        <div>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <DataGrid autoHeight style={{ width: '100%' }} density="standard" hideFooter rows={rows} columns={columns} />
            )}
        </div>
    );
}

ClinicsCard.propTypes = {
    isLoading: PropTypes.bool
};

export default ClinicsCard;
