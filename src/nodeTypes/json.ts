
export const jsonNodeTypes = [
    {
        type: "to_json",
        label: "to_json",
        description: "Convert object to json string",
        inputs: (ports: any) => [
            { name: 'object', label: 'object', type: 'any' },
            { name: 'pretty', label: 'pretty', type: 'boolean' },
        ],
        outputs: (ports: any) => [
            { name: 'json', label: 'json', type: 'string' },
        ],
        code: ({object, pretty}: any) => {
            if (pretty) {
                return { json: JSON.stringify(object, null, 2) };
            } else {
                return { json: JSON.stringify(object) };
            }
        },
    },
    {
        type: "json_parse",
        label: "json_parse",
        description: "Convert json string to object",
        inputs: (ports: any) => [
            { name: 'json', label: 'json', type: 'string' },
        ],
        outputs: (ports: any) => [
            { name: 'object', label: 'object', type: 'any' }
        ],
        code: (inputValues: any) => {
            return { object: JSON.parse(inputValues.json) };
        },
    },
];
