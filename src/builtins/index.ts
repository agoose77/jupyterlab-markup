import { anchor } from './anchor';
import { deflist } from './deflist';
import { svgbob } from './svgbob';
import { mermaid } from './mermaid';
import { footnote } from './footnote';
import { taskLists } from './task-lists';
import { typesetterAdaptor } from './typesetter-adaptor';
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
  typesetterAdaptor,
  dollarmath
];
