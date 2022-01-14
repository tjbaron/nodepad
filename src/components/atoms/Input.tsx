import styled from "@emotion/styled";

export const Input = styled.input`
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
