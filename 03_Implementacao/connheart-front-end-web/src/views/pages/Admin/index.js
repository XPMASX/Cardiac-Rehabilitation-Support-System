import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports

import { gridSpacing } from 'store/constant';
import MainCard from '../../../ui-component/cards/MainCard';
import ClinicsGrid from './ClinicsGrid';

// ==============================|| DEFAULT DASHBOARDAdmin ||============================== //

function DashboardAdmin() {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <MainCard title="UNIDADES DE SAÚDE">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <ClinicsGrid />
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default DashboardAdmin;
