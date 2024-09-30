import PropTypes from 'prop-types';

import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Link as MuiLink } from '@mui/material';
import MainCardDashboard from '../../../ui-component/cards/MainCardDashboard';
import { height } from '@mui/system';

// Modify the CardWrapper to accept and use the disabled prop
const CardWrapper = styled(MainCardDashboard)(({ theme, hover: hovercolor, disabled }) => ({
    color: '#fff',
    overflow: 'hidden',
    position: 'relative',
    width: '100%',
    height: '100%',
    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
    border: 'none',
    // Conditionally apply hover effect based on disabled prop
    ...(disabled
        ? {}
        : {
              '&:hover': {
                  boxShadow: `0 0 0 1px ${hovercolor}`
              }
          })
}));

// Add disabled prop to the DoubleCard component
function DoubleCard({ isLoading, imageIcon, text1, text2, to, className, hovercolor, disabled }) {
    const theme = useTheme();
    const cardStyle = disabled ? { cursor: 'default', opacity: 0.5, pointerEvents: 'none' } : {};

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <div style={{ height: '100px' }}>
                    <CardWrapper content={false} hover={hovercolor} disabled={disabled}>
                        <MuiLink component={RouterLink} to={to} underline="none" color="inherit" style={cardStyle}>
                            <Card sx={{ display: 'flex', overflow: 'hidden', height: '100%' }}>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        width: '35%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '100%'
                                    }}
                                    className={className}
                                >
                                    <img src={imageIcon} alt="icon" style={{ width: '80px', height: '80px' }} />
                                </Box>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        flex: 'auto',
                                        flexDirection: 'column',
                                        alignContent: 'flex-start',
                                        justifyContent: 'space-around',
                                        padding: '12px',
                                        height: '100%'
                                    }}
                                >
                                    <Box>
                                        <Typography component="div" variant="h4" style={{ fontSize: '18px' }}>
                                            {text1}
                                        </Typography>
                                    </Box>
                                    <Box>
                                        <Typography component="div" variant="body1" style={{ fontSize: '12px' }}>
                                            {text2}
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

// Update PropTypes to include the disabled prop
DoubleCard.propTypes = {
    isLoading: PropTypes.bool,
    imageIcon: PropTypes.node,
    text1: PropTypes.string,
    text2: PropTypes.string,
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    hovercolor: PropTypes.string,
    disabled: PropTypes.bool // Add validation for the new disabled prop
};

export default DoubleCard;
