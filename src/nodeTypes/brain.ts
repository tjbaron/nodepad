declare const brain;

export const brainNodeTypes = [
    {
        type: "brain_create",
        label: "brain_create",
        description: "Create a neural network",
        inputs: (ports: any)  => [
            {name: 'layercount', label: 'layercount', type: 'number'},
            {name: 'layersize', label: 'layersize', type: 'number'},
        ],
        outputs: (ports: any) => [
            {name: 'brain', label: 'brain', type: 'brain'},
        ],
        code: async ({layercount, layersize}: any) => {
            const lcount = Math.min(Math.max(0, layercount), 20);
            const lsize = Math.min(Math.max(1, layersize), 50);
            const config = {
                binaryThresh: 0.5,
                hiddenLayers: new Array(lcount).fill(lsize),
                activation: 'sigmoid',
                leakyReluAlpha: 0.01,
                learningRate: 0.01,
                decayRate: 0.999,
            };
            const b = new brain.NeuralNetwork(config);
            return { brain: b };
        },
    },
    {
        type: "brain_train_next",
        label: "brain_train_next",
        description: "Train a neural network to predict next number in a series",
        inputs: (ports: any)  => [
            {name: 'brain', label: 'brain', type: 'brain'},
            {name: 'series', label: 'series', type: 'string'},
            {name: 'lookback', label: 'lookback', type: 'number'},
        ],
        outputs: (ports: any) => [
            {name: 'brain', label: 'brain', type: 'brain'},
        ],
        code: async ({brain, series, lookback}: any) => {
            const d = series.split(',').map((e) => Number(e));
            const data = [];
            for (let i=lookback; i<d.length; i++) {
                data.push({ input: [...d].splice(i-lookback, lookback), output: [d[i]] });
            }
            brain?.train(data);
            return { brain };
        },
    },
    {
        type: "brain_predict",
        label: "brain_predict",
        description: "Neural network makes prediction based on inputs",
        inputs: (ports: any)  => [
            {name: 'brain', label: 'brain', type: 'brain'},
            {name: 'input', label: 'input', type: 'string'},
        ],
        outputs: (ports: any) => [
            {name: 'result', label: 'result', type: 'any'},
        ],
        code: async ({brain, input}: any) => {
            const d = input.split(',').map((e) => Number(e));
            return { result: brain?.run(d) };
        },
    },
];
