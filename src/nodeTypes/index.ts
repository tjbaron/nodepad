import { brainNodeTypes } from './brain';
import { chartNodeTypes } from './charts';
import { csvNodeTypes } from './csv';
import { excelNodeTypes } from './excel';
import { imageNodeTypes } from './image';
import { inputNodeTypes } from './input';
import { jsonNodeTypes } from './json';
import { mathNodeTypes } from './math';
import { otherNodeTypes } from './other';
import { xmlNodeTypes } from './xml';
import { yamlNodeTypes } from './yaml';

export const nodeTypes = [
    ...brainNodeTypes,
    ...chartNodeTypes,
    ...csvNodeTypes,
    ...excelNodeTypes,
    ...imageNodeTypes,
    ...inputNodeTypes,
    ...jsonNodeTypes,
    ...mathNodeTypes,
    ...otherNodeTypes,
    ...xmlNodeTypes,
    ...yamlNodeTypes,
];
