import { FlumeConfig, RootEngine } from "@tjbaron/flume";
import { nodeTypes } from "../nodeTypes";
import { portTypes } from "../portTypes";

export type NodeType = {
    type: string,
    description: string,
    inputs: {name: string, type: string}[],
    outputs: {name: string, type: string}[],
    // testCases: {input: any, output: any}[],
    // defaultOutput: any,
    subgraph?: any,
    code?: any,
};

export let config: any; // typeof FlumeConfig
export const remakeFlume = (customNodes: any[] = []) => {
    config = new FlumeConfig();
    config.addRootNodeType({
        type: "output",
        label: "output",
        description: "Output node",
        inputs: (ports: any) => [
            {name: 'result', label: 'result', type: 'any'},
        ],
    })
    portTypes.forEach((p) => {
        config.addPortType(p);
    });
    nodeTypes.forEach((n) => {
        config.addNodeType(n);
    });
    customNodes.forEach((n) => {
        config.addNodeType(makeNodeType(n));
    });
};
remakeFlume();

export const makeNodeType = (d: NodeType) => {
    const newNodeType = {
        type: d.type,
        label: d.type,
        description: d.description,
        inputs: () => d.inputs.map((e) => ({name: e.name, type: e.type, label: e.name})),
        outputs: () => d.outputs.map((e) => ({name: e.name, type: e.type, label: e.name})),
        // code: (v: any) => {
        //     testcase: for (const testCase of d.testCases) {
        //         for (const testIn in testCase.input) {
        //             if (testCase.input[testIn] === v[testIn]) {
        //                 continue testcase;
        //             }
        //         }
        //         return testCase.output;
        //     }
        //     return d.defaultOutput || {};
        // },
    };
    console.log(newNodeType);
    return newNodeType;
};

const resolvePorts = (portType: any, data: any) => {
    switch (portType) {
        case 'string':
            return data.string
        case 'number':
            return data.number
        case 'boolean':
            return data.boolean
        case 'any':
            return data.string || data.number || data.boolean
        default:
            return data
    }
}

export const runEngine = async (nodes: any, customNodeTypes: any) => {
    const resolveNodes = async (node: any, inputValues: any, nodeType: any, context: any) => {
        const foundNode: NodeType = nodeTypes.find(({type}) => type === node.type) || customNodeTypes.find(({type}: any) => type === node.type);
        if (foundNode?.code) {
            try {
                const result = await foundNode.code(inputValues);
                return result;
            } catch (e) {
                console.warn(node.type, e);
                return {};
            }
        } else if (foundNode?.subgraph) {
            console.log(`Running subgraph ${foundNode.type}`);
            return runEngine(foundNode?.subgraph, customNodeTypes);
        }
        console.warn(`No implementation for ${node.type}.`);
        return {};
    }
  
    const engine = new RootEngine(config, resolvePorts, resolveNodes)
    return await engine.resolveRootNode(nodes)
}
