
export const renderChart = {
    lineChart: (data: {data: any, x: string, y: string, xistimestamp: boolean, onClose: any}) => {},
};

export const chartNodeTypes = [
    {
        type: "line_chart",
        label: "line_chart",
        description: "Display line chart",
        inputs: (ports: any) => (inputData: any) => {
            const ylist = [{name: 'y', label: 'y', type: 'string'}];
            let i = 1;
            while (inputData[i === 1 ? `y` : `y${i}`]?.string) {
                i++;
                ylist.push({name: `y${i}`, label: `y${i}`, type: 'string'});
            }
            return [
                {name: 'data', label: 'data', type: 'any'},
                {name: 'x', label: 'x', type: 'string'},
                ...ylist,
                {name: 'xistimestamp', label: 'x is timestamp', type: 'boolean'},
            ]
        },
        outputs: (ports: any) => [
            {name: 'data', label: 'data', type: 'any'}
        ],
        code: async (data: any) => {
            if (data.xistimestamp) {
                data.data.forEach((ele: any) => {
                    ele[data.x] = new Date(ele[data.x])?.toLocaleDateString();
                });
            };
            await new Promise((next) => {
                renderChart.lineChart({...data, onClose: next});
            });
            return {data};
        },
    },
];
