import PropTypes from 'prop-types';

// material-ui
import { Box, Card, Divider, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import ProfilePic from '../../../../assets/images/users/user-round.svg';

// assets
import { styled, useTheme } from '@mui/material/styles';
import MainCardDashboard from '../../../../ui-component/cards/MainCardDashboard';

const CardWrapper = styled(MainCardDashboard)(({ theme }) => ({
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
    border: 'none'
}));

function DadosPaciente({ isLoading }) {
    const theme = useTheme();

    if (isLoading) {
        return <SkeletonEarningCard />;
    }

    return (
        <CardWrapper>
            <Card sx={{ display: 'flex', p: 2 }}>
                <Box component="img" src={ProfilePic} alt="Profile" sx={{ width: '15%', height: 100, borderRadius: '50%' }} />
                <Box sx={{ ml: 4, flex: '1 1 auto' }}>
                    <Typography variant="h5" color={theme.palette.primary.dark}>
                        DADOS PESSOAIS
                    </Typography>
                    <Divider sx={{ my: 1, mt: 0.2 }} />
                    <Typography variant="body1" sx={{ mb: 0.3 }}>
                        <Typography variant="h5" component="span" style={{ color: theme.palette.primary.dark }}>
                            NOME:
                        </Typography>{' '}
                        Ricardo
                    </Typography>
                    <Typography variant="body1" sx={{ mb: 0.3 }}>
                        <Typography variant="h5" component="span" style={{ color: theme.palette.primary.dark }}>
                            APELIDO:
                        </Typography>{' '}
                        Dias
                    </Typography>
                    <Typography variant="body1">
                        <Typography variant="h5" component="span" style={{ color: theme.palette.primary.dark }}>
                            DATA DE NASCIMENTO:
                        </Typography>{' '}
                        05/04/1976 (44 anos)
                    </Typography>
                    <Typography variant="h5" sx={{ mt: 2 }} color={theme.palette.primary.dark}>
                        CONTACTOS
                    </Typography>
                    <Divider sx={{ my: 1, mt: 0.2 }} />
                    <Typography variant="body1">
                        <Typography variant="h5" component="span" sx={{ mb: 0.5 }} style={{ color: theme.palette.primary.dark }}>
                            MORADA:
                        </Typography>{' '}
                        Rua Policarpo Faria, nº 3C 1840-123 Lisboa
                    </Typography>
                    <Typography variant="body1">
                        <Typography variant="h5" component="span" sx={{ mb: 0.5 }} style={{ color: theme.palette.primary.dark }}>
                            EMAIL:
                        </Typography>{' '}
                        ricardodias78@email.com
                    </Typography>
                    <Typography variant="body1">
                        <Typography variant="h5" component="span" sx={{ mb: 0.5 }} style={{ color: theme.palette.primary.dark }}>
                            TELEFONE:
                        </Typography>{' '}
                        914 563 780
                    </Typography>
                    <Typography variant="body1">
                        <Typography variant="h5" component="span" style={{ color: theme.palette.primary.dark }}>
                            TELEFONE ALTERNATIVO:
                        </Typography>{' '}
                        914 563 780
                    </Typography>
                </Box>
            </Card>
        </CardWrapper>
    );
}

DadosPaciente.propTypes = {
    isLoading: PropTypes.bool
};

export default DadosPaciente;
