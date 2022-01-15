import styled from "@emotion/styled";
import * as React from 'react';
import { useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { renderChart } from "../../nodeTypes/charts";
import { Button } from "../atoms/Button";
import { Popup } from "../atoms/Popup";

const lineColors = [
    'rgb(144,144,255)',
    'rgb(255,144,144)',
    'rgb(144,255,144)',
    'rgb(144,255,255)',
    'rgb(255,144,255)',
    'rgb(255,255,144)',
];

export const LineChartPopup = () => {
    const [lineChartData, setLineChartData] = useState({
        data: null, x: 'x', y: 'y', xistimestamp: false, onClose: null
    });
    renderChart.lineChart = setLineChartData;
    if (!lineChartData?.data) return <></>;

    const lines = [];
    for (var i=0; i<lineColors.length; i++) {
        const key = i === 0 ? 'y' : `y${i+1}`;
        if (!(lineChartData as any)[key]) break;
        lines.push(<Line type="monotone" dataKey={(lineChartData as any)[key]} stroke={lineColors[i]} />);
    };

    return <ChartPopup>
        <Button onClick={() => {
            setLineChartData(null);
            lineChartData.onClose?.();
        }}>Close</Button>
        <ResponsiveContainer>
            <LineChart data={lineChartData.data}>
                {...lines}
                {lineChartData.x && <XAxis dataKey={lineChartData.x} />}
                <YAxis />
                <Tooltip />
            </LineChart>
        </ResponsiveContainer>
    </ChartPopup>
  };

const ChartPopup = styled(Popup)`
    inset: 30px;
    overflow: hidden;
    color: black;
`;
