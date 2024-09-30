import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, Typography, SvgIcon } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import IconBranco27 from '../../../assets/images/icons/Branco/Icones_Branco-27.svg';
import MainCardDashboard from '../../../ui-component/cards/MainCardDashboard';

const CardWrapper = styled(MainCardDashboard)(({ theme }) => ({
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
    border: 'none'
}));

function DoubleCardNoClick({ isLoading, imageIcon, text1, text2, className }) {
    const theme = useTheme();

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <div>
                    <CardWrapper content={false}>
                        <Card sx={{ display: 'flex', height: '78px', width: '100%' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    width: '25%',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                className={className}
                            >
                                <img src={imageIcon} alt="icon" style={{ width: '80px', height: '40px' }} />
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
                                <Box sx={{ mb: 0 }}>
                                    <Typography component="div" variant="h4" style={{ fontSize: '20px' }}>
                                        {text1}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography component="div" variant="body1">
                                        {text2}
                                    </Typography>
                                </Box>
                            </Box>
                        </Card>
                    </CardWrapper>
                </div>
            )}
        </>
    );
}

DoubleCardNoClick.propTypes = {
    isLoading: PropTypes.bool,
    imageIcon: PropTypes.node,
    text1: PropTypes.string,
    text2: PropTypes.string,
    className: PropTypes.string
};

export default DoubleCardNoClick;
