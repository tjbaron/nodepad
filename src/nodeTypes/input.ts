import { popupData } from '../components/molecules/PopupInput';

export const inputNodeTypes = [
    {
        type: "input_string",
        label: "input_string",
        description: "Allows user to input a string",
        inputs: (ports: any) => [
            { name: "description", label: "description", type: "string" }
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
            { name: "description", label: "description", type: "string" }
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
        type: "input_files",
        label: "input_files",
        description: "Allows user to input 1 or more files",
        inputs: (ports: any) => [],
        outputs: (ports: any) => [
            ports.filearray()
        ],
        code: async (inputValues: any) => {
            return new Promise((resolve, reject) => {
                const inp = document.createElement('input');
                inp.setAttribute('type', 'file');
                inp.setAttribute('multiple', 'true');
                inp.onchange = () => {
                    resolve({filearray: inp.files});
                };
                setTimeout(() => {
                    inp.click();
                }, 10);
            });
        },
    },
];
