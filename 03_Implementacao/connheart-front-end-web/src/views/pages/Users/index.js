import { useEffect, useState } from 'react';

// material-ui
import { Button, Grid, Typography } from '@mui/material';

// assets
import { IconPencil } from '@tabler/icons';

// project imports

import { gridSpacing } from 'store/constant';
import MainCard from '../../../ui-component/cards/MainCard';
import UsersGrid from './UsersGrid';
import EditButton from '../../../ui-component/extended/EditButton';

// ==============================|| DEFAULT Users ||============================== //

function Users() {
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);

    return (
        <MainCard>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container>
                        <Grid item lg={2} md={3} sm={3} xs={12}>
                            <Button variant="outlined">PACIENTES</Button>
                        </Grid>
                        <Grid item lg={2} md={3} sm={3} xs={12}>
                            <Button variant="outlined">GRUPOS</Button>
                        </Grid>
                        <Grid item lg={2} md={3} sm={3} xs={12}>
                            <Button variant="outlined">MÉDICOS</Button>
                        </Grid>
                        <Grid item lg={2} md={3} sm={3} xs={12}>
                            <Button variant="outlined">MÉDICOS</Button>
                        </Grid>
                        <Grid item lg={2} md={3} sm={3} xs={12}>
                            <Button variant="outlined">TECNICOS</Button>
                        </Grid>
                        <Grid item lg={2} md={3} sm={3} xs={12}>
                            <Button variant="outlined" disabled>
                                UNIDADES DE SAÚDE
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justify="flex-end" direction="row">
                        <Grid item lg={2} md={3} sm={3} xs={12}>
                            <EditButton link="users/add" name="Adicionar novo Utilizador" />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <UsersGrid />
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default Users;
