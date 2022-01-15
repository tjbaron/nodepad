
export const mathNodeTypes = [
    {
        type: "math_equation",
        label: "math_equation",
        description: "Arbitrary mathimatical expression",
        inputs: (ports: any)  => (inputData: any) => {
            const eqString = inputData?.equation?.string;
            const inp = [];
            if (eqString) {
                const vars = eqString.match(/[a-zA-Z_]+[a-zA-Z0-9_]*/g) || [];
                console.log(vars);
                for (const v of vars) {
                    console.log(v);
                    inp.push({name: v, label: v, type: 'any'});
                }
            }    
            return [
                {name: 'equation', label: 'equation', type: 'string'},
                ...inp
            ]        
        },
        outputs: (ports: any) => [
            {name: 'number', label: 'number', type: 'any'},
        ],
        code: async ({equation, ...data}: any) => {
            const { evaluate } = await import('mathjs');
            return {number: evaluate(equation, data)};
        },
    },
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
