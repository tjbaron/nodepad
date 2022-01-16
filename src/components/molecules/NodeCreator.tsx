import styled from '@emotion/styled';
import * as React from 'react';
import { NodeType, remakeFlume } from '../../helpers/runEngine';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Popup } from '../atoms/Popup';

export const NodeCreator = ({customNodeTypes, setCustomNodeTypes, setShowNodeCreate}: any) => {
        const [nodeName, setNodeName] = React.useState("");
        const [nodeDesc, setNodeDesc] = React.useState("");
        const [inputs, setInputs] = React.useState([] as {name: string, type: string}[]);
        const [outputs, setOutputs] = React.useState([] as {name: string, type: string}[]);
        return <NewNodePopup>
            <Input placeholder="Node name" value={nodeName} onChange={(e) => setNodeName(e.target.value)} />
            <Input placeholder="Description" value={nodeDesc} onChange={(e) => setNodeDesc(e.target.value)} />
            {inputs.map((d, i) => {
                return <Input placeholder={`Input ${i+1} name`} onChange={(e) => inputs[i].name = e.target.value} />
            })}
            <Button onClick={() => setInputs([...inputs, {name: '', type: 'any'}])}>Add Input</Button>
            {outputs.map((d, i) => {
                return <Input placeholder={`Output ${i+1} name`} onChange={(e) => outputs[i].name = e.target.value} />
            })}
            <Button onClick={() => setOutputs([...outputs, {name: '', type: 'any'}])}>Add Output</Button>
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
                    // testCases: [],
                    // defaultOutput: {},
                };
                const newCustomNodes: NodeType[] = [
                    newNodeType,
                    ...customNodeTypes,
                ];
                remakeFlume(newCustomNodes);
                setCustomNodeTypes(newCustomNodes);
                setShowNodeCreate(-2);
            }}>Create Custom Node</Button>
            <Button onClick={() => {
                setShowNodeCreate(-2);
            }}>Cancel</Button>
        </NewNodePopup>
  };

const NewNodePopup = styled(Popup)`
    top: 50%; left: 50%;
    width: 300px; height: 500px;
    margin-left: -150px; margin-top: -250px;
`;
