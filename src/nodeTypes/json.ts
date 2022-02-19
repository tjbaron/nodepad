
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
        code: async ({object, pretty}: any) => {
            if (pretty) {
                return { yaml: JSON.stringify(object, null, 2) };
            } else {
                return { yaml: JSON.stringify(object) };
            }
        },
    },
];
