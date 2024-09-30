export default function componentStyleOverrides(theme) {
    const bgColor = theme.colors?.grey50;
    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    fontWeight: 500,
                    borderRadius: '4px'
                }
            }
        },
        MuiPaper: {
            defaultProps: {
                elevation: 0
            },
            styleOverrides: {
                root: {
                    backgroundImage: 'none'
                },
                rounded: {
                    borderRadius: `${theme?.customization?.borderRadius}px`
                }
            }
        },
        MuiCardHeader: {
            styleOverrides: {
                root: {
                    color: theme.colors?.textDark,
                    backgroundColor: theme.colors?.secondary200,
                    padding: '24px'
                },
                title: {
                    color: theme.colors?.primaryDark,
                    fontSize: '1.125rem'
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '16px',
                    '& .CardioId-CardContent-Events-counter': {
                        background: theme.colors?.errorLight,
                        color: theme.paper
                    },
                    '& .CardioId-CardContent-Active-Groups-counter': {
                        background: theme.colors?.primary200,
                        color: theme.paper
                    },
                    '& .CardioId-CardContent-Active-Patients-counter': {
                        background: theme.colors?.primaryDark,
                        color: theme.paper
                    },
                    '& .CardioId-CardContent-Planos-counter': {
                        background: theme.colors?.primaryDark,
                        color: theme.paper
                    },
                    '& .DashboardPaciente-Consultar-counter': {
                        background: theme.colors?.primary200,
                        color: theme.paper
                    },
                    '& .DashboardPaciente-Atualizar-counter': {
                        background: theme.colors?.secondary800,
                        color: theme.paper
                    }
                }
            }
        },
        MuiCardActions: {
            styleOverrides: {
                root: {
                    padding: '24px'
                }
            }
        },
        MuiListItemButton: {
            styleOverrides: {
                root: {
                    color: theme.paper,
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    '&.Mui-selected': {
                        color: theme.menuSelected,
                        backgroundColor: theme.menuSelectedBack,
                        '&:hover': {
                            backgroundColor: theme.menuSelectedBack
                        },
                        '& .MuiListItemIcon-root': {
                            color: theme.menuSelected,
                            fill: theme.menuSelected
                        }
                    },
                    '&:hover': {
                        backgroundColor: theme.menuSelectedBack,
                        color: theme.menuSelected,
                        '& .MuiListItemIcon-root': {
                            color: theme.menuSelected,
                            fill: theme.menuSelected
                        }
                    }
                }
            }
        },
        MuiListItemIcon: {
            styleOverrides: {
                root: {
                    color: theme.paper,
                    minWidth: '36px',
                    fill: theme.paper
                }
            }
        },
        MuiListItemText: {
            styleOverrides: {
                primary: {
                    color: theme.textDark
                }
            }
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    color: theme.textDark,
                    '&::placeholder': {
                        color: theme.darkTextSecondary,
                        fontSize: '0.875rem'
                    }
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    background: bgColor,
                    borderRadius: `${theme?.customization?.borderRadius}px`,
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.colors?.grey400
                    },
                    '&:hover $notchedOutline': {
                        borderColor: theme.colors?.primaryLight
                    },
                    '&.MuiInputBase-multiline': {
                        padding: 1
                    }
                },
                input: {
                    fontWeight: 500,
                    background: bgColor,
                    padding: '15.5px 14px',
                    borderRadius: `${theme?.customization?.borderRadius}px`,
                    '&.MuiInputBase-inputSizeSmall': {
                        padding: '10px 14px',
                        '&.MuiInputBase-inputAdornedStart': {
                            paddingLeft: 0
                        }
                    }
                },
                inputAdornedStart: {
                    paddingLeft: 4
                },
                notchedOutline: {
                    borderRadius: `${theme?.customization?.borderRadius}px`
                }
            }
        },
        MuiSlider: {
            styleOverrides: {
                root: {
                    '&.Mui-disabled': {
                        color: theme.colors?.grey300
                    }
                },
                mark: {
                    backgroundColor: theme.paper,
                    width: '4px'
                },
                valueLabel: {
                    color: theme?.colors?.primaryLight
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: theme.colors?.primaryDark,
                    opacity: 1
                }
            }
        },
        MuiAvatar: {
            styleOverrides: {
                root: {
                    color: theme.colors?.primaryDark,
                    background: theme.colors?.primary200
                }
            }
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    '&.MuiChip-deletable .MuiChip-deleteIcon': {
                        color: 'inherit'
                    }
                }
            }
        },
        MuiTooltip: {
            styleOverrides: {
                tooltip: {
                    color: theme.paper,
                    background: theme.colors?.grey700
                }
            }
        },
        MuiDataGrid: {
            styleOverrides: {
                root: {
                    '& .MuiDataGrid-columnHeader': {
                        backgroundColor: theme.colors?.secondaryDark // Replace 'desiredColor' with the color you want
                    },
                    '& .MuiDataGrid-menuIconButton': {
                        display: 'none'
                    },
                    '& .MuiDataGrid-columnHeaderTitleContainer .MuiDataGrid-iconButtonContainer ': {
                        display: 'none'
                    },
                    '& .CardioId-DataGrid-EventsCell-event': {
                        borderTopLeftRadius: '10px',
                        borderBottomLeftRadius: '10px'
                    },
                    '& .CardioId-DataGrid-EventsCell-lastTrans': {
                        borderTopRightRadius: '10px', // Change this to your desired value
                        borderBottomRightRadius: '10px'
                    },
                    '& .CardioId-DataGrid-EventsCell-Severe': {
                        background: theme.colors?.errorDark,
                        color: theme.paper
                    },
                    '& .CardioId-DataGrid-EventsCell-Mid': {
                        background: theme.colors?.errorLight,
                        color: theme.paper
                    },
                    '& .CardioId-DataGrid-EventsCell-Low': {
                        fontWeight: 'bold'
                    }
                },
                columnHeaders: {
                    color: theme.paper
                },
                columnSeparator: {
                    visibility: 'hidden'
                }
            }
        },
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    '&.progress-bar': {
                        height: '10px', // Adjust this value to make the bar bigger
                        borderRadius: '10px', // Adjust this value to make the bar rounder
                        backgroundColor: theme.colors?.primaryLight,
                        //border: `2px solid ${theme.colors?.secondaryDark}`,
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: theme.colors?.secondaryDark
                        }
                    },
                    '&.progress-bar-reverse': {
                        height: '20px', // Adjust this value to make the bar bigger
                        borderRadius: '10px', // Adjust this value to make the bar rounder
                        backgroundColor: theme.colors?.secondaryDark,
                        border: `1px solid ${theme.colors?.primaryLight}`,
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: theme.colors?.primaryLight
                        }
                    },
                    '&.progress-bar-activeGroup': {
                        height: '10px', // Adjust this value to make the bar bigger
                        borderRadius: '10px', // Adjust this value to make the bar rounder
                        backgroundColor: theme.colors?.primaryLight,
                        //border: `2px solid ${theme.colors?.secondaryDark}`,
                        '& .MuiLinearProgress-bar': {
                            backgroundColor: theme.colors?.primary200
                        }
                    }
                }
            }
        }
    };
}
