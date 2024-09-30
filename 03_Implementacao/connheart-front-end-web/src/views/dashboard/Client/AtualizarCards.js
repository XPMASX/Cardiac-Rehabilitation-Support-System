import React from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from '../../../store/constant';
import SingleCard from '../components/SingleCard';
import { useTheme } from '@mui/material/styles';

import IconAtualizar from '../../../assets/images/icons/Branco/Icones_Branco-29.svg';
import IconDispositivo from '../../../assets/images/icons/Branco/Icones_Branco-24.svg';
import IconSintomas from '../../../assets/images/icons/Branco/Icones_Branco-27.svg';
import SubCardDashboard from '../../../ui-component/cards/SubCardDashboard';

const AtualizarCards = ({ isLoading }) => {
    const theme = useTheme();

    const atualizarCards = [
        { imageIcon: IconAtualizar, text: 'ATUALIZAR DADOS', to: '/', disabled: true },
        { imageIcon: IconAtualizar, text: 'QUESTIONÁRIOS', to: '/questionarios/paciente' },
        { imageIcon: IconDispositivo, text: 'DISPOSITIVO', to: '/', disabled: true },
        { imageIcon: IconSintomas, text: 'SINTOMAS', to: '/', disabled: true }
    ];

    const atualizarClass = 'DashboardPaciente-Atualizar-counter';
    const hoverAtualizar = theme.palette.secondary.dark;

    return (
        <SubCardDashboard title="INSERIR OU ATUALIZAR DADOS" color={theme.palette.primary[200]}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={0} justifyContent={{ xs: 'center', sm: 'center', lg: 'flex-start' }}>
                        {atualizarCards.map((card, index) => (
                            <Grid item lg={3} md={6} sm={6} xs={12} key={index}>
                                <SingleCard
                                    isLoading={isLoading}
                                    imageIcon={card.imageIcon}
                                    text={card.text}
                                    to={card.to}
                                    className={atualizarClass}
                                    hovercolor={hoverAtualizar}
                                    disabled={card.disabled}
                                />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </SubCardDashboard>
    );
};

export default AtualizarCards;
