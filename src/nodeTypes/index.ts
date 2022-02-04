import { portTypes } from '../portTypes';
import { brainNodeTypes } from './brain';
import { chartNodeTypes } from './charts';
import { imageNodeTypes } from './image';
import { mathNodeTypes } from './math';
import { otherNodeTypes } from './other';

export const nodeTypes = [
    ...brainNodeTypes,
    ...chartNodeTypes,
    ...imageNodeTypes,
    ...mathNodeTypes,
    ...otherNodeTypes,
];
