import * as math from "mathjs"

// List of operations from mathjs we want to make available
const supported_operations = [
    {name: "add", inputs: ["x", "y"]},
    {name: "subtract", inputs: ["x", "y"]},
    {name: "multiply", inputs: ["x", "y"]},
    {name: "divide", inputs: ["x", "y"]},
    {name: "mod", inputs: ["x", "y"]},
    {name: "pow", inputs: ["x", "y"]},
    {name: "abs", inputs: ["x"]},
    {name: "floor", inputs: ["x"]},
    {name: "ceil", inputs: ["x"]},
    {name: "round", inputs: ["x"]},
    {name: "fix", inputs: ["x"]},
    {name: "dot", inputs: ["x", "y"]},
    {name: "dotMultiply", inputs: ["x", "y"]},
    {name: "dotDivide", inputs: ["x", "y"]},
    {name: "dotPow", inputs: ["x", "y"]},
    {name: "log", inputs: ["x"]},
    {name: "log2", inputs: ["x"]},
    {name: "log10", inputs: ["x"]},
    {name: "exp", inputs: ["x"]},
    {name: "gcd", inputs: ["x", "y"]},
];

export const mathNodeTypes = [
    ...supported_operations.map((op) => {
        return {
            type: `math_${op.name}`,
            label: `math_${op.name}`,
            description: (math.help(math[op.name])?.toJSON() as any)?.description || "",
            inputs: (ports: any) => [
                ...op.inputs.map((e) => (
                    { name: e, label: e, type: 'any' }
                )),
            ],
            outputs: (ports: any) => [
                {name: 'result', label: 'result', type: 'any'},
            ],
            code: async (inputValues: any) => {
                // const math = await import('mathjs');
                const math_op = math[op.name];
                const result = math_op(
                    ...op.inputs.map((e: any) => inputValues[e] as any)
                );
                return { result };
            },
        };
    }),
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
                    if (supported_operations.find((e) => v === e.name)) continue;
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
            // const math = await import('mathjs');
            return {number: math.evaluate(equation, data)};
        },
    },
];
