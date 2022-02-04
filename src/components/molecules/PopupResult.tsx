import * as React from 'react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Popup } from '../atoms/Popup';

export const resultData = { display: null as (desc: string) => Promise<void> };
export const PopupResult = () => {
    const [result, setResult] = React.useState("");
    const [callback, setCallback] = React.useState(null);
    resultData.display = (desc: string) => {
        return new Promise((resolve, reject) => {
            setResult(desc);
            setCallback(() => resolve);
        })
    };
    if (callback === null) {
        return <></>;
    }
    return <Popup>
        <textarea style={{ width: "500px", height: "400px" }} readOnly>{result}</textarea>
        <Button onClick={() => {
            callback();
            setCallback(null);
        }}>Okay</Button>
    </Popup>
};
