import { brainNodeTypes } from './brain';
import { chartNodeTypes } from './charts';
import { csvNodeTypes } from './csv';
import { imageNodeTypes } from './image';
import { jsonNodeTypes } from './json';
import { mathNodeTypes } from './math';
import { otherNodeTypes } from './other';
import { xmlNodeTypes } from './xml';
import { yamlNodeTypes } from './yaml';

export const nodeTypes = [
    ...brainNodeTypes,
    ...chartNodeTypes,
    ...imageNodeTypes,
    ...mathNodeTypes,
    ...otherNodeTypes,
    ...csvNodeTypes,
    ...yamlNodeTypes,
    ...jsonNodeTypes,
    ...xmlNodeTypes,
];
