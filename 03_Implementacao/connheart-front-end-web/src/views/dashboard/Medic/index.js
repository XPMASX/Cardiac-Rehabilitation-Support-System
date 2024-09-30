import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import EventsCard from './EventsCards';

import { gridSpacing } from 'store/constant';
import EventsGrid from './EventsGrid';
import ActiveGroupsCard from './ActiveGroupsCard';
import ActivePatientsCard from './ActivePatientsCard';
import GroupsActivities from './GroupsActivities';
import MainCardDashboard from '../../../ui-component/cards/MainCardDashboard';

// ==============================|| DEFAULT DASHBOARD ||============================== //

function Dashboard() {
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <>
            <MainCardDashboard title="DASHBOARD">
                <Grid container spacing={gridSpacing}>
                    <Grid item xs={12}>
                        <Grid container spacing={gridSpacing} justifyContent={{ xs: 'center', sm: 'center' }}>
                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                <EventsCard isLoading={isLoading} />
                            </Grid>
                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                <ActiveGroupsCard isLoading={isLoading} />
                            </Grid>
                            <Grid item lg={4} md={6} sm={6} xs={12}>
                                <ActivePatientsCard isLoading={isLoading} />
                            </Grid>
                        </Grid>
                        <GroupsActivities isLoading={isLoading} />
                    </Grid>
                </Grid>
            </MainCardDashboard>
            <Grid item xs={12}>
                <EventsGrid />
            </Grid>
        </>
    );
}

export default Dashboard;
