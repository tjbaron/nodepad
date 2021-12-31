
export const mathNodeTypes = [
    {
        type: "math_add",
        label: "math_add",
        description: "Addition operation",
        inputs: (ports: any) => [
            {name: 'a', label: 'a', type: 'number'},
            {name: 'b', label: 'b', type: 'number'},
        ],
        outputs: (ports: any) => [
            ports.number()
        ],
        code: (inputValues: any) => {
            return {number: inputValues.a + inputValues.b};
        },
    },
    {
        type: "math_subtract",
        label: "math_subtract",
        description: "Subtract operation",
        inputs: (ports: any) => [
            {name: 'a', label: 'a', type: 'number'},
            {name: 'b', label: 'b', type: 'number'},
        ],
        outputs: (ports: any) => [
            ports.number()
        ],
        code: (inputValues: any) => {
            return {number: inputValues.a - inputValues.b};
        },
    },
    {
        type: "math_multiply",
        label: "math_multiply",
        description: "Multiply operation",
        inputs: (ports: any) => [
            {name: 'a', label: 'a', type: 'number'},
            {name: 'b', label: 'b', type: 'number'},
        ],
        outputs: (ports: any) => [
            ports.number()
        ],
        code: (inputValues: any) => {
            return {number: inputValues.a * inputValues.b};
        },
    },
    {
        type: "math_divide",
        label: "math_divide",
        description: "Divide operation",
        inputs: (ports: any) => [
            {name: 'a', label: 'a', type: 'number'},
            {name: 'b', label: 'b', type: 'number'},
        ],
        outputs: (ports: any) => [
            ports.number()
        ],
        code: (inputValues: any) => {
            return {number: inputValues.a / inputValues.b};
        },
    },
];
