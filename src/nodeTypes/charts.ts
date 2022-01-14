
export const renderChart = {
    lineChart: (data: {data: any, x: string, y: string, xistimestamp: boolean, onClose: any}) => {},
};

export const chartNodeTypes = [
    {
        type: "line_chart",
        label: "line_chart",
        description: "Display line chart",
        inputs: (ports: any) => [
            {name: 'data', label: 'data', type: 'any'},
            {name: 'x', label: 'x', type: 'string'},
            {name: 'y', label: 'y', type: 'string'},
            {name: 'xistimestamp', label: 'x is timestamp', type: 'boolean'},
        ],
        outputs: (ports: any) => [
            {name: 'data', label: 'data', type: 'any'}
        ],
        code: async ({data, x, y, xistimestamp}: any) => {
            if (xistimestamp) {
                data.forEach((ele: any) => {
                    ele[x] = new Date(ele[x])?.toLocaleDateString();
                });
            };
            await new Promise((next) => {
                renderChart.lineChart({data, x, y, xistimestamp, onClose: next});
            });
            return {data};
        },
    },
];
