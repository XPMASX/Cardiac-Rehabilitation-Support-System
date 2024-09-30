import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { styled } from '@mui/material/styles';

const StepsBarChart = ({ data, color, height, timeSpan, startDate, endDate }) => {
    let actualTimeSpan = timeSpan;
    if (timeSpan === 'between' && startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffInDays = (end - start) / (1000 * 60 * 60 * 24);

        if (diffInDays <= 1) {
            actualTimeSpan = 'day';
        } else if (diffInDays <= 7) {
            actualTimeSpan = 'week';
        } else if (diffInDays <= 30) {
            actualTimeSpan = 'month';
        } else {
            actualTimeSpan = 'year';
        }
    }

    const formattedData = data.map((item) => {
        if (actualTimeSpan !== 'day') {
            return {
                timestamp: new Date(item.Data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }), // Format as dd/mm
                steps: item.Passos
            };
        } else {
            return {
                timestamp: new Date(item.Data).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }), // Format as hh:mm
                steps: item.Passos
            };
        }
    });

    const customLabel = (props) => {
        const { active, payload } = props;
        if (active && payload && payload.length) {
            return (
                <CustomTooltipContainer>
                    <CustomTooltipLabel>{payload[0].payload.timestamp}</CustomTooltipLabel>
                    <CustomTooltipIntro style={{ color: color }}>{`Passos: ${payload[0].value}`}</CustomTooltipIntro>
                </CustomTooltipContainer>
            );
        }

        return null;
    };

    const CustomReferenceLabel = ({ viewBox }) => {
        const { x, y, width } = viewBox;
        const labelWidth = 120; // Width of the label
        const labelX = x + width / 2 - labelWidth / 2; // Center the label

        return (
            <foreignObject x={labelX} y={y - 30} width={labelWidth} height={30}>
                <CustomReferenceLabelContainer>Objetivo diário</CustomReferenceLabelContainer>
            </foreignObject>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={height}>
            <BarChart data={formattedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis domain={[0, 8000]} />
                <Tooltip content={customLabel} />
                <Bar dataKey="steps" fill={color} />
                <ReferenceLine y={5000} label={<CustomReferenceLabel />} stroke="green" strokeDasharray="15 5" strokeWidth={2} />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default StepsBarChart;

const CustomTooltipContainer = styled('div')(({ theme }) => ({
    backgroundColor: 'white',
    border: '1px solid #ccc',
    padding: '10px',
    borderRadius: '4px',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)'
}));

const CustomTooltipLabel = styled('p')(({ theme }) => ({
    margin: 0,
    fontWeight: 'bold'
}));

const CustomTooltipIntro = styled('p')(({ theme }) => ({
    margin: 0
}));

const CustomReferenceLabelContainer = styled('div')({
    backgroundColor: 'rgba(240, 240, 240, 0.8)', // Semi-transparent background
    padding: '5px',
    color: 'black', // Text color set to black
    fontWeight: 'bold',
    borderRadius: '4px',
    textAlign: 'center'
});
