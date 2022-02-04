
export const yamlNodeTypes = [
    {
        type: "to_yaml",
        label: "to_yaml",
        description: "Convert object to yaml string",
        inputs: (ports: any) => [
            { name: 'object', label: 'object', type: 'any' },
        ],
        outputs: (ports: any) => [
            { name: 'yaml', label: 'yaml', type: 'string' },
        ],
        code: async ({object}: any) => {
            const YAML = await import('yaml');
            return { yaml: YAML.stringify(object) };    
        },
    },
];
