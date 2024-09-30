import { Button, ButtonGroup, FormControl, Grid, InputLabel, MenuItem, Select, Typography, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PieChart } from 'react-minimal-pie-chart';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Box } from '@mui/system';
import Indicator from '../components/Indicator';
import OrderButtonGroup from '../components/OrderButtonGroup';

const StyledBall = styled('div')(({ theme }) => ({
    position: 'relative',
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(4)
}));

const GroupsActivities = () => {
    const theme = useTheme();
    const [ballCount, setBallCount] = useState(5);
    const [selectedOrder, setSelectedOrder] = useState('recent');

    const handleOrder = (orderType) => {
        setSelectedOrder(orderType);
        // Add the logic for ordering the balls based on the order type
    };

    const balls = [];
    for (let i = 0; i < ballCount; i++) {
        balls.push(
            <Grid item key={i}>
                <StyledBall>
                    <PieChart
                        data={[
                            { value: 30, color: theme.palette.primary[200] },
                            { value: 50, color: theme.palette.primary.dark },
                            { value: 20, color: theme.palette.error.light }
                        ]}
                        totalValue={100}
                        lineWidth={10}
                        rounded
                        animate
                        paddingAngle={8}
                        startAngle={-90}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '200px',
                            height: '200px'
                        }}
                    />
                    <Typography variant="h4" component="div" color="text.primary" gutterBottom>
                        {`Grupo ${i + 1}`}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        {`AVANÇADO`}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        {`ATIVO DESDE:`}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom sx={{ marginTop: '-0.4em' }}>
                        {`01/06/2019`}
                    </Typography>
                </StyledBall>
            </Grid>
        );
    }

    return (
        <Box mt={5}>
            <Grid container alignItems="center" justify="space-between" spacing={2} style={{ justifyContent: 'space-between' }}>
                <Grid item xs={2.4}>
                    <FormControl fullWidth>
                        <InputLabel id="order-label">Ordem</InputLabel>
                        <Select
                            labelId="order-label"
                            id="order"
                            value={selectedOrder}
                            label="Ordem"
                            onChange={(e) => setSelectedOrder(e.target.value)}
                        >
                            <MenuItem value="recent">Mais recentes</MenuItem>
                            <MenuItem value="old">Mais antigos</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item>
                    <OrderButtonGroup
                        color={theme.palette.primary.dark}
                        selectedOrder={selectedOrder}
                        handleOrder={handleOrder}
                        theme={theme}
                        disabled={true}
                    />
                </Grid>
            </Grid>
            <Grid container spacing={5}>
                {balls}
            </Grid>
            <Box mt={15} ml={8}>
                <Grid container spacing={5} justifyContent="flex-start">
                    <Indicator color={theme.palette.primary.dark} label="Atividade Física Regular" space={1.2} />
                    <Indicator color={theme.palette.primary[200]} label="Pouca Atividade" space={1.2} />
                    <Indicator color={theme.palette.error.light} label="Sedentarismo" space={1.2} />
                </Grid>
            </Box>
        </Box>
    );
};

export default GroupsActivities;
