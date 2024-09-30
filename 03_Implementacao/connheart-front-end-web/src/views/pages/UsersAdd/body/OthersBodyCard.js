import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Button, Card, Grid, IconButton, MenuItem, Select, Stack, TextField, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';

// assets

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative'
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.primary.dark
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

function OthersBodyCard({ isLoading }) {
    const theme = useTheme();
    const [userDto, setUserDto] = useState({ type: 'p' });
    const handleType = (event) => {
        setUserDto({ type: event.target.value });
    };

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <div>
                    <CardWrapper content={false}>
                        <Card sx={{ display: 'flex' }}>
                            <Box
                                component="form"
                                sx={{
                                    '& .MuiTextField-root': { m: 1, width: '25ch' }
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <Grid container>
                                    <Grid container justifyContent="space-between">
                                        <Stack direction="row" spacing="1" alignItems="center" sx={{ margin: '12px' }}>
                                            <StyledTypography variant="h5">NOME: </StyledTypography>
                                            <TextField required style={{ width: '40ch' }} />
                                        </Stack>
                                        <Stack direction="row" spacing="1" alignItems="center" sx={{ margin: '12px' }}>
                                            <StyledTypography variant="h5">APELIDOS: </StyledTypography>
                                            <TextField required style={{ width: '60ch' }} />
                                        </Stack>
                                    </Grid>
                                    <Grid container justifyContent="space-between">
                                        <Stack direction="row" spacing="1" alignItems="center" sx={{ margin: '12px' }}>
                                            <StyledTypography variant="h5" sx={{ marginRight: '12px' }}>
                                                SEXO:
                                            </StyledTypography>
                                            <Select required autoWidth />
                                        </Stack>
                                        <Stack direction="row" spacing="1" alignItems="center" sx={{ margin: '12px' }}>
                                            <StyledTypography variant="h5">DATA NASCIMENTO: </StyledTypography>
                                            <TextField required id="outlined-required" />
                                        </Stack>
                                    </Grid>
                                    <Grid container justifyContent="space-between">
                                        <Stack direction="row" spacing="1" alignItems="center" sx={{ margin: '12px' }}>
                                            <StyledTypography variant="h5">MORADA: </StyledTypography>
                                            <TextField required style={{ width: '80ch' }} />
                                        </Stack>
                                        <Stack direction="row" spacing="1" alignItems="center" sx={{ margin: '12px' }}>
                                            <StyledTypography variant="h5">CODIGO POSTAL: </StyledTypography>
                                            <TextField required style={{ width: '12ch' }} />
                                        </Stack>
                                    </Grid>
                                    <Grid container justifyContent="space-between">
                                        <Stack direction="row" spacing="1" alignItems="center" sx={{ margin: '12px' }}>
                                            <StyledTypography variant="h5">EMAIL: </StyledTypography>
                                            <TextField required style={{ width: '80ch' }} />
                                        </Stack>
                                        <Stack direction="row" spacing="1" alignItems="center" sx={{ margin: '12px' }}>
                                            <StyledTypography variant="h5">TELEFONE: </StyledTypography>
                                            <TextField required style={{ width: '12ch' }} />
                                        </Stack>
                                    </Grid>
                                    <Grid container justifyContent="space-between">
                                        <Stack direction="row" spacing="1" alignItems="center" sx={{ margin: '12px' }}>
                                            <StyledTypography variant="h5">NIF: </StyledTypography>
                                            <TextField required style={{ width: '20ch' }} />
                                        </Stack>
                                        <Stack direction="row" spacing="1" alignItems="center" sx={{ margin: '12px' }}>
                                            <StyledTypography variant="h5">SNS: </StyledTypography>
                                            <TextField required style={{ width: '20ch' }} />
                                        </Stack>
                                    </Grid>
                                    <Grid container justifyContent="space-between">
                                        <Stack direction="row" spacing="1" alignItems="center" sx={{ margin: '12px' }}>
                                            <StyledTypography variant="h5" sx={{ marginRight: '12px' }}>
                                                UNIDADE DE SAÚDE:
                                            </StyledTypography>
                                            <Select required autoWidth />
                                        </Stack>
                                    </Grid>
                                </Grid>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Button
                                            variant="outlined"
                                            spacing="1"
                                            alignItems="center"
                                            sx={{
                                                margin: '12px',
                                                color: theme.palette.background.paper,
                                                backgroundColor: theme.palette.primary.dark
                                            }}
                                        >
                                            GRAVAR
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Box>
                        </Card>
                    </CardWrapper>
                </div>
            )}
        </>
    );
}

OthersBodyCard.propTypes = {
    isLoading: PropTypes.bool
};

export default OthersBodyCard;
