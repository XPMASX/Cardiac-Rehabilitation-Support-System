import React, { useEffect, useState } from 'react';
import { Grid, Button, Typography } from '@mui/material';
import MainCard from '../../../../ui-component/cards/MainCard';
import TrainingPlans from './TrainingPlans';

import cardioWait from '../../../../ui-component/extended/cardioWait';

function DashboardPlanos() {
    const [showTrainingPlans, setShowTrainingPlans] = useState(true);
    const [role, setRole] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const handlePlanButtonClick = () => {
        setShowTrainingPlans((prevShowTrainingPlans) => !prevShowTrainingPlans);
    };

    return (
        <MainCard title="PLANO DE REABILITAÇÃO">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {isLoading ? (
                        <cardioWait />
                    ) : (
                        <div>
                            {/*<Typography variant="body1">Role Name: {role?.roles[0]?.name}</Typography>*/}
                            <Grid container spacing={2} style={{ paddingTop: '8px' }}>
                                <Grid item lg={2} md={3} sm={6} xs={12}>
                                    <Button variant="outlined" onClick={handlePlanButtonClick}>
                                        {showTrainingPlans ? 'DIMINUIR PLANOS' : 'VER PLANOS'}
                                    </Button>
                                </Grid>
                                <Grid item lg={2} md={3} sm={6} xs={12}>
                                    <Button variant="outlined" disabled>
                                        CALENDÁRIO
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                    )}
                </Grid>
                <Grid item xs={12}>
                    {showTrainingPlans && <TrainingPlans />}
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default DashboardPlanos;
