import { anchor } from './anchor';
import { deflist } from './deflist';
import { svgbob } from './svgbob';
import { mermaid } from './mermaid';
import { footnote } from './footnote';
import { taskLists } from './task-lists';
import { typesetter } from './typesetter';
import { dollarmath } from './dollarmath';

/**
 * Builtin plugins provided by this labextension
 */
export const BUILTINS = [
  anchor,
  deflist,
  footnote,
  mermaid,
  svgbob,
  taskLists,
  typesetter,
  dollarmath
];
