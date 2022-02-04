import { popupData } from '../components/molecules/PopupInput';
import { resultData } from '../components/molecules/PopupResult';
import { NodeType } from '../helpers/runEngine';

export const uiState = {
        selectedNode: null as NodeType
};

export const otherNodeTypes = [
    {
        type: "if",
        label: "if",
        description: "If else",
        inputs: (ports: any) => [
            { name: '_if', label: 'if', type: 'boolean' },
            { name: '_then', label: 'then', type: 'any', conditional: true },
            { name: '_else', label: 'else', type: 'any', conditional: true },
        ],
        outputs: (ports: any) => (d: any) => {
            return [
                { name: 'result', label: 'result', type: 'any' },
            ];
        },
        code: async (inputValues: any) => {
            if (inputValues._if) {
                const r = await inputValues._then();
                return { result: r };
            } else {
                const r = await inputValues._else();
                return { result: r };
            }
        },
    },
    {
        type: "string",
        label: "string",
        description: "String type",
        inputs: (ports: any) => [
            { name: 'string', label: 'string', type: 'string' },
        ],
        outputs: (ports: any) => [
            { name: 'string', label: 'string', type: 'string' },
        ],
        code: ({string}: any) => {
            return { string };
        },
    },
    {
        type: "number",
        label: "number",
        description: "Number type",
        inputs: (ports: any) => [
            { name: 'number', label: 'number', type: 'number' },
        ],
        outputs: (ports: any) => [
            { name: 'number', label: 'number', type: 'number' },
        ],
        code: ({number}: any) => {
            return { number };
        },
    },
    {
        // only used for subgraphs
        type: "input",
        label: "input",
        description: "Only used for subgraphs",
        outputs: (ports: any) => () => [
            ...uiState?.selectedNode?.inputs?.map((n) => {
                return { name: n.name, label: n.name, type: n.type };
            }),
        ],
        code: (inputValues: any, graphInputs: any) => {
            return { ...graphInputs };
        },
    },
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
    {
        type: "ascii_art",
        label: "ascii_art",
        description: "Ascii art from image files",
        inputs: (ports: any) => [
            ports.filearray(),
        ],
        outputs: (ports: any) => [
            {name: 'string', type: 'string'},
        ],
        code: async ({filearray}: any) => {
            const ramp = '＠％＃＊＋＝ー：。　';
            return new Promise((resolve, reject) => {
                let out = '';
                var reader = new FileReader();
                reader.onload = function(event){
                    var img = new Image();
                    img.onload = function(){
                        const canvas = document.createElement('canvas');
                        // canvas.style.position = "absolute";
                        //document.body.append(canvas);
                        const ctx = canvas.getContext('2d');
                        canvas.width = 40;
                        canvas.height = 30;
                        ctx.drawImage(img,0,0,img.width,img.height,0,0,40,30);
                        const d = ctx.getImageData(0, 0, 40, 30).data;
                        for (var y=0; y<30; y++) {
                            for (var x=0; x<40; x++) {
                                const idx = y*(40*4) + x*4;
                                const px = d[idx]; // gets the red value for each pixel
                                out += ramp[Math.floor(px/(256/ramp.length))];
                            }
                            out += "\n";
                        }
                        //document.body.removeChild(canvas);
                        resolve({ string: out });
                    }
                    img.src = event.target.result as any;
                }
                reader.readAsDataURL(filearray[0]); 
            });      
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
            {name: 'all', label: 'all', type: 'boolean'},
        ],
        outputs: (ports: any) => [
            {name: 'string', type: 'string'}
        ],
        code: (inputValues: any) => {
            if (inputValues.all) {
                return {string: inputValues.source.replaceAll(inputValues.find, inputValues.replace)};
            } else {
                return {string: inputValues.source.replace(inputValues.find, inputValues.replace)};
            }
        },
    },
    {
        type: "string_fallback",
        label: "string_fallback",
        description: "Use first input if not blank, otherwise use second",
        inputs: (ports: any) => [
            { name: 'string1', label: 'string1', type: 'string' },
            { name: 'string2', label: 'string2', type: 'string' },
        ],
        outputs: (ports: any) => [
            { name: 'string', label: 'string', type: 'string' },
        ],
        code: ({string1, string2}: any) => {
            return { string: string1 || string2 };
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
            {name: 'body', label: 'body', type: 'string'}
        ],
        code: async (inputValues: any) => {
            const r = await fetch(inputValues.url);
            const body = await r.text();
            return { body };
        },
    },
    {
        type: "json_parse",
        label: "json_parse",
        description: "Make api call",
        inputs: (ports: any) => [
            {name: 'json', label: 'json', type: 'string'},
        ],
        outputs: (ports: any) => [
            {name: 'data', label: 'data', type: 'any'}
        ],
        code: (inputValues: any) => {
            const data = JSON.parse(inputValues.json);
            return { data };
        },
    },
    {
        type: "data_select",
        label: "data_select",
        description: "Select data from an object. See jsonpath on npm for syntax",
        inputs: (ports: any) => [
            {name: 'data', label: 'data', type: 'any'},
            {name: 'query', label: 'query', type: 'string'},
            {name: 'array', label: 'array', type: 'boolean'},
        ],
        outputs: (ports: any) => [
            {name: 'data', label: 'data', type: 'any'}
        ],
        code: async (inputValues: any) => {
            const jsonpath = await import('jsonpath');
            const data = jsonpath.query(inputValues.data, inputValues.query);
            if (inputValues.array) {
                return { data };
            } else {
                return { data: data?.[0] };
            }
        },
    },
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
    {
        type: "add_values_to_array_object",
        label: "add_values_to_array_object",
        description: "add data from array items to array objects with key",
        inputs: (ports: any) => [
            {name: 'array_of_objects', label: 'array_of_objects', type: 'any'},
            {name: 'array', label: 'array', type: 'any'},
            {name: 'key', label: 'key', type: 'string'},
        ],
        outputs: (ports: any) => [
            {name: 'data', label: 'data', type: 'any'}
        ],
        code: async (inputValues: any) => {
            inputValues.array_of_objects.forEach((o: any, i: number) => {
                o[inputValues.key] = inputValues.array[i];
            });
            return { data: inputValues.array_of_objects };
        },
    },
    {
        type: "show_string",
        label: "show_string",
        description: "Displays the string in a popup",
        inputs: (ports: any) => [
            { name: "string", label: "string", type: "string" }
        ],
        outputs: (ports: any) => [
            { name: "string", label: "string", type: "string" }
        ],
        code: async (inputValues: any) => {
            await resultData.display(inputValues.string);
            return {string: inputValues.string};
        },
    },
];
