import { anchor } from './anchor';
import { deflist } from './deflist';
import { svgbob } from './svgbob';
import { mermaid } from './mermaid';
import { footnote } from './footnote';
import { taskLists } from './task-lists';

/**
 * Builtin plugins provided by this labextension
 */
export const BUILTINS = [anchor, deflist, footnote, mermaid, svgbob, taskLists];
