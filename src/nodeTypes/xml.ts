
export const xmlNodeTypes = [
    {
        type: "xml_select",
        label: "xml_select",
        description: "Select data from an xml string. See xpath on npm for syntax",
        inputs: (ports: any) => [
            {name: 'data', label: 'data', type: 'string'},
            {name: 'query', label: 'query', type: 'string'},
        ],
        outputs: (ports: any) => [
            {name: 'data', label: 'data', type: 'string'}
        ],
        code: async (inputValues: any) => {
            const { DOMParser } = await import('@xmldom/xmldom');
            const xpath = await import('xpath');
            var doc = new DOMParser().parseFromString(inputValues.data);
            var data = xpath.select(`string(${inputValues.query})`, doc);
            return { data };
        },
    },
];
