import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Badge, Box, Card, IconButton, MenuItem, Select, Typography } from '@mui/material';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SkeletonEarningCard from 'ui-component/cards/Skeleton/EarningCard';
import { PhotoCamera } from '@mui/icons-material';
import { useState } from 'react';

// assets

const CardWrapper = styled(MainCard)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.dark,
    color: '#fff',
    overflow: 'hidden',
    position: 'relative'
}));

const Input = styled('input')({
    display: 'none'
});

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        color: theme.palette.primary.dark,
        display: true
    }
}));

// ===========================|| DASHBOARD DEFAULT - EARNING CARD ||=========================== //

function HeaderCard({ isLoading }) {
    const theme = useTheme();
    const [userDto, setUserDto] = useState({ type: 'p' });
    const handleType = (event) => {
        setUserDto({ type: event.target.value });
    };

    return (
        <>
            {isLoading ? (
                <SkeletonEarningCard />
            ) : (
                <div>
                    <CardWrapper content={false}>
                        <Card sx={{ display: 'flex' }}>
                            <Box sx={{ display: 'flex' }}>
                                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                <label htmlFor="add-user-avatar">
                                    <Input accept="image/*" id="add-user-avatar" multiple type="file" />
                                    <IconButton component="span" style={{ margin: '15px' }}>
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            badgeContent={<PhotoCamera />}
                                        >
                                            <Avatar
                                                src="/images/example.jpg"
                                                style={{
                                                    width: '90px',
                                                    height: '90px'
                                                }}
                                            />
                                        </StyledBadge>
                                    </IconButton>
                                </label>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        flex: 'auto',
                                        flexDirection: 'column',
                                        alignContent: 'flex-start',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Typography component="div" variant="h5">
                                        TIPO:
                                    </Typography>
                                    <Select autoWidth label="Tipo de Utilizador" value={userDto.type} onChange={handleType}>
                                        <MenuItem value="p">Paciente</MenuItem>
                                    </Select>
                                </Box>
                            </Box>
                        </Card>
                    </CardWrapper>
                </div>
            )}
        </>
    );
}

HeaderCard.propTypes = {
    isLoading: PropTypes.bool
};

export default HeaderCard;
