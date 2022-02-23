
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
    {
        type: "parse_yaml",
        label: "parse_yaml",
        description: "Convert yaml string to object",
        inputs: (ports: any) => [
            { name: 'yaml', label: 'yaml', type: 'string' },
        ],
        outputs: (ports: any) => [
            { name: 'object', label: 'object', type: 'any' },
        ],
        code: async ({yaml}: any) => {
            const YAML = await import('yaml');
            return { object: YAML.parse(yaml) };    
        },
    },
];
