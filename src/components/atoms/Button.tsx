import styled from "@emotion/styled";

export const Button = styled.button`
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
