import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';

// project imports
import UserController from '../../../controllers/UserController';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import NamedAvatar from '../../../ui-component/extended/NamedAvatar';
import EditButton from '../../../ui-component/extended/EditButton';
import { Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

// assets

// ===========================|| DEFAULT - EVENTS GRID ||=========================== //

function UsersCard({ isLoading }) {
    const theme = useTheme();

    const eventCellFormat = (params) => {
        if (params.field === 'plan' && params.row.plan === 'Inactivo') {
            return 'CardioId-DataGrid-EventsCell-Severe';
        }

        return '';
    };

    const rendPatientCell = (params) => {
        return (
            <MuiLink component={RouterLink} to={`/medicSinais`} underline="none" color="inherit">
                <NamedAvatar name={params.row.patient} src={params.row.img_patient} />
            </MuiLink>
        );
    };
    const rendDoctorCell = (params) => <NamedAvatar name={params.row.medic} src={params.row.img_medic} />;
    const rendEditCell = (params) => <EditButton name="Editar" link={params.row.edit} />;

    const [rows, setRows] = useState(UserController.get());
    const columns = [
        { field: 'patient', headerName: 'PACIENTE', flex: 1, renderCell: rendPatientCell },
        { field: 'medic', headerName: 'MÉDICO', flex: 1, renderCell: rendDoctorCell },
        { field: 'plan', headerName: 'PLANO', flex: 1, cellClassName: eventCellFormat },
        { field: 'date_state', headerName: 'DATA DE INÍCIO E ESTADO', flex: 1 },
        { field: 'progress', headerName: 'PROGRESSO', flex: 1 },
        { field: 'edit', headerName: 'EDITAR', flex: 1, renderCell: rendEditCell }
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

UsersCard.propTypes = {
    isLoading: PropTypes.bool
};

export default UsersCard;
