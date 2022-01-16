import styled from "@emotion/styled";
import * as React from 'react';
import { NodeType } from "../../helpers/runEngine";

export const CustomNodeItem = ({nodeData, ...other}: {nodeData: NodeType, onClick?: any}) => {
    return <CustomNode {...other}>
        <CustomNodeTitle>{nodeData.type}</CustomNodeTitle>
        <div>{nodeData.description}</div>
        <div>Inputs</div>
        {nodeData.inputs.map((p: any, j: any) => <div key={j}>{p.name} ({p.type})</div>)}
        {nodeData.outputs.map((p: any, j: any) => <div key={j}>{p.name} ({p.type})</div>)}
    </CustomNode>
};

const CustomNode = styled.div`
    line-height: 18px; padding: 5px;
    box-sizing: border-box;
    cursor: pointer;
    :hover {
        background: rgb(32,32,32);
    }
`;

const CustomNodeTitle = styled.div`
    font-size: 14px;
`;

