import { portTypes } from '../portTypes';
import { chartNodeTypes } from './charts';
import { mathNodeTypes } from './math';
import { otherNodeTypes } from './other';

export const nodeTypes = [
    ...chartNodeTypes,
    ...mathNodeTypes,
    ...otherNodeTypes,
];
