import { portTypes } from '../portTypes';
import { mathNodeTypes } from './math';
import { otherNodeTypes } from './other';

export const nodeTypes = [
    ...mathNodeTypes,
    ...otherNodeTypes,
];
