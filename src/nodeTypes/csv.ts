
export const csvNodeTypes = [
    {
        type: "parse_csv",
        label: "parse_csv",
        description: "Convert csv string to array of objects or arrays",
        inputs: (ports: any) => [
            { name: 'csv', label: 'csv', type: 'string' },
            { name: 'objects', label: 'objects', type: 'boolean' },
        ],
        outputs: (ports: any) => [
            { name: 'object', label: 'object', type: 'any' },
        ],
        code: async ({csv, objects}: any) => {
            const csvString = await import('csv-string');
            const res = csvString.parse(csv, objects ? {output: 'objects'} : undefined);
            return { object: res };
        },
    },
];
