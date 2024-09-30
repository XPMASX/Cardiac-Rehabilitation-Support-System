import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, Typography, Grid, IconButton, Menu, MenuItem, Popover, Divider } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import IconEquipa from '../../../../assets/images/icons/Branco/Icones_Branco-03.svg';
import MainCardDashboard from '../../../../ui-component/cards/MainCardDashboard';

const CardWrapper = styled(MainCardDashboard)(({ theme }) => ({
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
    border: 'none'
}));

function DadosEquipa({ isLoading, imageIcon, text1, text2, className }) {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <CardWrapper content={false}>
                    <Card sx={{ display: 'flex', width: '100%', height: '100%' }}>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '10%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                            className="CardioId-CardContent-Active-Patients-counter"
                        >
                            <img src={IconEquipa} alt="icon" style={{ width: '45%', height: '65%' }} />
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                flex: 'auto',
                                flexDirection: 'column',
                                alignContent: 'flex-start',
                                justifyContent: 'space-around',
                                padding: '12px'
                            }}
                        >
                            <Typography variant="body1" sx={{ fontSize: '1rem', color: 'inherit' }}>
                                Dados Equipa Técnica
                            </Typography>
                            {open && (
                                <>
                                    <Divider sx={{ my: 1, mt: 0.2 }} />
                                    <Typography variant="body1">
                                        <Typography
                                            variant="h5"
                                            component="span"
                                            sx={{ mb: 0.5 }}
                                            style={{ color: theme.palette.primary.dark }}
                                        >
                                            MORADA:
                                        </Typography>{' '}
                                        Rua Policarpo Faria, nº 3C 1840-123 Lisboa
                                    </Typography>
                                    <Typography variant="body1">
                                        <Typography
                                            variant="h5"
                                            component="span"
                                            sx={{ mb: 0.5 }}
                                            style={{ color: theme.palette.primary.dark }}
                                        >
                                            EMAIL:
                                        </Typography>{' '}
                                        manuelavaz78@email.com
                                    </Typography>
                                    <Typography variant="body1">
                                        <Typography
                                            variant="h5"
                                            component="span"
                                            sx={{ mb: 0.5 }}
                                            style={{ color: theme.palette.primary.dark }}
                                        >
                                            TELEFONE:
                                        </Typography>{' '}
                                        914 563 780
                                    </Typography>
                                </>
                            )}
                        </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                width: '10%',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}
                        >
                            <IconButton onClick={handleClickOpen} sx={{ color: theme.palette.primary.dark }}>
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </Box>
                    </Card>
                </CardWrapper>
            )}
        </>
    );
}

export default DadosEquipa;
