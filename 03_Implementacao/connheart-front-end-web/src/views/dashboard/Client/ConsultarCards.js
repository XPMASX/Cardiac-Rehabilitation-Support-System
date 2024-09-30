import React from 'react';
import { Grid } from '@mui/material';
import { gridSpacing } from '../../../store/constant';
import SingleCard from '../components/SingleCard';
import SubCard from '../../../ui-component/cards/SubCard';
import { useTheme } from '@mui/material/styles';

//image imports
import IconHeart from '../../../assets/images/icons/Branco/Icones_Branco-25.svg';
import IconPlan from '../../../assets/images/icons/Branco/Icones_Branco-22.svg';
import IconAtividade from '../../../assets/images/icons/Branco/Icones_Branco-10.svg';
import IconClinica from '../../../assets/images/icons/Branco/Icones_Branco-11.svg';
import IconConselhos from '../../../assets/images/icons/Branco/Icones_Branco-04.svg';
import IconHistorico from '../../../assets/images/icons/Branco/Icones_Branco-13.svg';
import SubCardDashboard from '../../../ui-component/cards/SubCardDashboard';

const ConsultarCards = ({ isLoading }) => {
    const theme = useTheme();

    const consultarCards = [
        { imageIcon: IconHeart, text: 'O MEU CORAÇÃO', to: '/clientSinais' },
        { imageIcon: IconPlan, text: 'O MEU PLANO', to: '/planos' },
        { imageIcon: IconAtividade, text: 'ATIVIDADE', to: '/', disabled: true },
        { imageIcon: IconClinica, text: 'A MINHA CLÍNICA', to: '/', disabled: true },
        { imageIcon: IconConselhos, text: 'CONSELHOS', to: '/', disabled: true },
        { imageIcon: IconHistorico, text: 'HISTÓRICO', to: '/', disabled: true }
    ];

    const consultarClass = 'DashboardPaciente-Consultar-counter';
    const hoverConsultar = '#599FCC'; //theme.palette.primary[200];

    return (
        <SubCardDashboard title="CONSULTAR" color={'#599FCC'}>
            <Grid container spacing={gridSpacing}>
                <Grid item xs={12}>
                    <Grid container spacing={0}>
                        {consultarCards.map((card, index) => (
                            <Grid item lg={3} md={6} sm={6} xs={12} key={index}>
                                <SingleCard
                                    isLoading={isLoading}
                                    imageIcon={card.imageIcon}
                                    text={card.text}
                                    to={card.to}
                                    className={consultarClass}
                                    hovercolor={hoverConsultar}
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

export default ConsultarCards;
