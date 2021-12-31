import styled from '@emotion/styled';
import {
  createFlumeTheme, FlumeConfig, FlumeThemeProvider, NodeEditor, RootEngine
} from "@tjbaron/flume";
import * as React from 'react';
import { downloadText } from '../helpers/downloadText';
import { portTypes } from '../portTypes';
import { nodeTypes } from '../nodeTypes';
import { importJson } from '../helpers/importJson';

let config: typeof FlumeConfig;
const remakeFlume = (customNodes: any[] = []) => {
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

const downloadProject = (customNodes: any, graph: any) => {
  downloadText(`nodepad-export.json`, JSON.stringify({
    graph,
    customNodes
  }, null, 2));
};

export const HomePage = () => {
    const [customNodeTypes, setCustomNodeTypes] = React.useState([] as {type: string, label: string, description: string, inputs: any, outputs: any}[]);
    const [showNodeCreate, setShowNodeCreate] = React.useState(-2);
    const [nodes, setNodes] = React.useState({});
    const [key, setKey] = React.useState(0);
    // if (loading) return <div>loading...</div>;
    // if (error) return <div>error...</div>;
    return <>
      <EditorHeader>
        <EditorTitle>NodePad</EditorTitle>
        <Button onClick={() => downloadProject(customNodeTypes, nodes)}>Export</Button>
        <Button onClick={async () => {
          const f: any = await importJson();
          console.log(f);
          setCustomNodeTypes(f.customNodes);
          setNodes(f.graph);
          setKey(key+1);
        }}>Import</Button>
        <Button onClick={async () => {
          const result = await runEngine(nodes, customNodeTypes);
          alert(JSON.stringify(result));
        }}>Run</Button>
      </EditorHeader>
      <CustomNodeList>
        <Button onClick={() => {
          setShowNodeCreate(-1);
        }}>Add</Button>
        {customNodeTypes.map((n, i) => {
          return <CustomNode key={i}>
            <CustomNodeTitle>{n.type}</CustomNodeTitle>
            <div>{n.description}</div>
            <div>Inputs</div>
            {n.inputs.map((p: any, j: any) => <div key={j}>{p.name} ({p.type})</div>)}
            {n.outputs.map((p: any, j: any) => <div key={j}>{p.name} ({p.type})</div>)}
          </CustomNode>
        })}
      </CustomNodeList>
      <EditorHolder>
          <FlumeThemeProvider value={createFlumeTheme({
            font: "Syne",
            // node: {
            //     color: "rgb(115,115,196)",
            //     headerColor: "rgb(144,144,255)"
            // },
            // connection: {
            //     color: "rgb(115,115,196)",
            //     activeColor: "white",
            // },
            grid: {
                backgroundColor: "black",
                gridColor: "rgb(38,38,64)",
            },
            // input: {
            //     color: "linear-gradient(to bottom, white, rgb(224,224,255))",
            //     activeColor: "linear-gradient(to top, white, rgb(224,224,255))",
            // },
            menu: {
                color: "rgba(38, 38, 64, 0.5)",
                // fallbackColor: "rgba(128, 128, 224, 0.95)",
                // textColor: "black",
                // secondaryTextColor: "rgb(64,64,64)"
            }
          })}>
              <NodeEditor
                key={customNodeTypes.length + key}
                portTypes={config.portTypes}
                nodeTypes={config.nodeTypes}
                nodes={nodes}
                onChange={setNodes}
                defaultNodes={[
                  {
                    type: "output",
                    x: 0,
                    y: 0,
                  }
                ]}
              />
          </FlumeThemeProvider>
      </EditorHolder>
      <InputBox />
      {showNodeCreate > -2 && <NodeCreator customNodeTypes={customNodeTypes} setCustomNodeTypes={setCustomNodeTypes} setShowNodeCreate={setShowNodeCreate} />}
    </>;
};

const NodeCreator = ({customNodeTypes, setCustomNodeTypes, setShowNodeCreate}: any) => {
  const [nodeName, setNodeName] = React.useState("");
  const [nodeDesc, setNodeDesc] = React.useState("");
  const [inputs, setInputs] = React.useState([] as {name: string, type: string}[]);
  const [outputs, setOutputs] = React.useState([] as {name: string, type: string}[]);
  return <Popup>
    <Input placeholder="Node name" value={nodeName} onChange={(e) => setNodeName(e.target.value)} />
    <Input placeholder="Description" value={nodeDesc} onChange={(e) => setNodeDesc(e.target.value)} />
    {inputs.map((d, i) => {
      return <Input placeholder={`Input ${i+1} name`} onChange={(e) => inputs[i].name = e.target.value} />
    })}
    <Button onClick={() => setInputs([...inputs, {name: '', type: 'string'}])}>Add Input</Button>
    {outputs.map((d, i) => {
      return <Input placeholder={`Input ${i+1} name`} onChange={(e) => outputs[i].name = e.target.value} />
    })}
    <Button onClick={() => setOutputs([...outputs, {name: '', type: 'string'}])}>Add Output</Button>
    <Button onClick={() => {
      if (
        !nodeName ||
        inputs.find((e) => !e.name) ||
        outputs.find((e) => !e.name)
      ) return;
      const newNodeType: NodeType = {
        type: nodeName,
        description: nodeDesc,
        inputs,
        outputs,
        testCases: [],
        defaultOutput: {},
      };
      const newCustomNodes: NodeType[] = [
        newNodeType,
        ...customNodeTypes,
      ];
      remakeFlume(newCustomNodes);
      setCustomNodeTypes(newCustomNodes);
      setShowNodeCreate(-2);
    }}>Create Custom Node</Button>
  </Popup>
};

export const popupData = { display: null as (desc: string) => Promise<string> };
const InputBox = () => {
  const [description, setDescription] = React.useState("");
  const [callback, setCallback] = React.useState(null);
  const [value, setValue] = React.useState("");
  popupData.display = (desc: string) => {
    return new Promise((resolve, reject) => {
      setDescription(desc);
      setCallback(() => resolve);
    })
  };
  if (callback === null) {
    return <></>;
  }
  return <Popup>
    <p>{description}</p>
    <Input value={value} onChange={(e) => setValue(e.target.value)} />
    <Button onClick={() => {
      callback(value);
      setCallback(null);
    }}>Submit</Button>
  </Popup>
};

type NodeType = {
  type: string,
  description: string,
  inputs: {name: string, type: string}[],
  outputs: {name: string, type: string}[],
  testCases: {input: any, output: any}[],
  defaultOutput: any,
};
const makeNodeType = (d: NodeType) => {
  const newNodeType = {
    type: d.type,
    label: d.type,
    description: d.description,
    inputs: () => d.inputs.map((e) => ({name: e.name, type: e.type, label: e.name})),
    outputs: () => d.outputs.map((e) => ({name: e.name, type: e.type, label: e.name})),
    code: (v: any) => {
      testcase: for (const testCase of d.testCases) {
        for (const testIn in testCase.input) {
          if (testCase.input[testIn] === v[testIn]) {
            continue testcase;
          }
        }
        return testCase.output;
      }
      return d.defaultOutput || {};
    },
  };
  console.log(newNodeType);
  return newNodeType;
};

const EditorHeader = styled.div`
  position: absolute; top: 0px; left: 0px;
  height: 40px; width: 100%;
  border-bottom: 1px solid rgb(144,144,255);
  background: black; box-sizing: border-box;
  color: white; line-height: 39px;
  padding-left: 10px; display: flex;
  flex-direction: row;
`;
const EditorTitle = styled.div`
  flex: 1;
`;

const EditorHolder = styled.div`
  position: absolute; top: 40px; left: 0px;
  right: 250px; bottom: 0px;
`;

const Button = styled.button`
  margin: 5px; padding: 5px;
  display: inline-block;
  border: 1px solid rgb(144,144,255);
  color: white;
  cursor: pointer;
  user-select: none;
  background: black;
  height: 30px;
  box-sizing: border-box; 
  :hover {
    background: rgb(32,32,32);
  }
`;

const Input = styled.input`
  margin: 5px; padding: 5px;
  border: 1px solid rgb(144,144,255);
  color: white;
  background: black;
  outline: none;
  height: 30px;
  box-sizing: border-box; 
  :hover {
    background: rgb(32,32,32);
  }
  :focus {
    border: 1px solid rgb(144,255,255);
  }
`;

const CustomNodeList = styled.div`
  position: absolute; top: 40px; right: 0px;
  width: 250px; bottom: 0px;
  border-left: 1px solid rgb(144,144,255);
  box-sizing: border-box; color: white;
  background: black; font-size: 10px;
  overflow: scroll;
`;

const CustomNode = styled.div`
  line-height: 18px; padding: 5px;
  box-sizing: border-box;
  :hover {
    background: rgb(32,32,32);
  }
`;

const CustomNodeTitle = styled.div`
  font-size: 14px;
`;

const Popup = styled.div`
  position: absolute; top: 50%; left: 50%;
  width: 300px; height: 500px;
  margin-left: -150px; margin-top: -250px;
  overflow: auto;
  background: black;
  border: 1px solid rgb(144,144,255);
  color: white;
  display: flex; flex-direction: column;
  overflow: scroll;
`;

const resolvePorts = (portType: any, data: any) => {
  switch (portType) {
    case 'string':
      return data.string
    case 'number':
      return data.number
    case 'any':
      return data.string || data.number
    default:
      return data
  }
}

const runEngine = async (nodes: any, customNodeTypes: any) => {
  const resolveNodes = async (node: any, inputValues: any, nodeType: any, context: any) => {
    const foundNode: any = nodeTypes.find(({type}) => type === node.type) || customNodeTypes.find(({type}: any) => type === node.type);
    if (foundNode?.code) {
      try {
        const result = await foundNode.code(inputValues);
        return result;
      } catch (e) {
        console.warn(node.type, e);
        return {};
      }
    }
    console.warn(`No implementation for ${node.type}.`);
    return {};
  }

  const engine = new RootEngine(config, resolvePorts, resolveNodes)
  return await engine.resolveRootNode(nodes)
}

