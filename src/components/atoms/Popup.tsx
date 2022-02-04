import styled from "@emotion/styled";
import * as React from 'react';
import { HTMLAttributes } from "react";

export const Popup = (props: HTMLAttributes<HTMLDivElement>) => {
    return <PopupHolder>
        <PopupContainer {...props} />
    </PopupHolder>
}

const PopupContainer = styled.div`
    overflow: auto;
    background: black;
    border: 1px solid rgb(144,144,255);
    color: white;
    display: flex; flex-direction: column;
    overflow: scroll;
`;

const PopupHolder = styled.div`
    position: absolute;
    inset: 0px;
    background: rgba(0,0,0,0.2);
    display: flex; align-items: center; justify-content: center;
`
