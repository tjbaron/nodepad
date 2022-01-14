import * as React from 'react';
import { Button } from '../atoms/Button';
import { Input } from '../atoms/Input';
import { Popup } from '../atoms/Popup';

export const popupData = { display: null as (desc: string) => Promise<string> };
export const InputBox = () => {
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
