import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import MainCardDashboard from '../../../ui-component/cards/MainCardDashboard';

const CardWrapper = styled(MainCardDashboard)(({ theme, selected }) => ({
    color: selected ? theme.palette.primary.dark : '#fff',
    backgroundColor: selected ? theme.palette.primary.dark : '#fff',
    width: '100%',
    height: '100%',
    boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
    border: selected ? `2px solid ${theme.palette.primary.dark}` : `2px solid ${theme.palette.grey['500']}`,
    cursor: selected ? 'default' : 'pointer',
    '&:hover': {
        border: `2px solid ${theme.palette.primary.dark}`
    }
}));

function SelectableCard({ isLoading, text, selected, onClick, disabled }) {
    const theme = useTheme();
    const cardStyle = disabled ? { opacity: 0.5, pointerEvents: 'none' } : {};

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <div style={{ height: '100%' }}>
                    <CardWrapper content={false} selected={selected} onClick={!disabled ? onClick : undefined} style={cardStyle}>
                        <Card sx={{ display: 'flex', height: '100%' }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexWrap: 'wrap',
                                    flex: 'auto',
                                    flexDirection: 'column',
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                    padding: '12px',
                                    backgroundColor: selected ? theme.palette.primary.dark : '#fff'
                                }}
                            >
                                <Typography
                                    component="div"
                                    variant="h4"
                                    sx={{
                                        fontSize: { xs: '0.85rem', sm: '1rem' }, // Set the font size to 0.9rem for xs and 1rem for sm and above
                                        color: selected ? '#fff' : theme.palette.primary.dark,
                                        textAlign: 'center'
                                    }}
                                >
                                    {text}
                                </Typography>
                            </Box>
                        </Card>
                    </CardWrapper>
                </div>
            )}
        </>
    );
}

SelectableCard.propTypes = {
    isLoading: PropTypes.bool,
    text: PropTypes.string,
    selected: PropTypes.bool,
    onClick: PropTypes.func
};

export default SelectableCard;
