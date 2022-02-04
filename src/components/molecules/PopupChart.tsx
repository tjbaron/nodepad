import styled from "@emotion/styled";
import * as React from 'react';
import { useState } from "react";
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

export const PopupLineChart = () => {
    const defaultData = {
        data: null, x: 'x', y: 'y', xistimestamp: false, onClose: null
    };
    const [lineChartData, setLineChartData] = useState(defaultData);
    const [recharts, setRecharts] = useState(null);

    React.useEffect(() => {
        if (lineChartData) {
            (async () => {
                const lib = await import('recharts');
                setRecharts(lib);
            })();
        }
    }, lineChartData.data);

    renderChart.lineChart = setLineChartData;
    if (!lineChartData?.data || !recharts) return <></>;
    const { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } = recharts;

    const lines = [];
    for (var i=0; i<lineColors.length; i++) {
        const key = i === 0 ? 'y' : `y${i+1}`;
        if (!(lineChartData as any)[key]) break;
        lines.push(<Line type="monotone" dataKey={(lineChartData as any)[key]} stroke={lineColors[i]} />);
    };

    return <PopupChart>
        <Button onClick={() => {
            setLineChartData(defaultData);
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
    </PopupChart>
  };

const PopupChart = styled(Popup)`
    width: 90%; height: 90%;
    overflow: hidden;
    color: black;
`;
