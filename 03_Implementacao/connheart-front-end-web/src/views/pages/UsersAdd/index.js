import { useEffect, useState } from 'react';

// material-ui
import { Box } from '@mui/system';
import { styled, useTheme } from '@mui/material/styles';
import MainCard from '../../../ui-component/cards/MainCard';
import { gridSpacing } from '../../../store/constant';
import { Grid, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';

// assets

// project imports
import HeaderCard from './HeaderCard';
import PersonalBodyCard from './body/PersonalBodyCard';
import MedicalBodyCard from './body/MedicalBodyCard';
import AdjustBodyCard from './body/AdjustBodyCard';
import WerableBodyCard from './body/WerableBodyCard';
import OthersBodyCard from './body/OthersBodyCard';

// ==============================|| DEFAULT Users ||============================== //

const StyledTabPanel = styled(TabPanel)(({ theme }) => ({
    padding: '0px',
    paddingTop: '12px'
}));

function Users() {
    const theme = useTheme();
    const [value, setValue] = useState('1');
    const [isLoading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, []);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <MainCard title="NOVO UTILIZADOR">
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <HeaderCard />
                </Grid>
                <Grid item xs={12}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList
                                onChange={handleChange}
                                centered
                                variant="fullWidth"
                                TabIndicatorProps={{ style: { color: theme.palette.primary.dark } }}
                            >
                                <Tab label="DADOS PESSOAIS" value="1" />
                                <Tab label="DADOS MÉDICOS" value="2" />
                                <Tab label="AJUSTAR PLANO" value="3" />
                                <Tab label="WERABLE" value="4" />
                                <Tab label="OUTROS" value="5" />
                            </TabList>
                        </Box>
                        <Grid xs={12}>
                            <StyledTabPanel value="1">
                                <PersonalBodyCard />
                            </StyledTabPanel>
                            <StyledTabPanel value="2">
                                <MedicalBodyCard />
                            </StyledTabPanel>
                            <StyledTabPanel value="3">
                                <AdjustBodyCard />
                            </StyledTabPanel>
                            <StyledTabPanel value="4">
                                <WerableBodyCard />
                            </StyledTabPanel>
                            <StyledTabPanel value="5">
                                <OthersBodyCard />
                            </StyledTabPanel>
                        </Grid>
                    </TabContext>
                </Grid>
            </Grid>
        </MainCard>
    );
}

export default Users;
