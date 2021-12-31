import { popupData } from "../pages/HomePage";

export const otherNodeTypes = [
    {
        type: "input_string",
        label: "input_string",
        description: "Allows user to input a string",
        inputs: (ports: any) => [
            { name: "description", type: "string" }
        ],
        outputs: (ports: any) => [
            ports.string()
        ],
        code: async (inputValues: any) => {
            const value = await popupData.display(inputValues.description);
            return {string: value};
        },
    },
    {
        type: "input_number",
        label: "input_number",
        description: "Allows user to input a number",
        inputs: (ports: any) => [
            { name: "description", type: "string" }
        ],
        outputs: (ports: any) => [
            ports.number()
        ],
        code: async (inputValues: any) => {
            const value = await popupData.display(inputValues.description);
            return {number: Number(value)};
        },
    },
    {
        type: "string_replace",
        label: "string_replace",
        description: "Replace occurences of a string inside another string",
        inputs: (ports: any) => [
            {name: 'source', label: 'source', type: 'string'},
            {name: 'find', label: 'find', type: 'string'},
            {name: 'replace', label: 'replace', type: 'string'},
        ],
        outputs: (ports: any) => [
            {name: 'string', type: 'string'}
        ],
        code: (inputValues: any) => {
            return {string: inputValues.source.replace(inputValues.find, inputValues.replace)};
        },
    },
    {
        type: "http_fetch",
        label: "http_fetch",
        description: "Make api call",
        inputs: (ports: any) => [
            {name: 'url', label: 'url', type: 'string'},
        ],
        outputs: (ports: any) => [
            {name: 'body', type: 'string'}
        ],
        code: async (inputValues: any) => {
            const r = await fetch(inputValues.url);
            const body = await r.text();
            return { body };
        },
    },
];
