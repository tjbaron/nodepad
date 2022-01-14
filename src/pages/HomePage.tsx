import styled from '@emotion/styled';
import {
  createFlumeTheme, FlumeThemeProvider, NodeEditor
} from "@tjbaron/flume";
import * as React from 'react';
import { downloadText } from '../helpers/downloadText';
import { importJson } from '../helpers/importJson';
import { Popup } from '../components/atoms/Popup';
import { Button } from '../components/atoms/Button';
import { LineChartPopup } from '../components/molecules/ChartPopup';
import { Input } from '../components/atoms/Input';
import { InputBox } from '../components/molecules/InputBox';
import { config, NodeType, remakeFlume, runEngine } from '../helpers/runEngine';
import { NodeCreator } from '../components/molecules/NodeCreator';

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
      <LineChartPopup />
    </>;
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
