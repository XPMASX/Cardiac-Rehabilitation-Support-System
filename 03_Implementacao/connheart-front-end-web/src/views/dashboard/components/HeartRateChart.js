import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { styled } from '@mui/material/styles';

const HeartRateChart = ({ data, color, timeSpan, startDate, endDate, height, margin }) => {
    const formattedData = data.map((item) => ({
        timestamp: new Date(item.Data), // Ensure timestamp is a Date object
        BPM: item.BatCardiaco,
        period: item.period
    }));

    console.log(formattedData);

    // Determine the actual time span for 'between'
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

    // Separate data into active and sleep periods for year and long between spans
    const activeData = formattedData.filter((item) => item.period === 'active');
    const sleepData = formattedData.filter((item) => item.period === 'sleep');

    const formatXAxis = (tickItem) => {
        const date = new Date(tickItem);
        if (actualTimeSpan === 'day' || actualTimeSpan === 'week') {
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${hours}:${minutes}`; // Format as hh:mm
        } else {
            const day = date.getDate().toString().padStart(2, '0');
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            return `${day}/${month}`; // Format as dd/mm
        }
    };

    const customLabel = (props) => {
        const { active, payload } = props;
        if (active && payload && payload.length) {
            const date = new Date(payload[0].payload.timestamp);
            let options;
            if (actualTimeSpan === 'year') {
                options = {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                };
            } else {
                options = {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                };
            }
            const formattedDate = new Intl.DateTimeFormat('pt-PT', options).format(date);

            if (actualTimeSpan === 'year') {
                let tooltipContent = payload
                    .map((p) => {
                        let periodText = p.payload.period === 'active' ? 'Ativo' : 'Sono';
                        let periodColor = p.payload.period === 'sleep' ? '#8884d8' : color; // Apply color conditionally
                        return `<span style="color: ${periodColor};">${periodText}: BPM: ${p.value}</span>`;
                    })
                    .join('<br/>');

                return (
                    <CustomTooltipContainer>
                        <CustomTooltipLabel>{formattedDate}</CustomTooltipLabel>
                        <CustomTooltipIntro
                            style={{ color: color }}
                            dangerouslySetInnerHTML={{ __html: tooltipContent }}
                        ></CustomTooltipIntro>
                    </CustomTooltipContainer>
                );
            } else {
                return (
                    <CustomTooltipContainer>
                        <CustomTooltipLabel>{formattedDate}</CustomTooltipLabel>
                        <CustomTooltipIntro style={{ color: color }}>{`BPM: ${payload[0].value}`}</CustomTooltipIntro>
                    </CustomTooltipContainer>
                );
            }
        }

        return null;
    };

    return (
        <ResponsiveContainer width="100%" height={height}>
            <LineChart data={actualTimeSpan === 'year' ? activeData : formattedData} margin={{ left: margin }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" tickFormatter={formatXAxis} />
                <YAxis domain={[40, 120]} />
                <Tooltip content={customLabel} />
                <Line type="monotone" dataKey="BPM" stroke={color} dot={false} strokeWidth={3} />
                {actualTimeSpan === 'year' && (
                    <Line type="monotone" dataKey="BPM" data={sleepData} stroke="#8884d8" dot={false} strokeWidth={3} />
                )}
            </LineChart>
        </ResponsiveContainer>
    );
};

export default HeartRateChart;

const CustomTooltipContainer = styled('div')(({ theme }) => ({
    backgroundColor: 'white',
    border: '1px solid #ccc', // Gray border, same color as the chart axis
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
