import React, { useState } from 'react';
import { Box, Button, IconButton, TextField } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import CloseIcon from '@mui/icons-material/Close';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import ptLocale from 'date-fns/locale/pt'; // Import Portuguese locale
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    unselectedButton: {
        color: theme.palette.primary.dark,
        backgroundColor: '#fff',
        boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
        border: `2px solid ${theme.palette.primary.dark}`,
        cursor: 'pointer',
        '&:hover': {
            border: `2px solid ${theme.palette.primary.dark}`
        }
    },
    selectedButton: {
        color: '#fff',
        backgroundColor: theme.palette.primary.dark,
        boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
        border: `2px solid ${theme.palette.grey['500']}`,
        cursor: 'default',
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
            border: `2px solid ${theme.palette.primary.dark}`
        }
    },
    closeButton: {
        color: theme.palette.text.secondary,
        '&:hover': {
            color: theme.palette.text.secondary // No color change on hover
        }
    },
    button: {
        marginRight: 10 // Adds margin around each button
    },
    betweenButton: {
        marginRight: 0 // Remove margin for the between button
    },
    noHoverEffect: {
        '&:hover': {
            backgroundColor: theme.palette.primary.dark
        }
    },
    buttonGroup: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between', // Ensure proper alignment
        width: '100%'
    },
    datePickerContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%'
    }
}));

const OrderButtonGroup = ({ color, selectedOrder, handleOrder, theme, disabled }) => {
    const classes = useStyles();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showOnlyDatePicker, setShowOnlyDatePicker] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleDateChange = (newStartDate, newEndDate) => {
        setStartDate(newStartDate);
        setEndDate(newEndDate);
        setShowDatePicker(false);
        setShowOnlyDatePicker(false);
        handleOrder('between', newStartDate, newEndDate);
    };

    const resetSelection = () => {
        setShowDatePicker(false);
        setShowOnlyDatePicker(false);
        setStartDate(null);
        setEndDate(null);
        handleOrder('day');
    };

    const handleBetweenClick = () => {
        setShowDatePicker(true);
        setShowOnlyDatePicker(true);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptLocale}>
            {!showOnlyDatePicker && (
                <Box className={classes.buttonGroup}>
                    {['day', 'week', 'month', 'year', 'between'].map((item, index) =>
                        item !== 'between' ? (
                            <Button
                                key={item}
                                variant="text"
                                onClick={() => handleOrder(item)}
                                className={`${selectedOrder === item ? classes.selectedButton : classes.unselectedButton} ${classes.button}`}
                                disabled={disabled}
                            >
                                {['Dia', 'Semana', 'Mês', 'Ano'][index]}
                            </Button>
                        ) : (
                            <Button
                                key={item}
                                variant="text"
                                onClick={handleBetweenClick}
                                className={`${selectedOrder === item ? classes.selectedButton : classes.unselectedButton} ${classes.betweenButton}`}
                                disabled={disabled}
                            >
                                {startDate && endDate
                                    ? `${startDate.toLocaleDateString()} até ${endDate.toLocaleDateString()}`
                                    : 'Entre X/X'}
                                {startDate && endDate && (
                                    <IconButton size="small" onClick={resetSelection} className={classes.closeButton} disabled={disabled}>
                                        <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                )}
                            </Button>
                        )
                    )}
                </Box>
            )}
            {showDatePicker && (
                <Box className={classes.datePickerContainer}>
                    <DesktopDatePicker
                        label="Desde"
                        inputFormat="dd/MM/yyyy"
                        value={startDate}
                        onChange={(date) => setStartDate(date)}
                        minDate={new Date('2023-07-01')}
                        maxDate={new Date()}
                        shouldDisableDate={(date) => endDate && date.getTime() === endDate.getTime()}
                        sx={{ width: '30%' }}
                        renderInput={(params) => <TextField {...params} />}
                        disabled={disabled}
                    />
                    <DesktopDatePicker
                        label="Até"
                        inputFormat="dd/MM/yyyy"
                        value={endDate}
                        onChange={(date) => setEndDate(date)}
                        minDate={startDate}
                        maxDate={new Date()}
                        shouldDisableDate={(date) => startDate && date.getTime() === startDate.getTime()}
                        sx={{ width: '30%' }}
                        renderInput={(params) => <TextField {...params} size="small" />}
                        disabled={disabled}
                    />
                    <Button
                        onClick={() => handleDateChange(startDate, endDate)}
                        sx={{
                            color: theme.palette.text.secondary,
                            '&:hover': {
                                color: color // Change color on hover
                            }
                        }}
                        disabled={disabled}
                    >
                        OK
                    </Button>
                    <IconButton
                        onClick={resetSelection}
                        sx={{
                            color: theme.palette.text.secondary,
                            '&:hover': {
                                color: theme.palette.text.secondary // No color change on hover
                            }
                        }}
                        disabled={disabled}
                    >
                        <CloseIcon />
                    </IconButton>
                </Box>
            )}
        </LocalizationProvider>
    );
};

export default OrderButtonGroup;
