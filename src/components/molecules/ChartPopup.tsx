import styled from "@emotion/styled";
import * as React from 'react';
import { useState } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { renderChart } from "../../nodeTypes/charts";
import { Button } from "../atoms/Button";
import { Popup } from "../atoms/Popup";

export const LineChartPopup = () => {
    const [lineChartData, setLineChartData] = useState({
      data: null, x: 'x', y: 'y', xistimestamp: false, onClose: null
    });
    renderChart.lineChart = setLineChartData;
    if (!lineChartData?.data) return <></>;
    return <ChartPopup>
      <Button onClick={() => {
        setLineChartData(null);
        lineChartData.onClose?.();
      }}>Close</Button>
      <ResponsiveContainer>
        <LineChart data={lineChartData.data}>
          <Line type="monotone" dataKey={lineChartData.y} stroke="rgb(144,144,255)" />
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
