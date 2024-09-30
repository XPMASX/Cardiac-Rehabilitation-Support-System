import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, Typography, SvgIcon } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import IconCuidador from '../../../assets/images/icons/Branco/Icones_Branco-06.svg';
import MainCardDashboard from '../../../ui-component/cards/MainCardDashboard';

const CardWrapper = styled(MainCardDashboard)(({ theme, hover: hovercolor, disabled }) => ({
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    width: '80%',
    marginTop: '2%',
    marginBottom: '4%',
    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
    border: 'none',
    ...(disabled
        ? {}
        : {
              '&:hover': {
                  boxShadow: `0 0 0 1px ${hovercolor}`
              }
          })
}));

function SingleCard({ isLoading, imageIcon, text, to, className, hovercolor, disabled }) {
    const theme = useTheme();

    const cardStyle = disabled ? { cursor: 'default', opacity: 0.5, pointerEvents: 'none' } : {};

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <div>
                    <CardWrapper content={false} hover={hovercolor} disabled={disabled}>
                        <MuiLink component={RouterLink} to={to} underline="none" color="inherit" style={cardStyle}>
                            <Card sx={{ display: 'flex', width: '100%', height: '100px' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        width: '35%',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                    className={className}
                                >
                                    <img src={imageIcon} alt="icon" style={{ width: '65%', height: '65%' }} />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        width: '50%',
                                        flex: 'auto',
                                        flexDirection: 'column',
                                        alignContent: 'flex-start',
                                        justifyContent: 'space-around',
                                        padding: '12px'
                                    }}
                                >
                                    <Box>
                                        <Typography component="div" variant="body1">
                                            {text}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                        </MuiLink>
                    </CardWrapper>
                </div>
            )}
        </>
    );
}

SingleCard.propTypes = {
    isLoading: PropTypes.bool,
    imageIcon: PropTypes.node,
    text: PropTypes.string,
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    hovercolor: PropTypes.string,
    disabled: PropTypes.bool
};

export default SingleCard;
