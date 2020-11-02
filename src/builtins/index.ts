import { anchor } from './anchor';
import { deflist } from './deflist';
import { diagrams } from './diagrams';
import { footnote } from './footnote';
import { replaceLink } from './replace-link';
import { taskLists } from './task-lists';

/**
 * Builtin plugins provided by this labextension
 */
export const BUILTINS = [
  anchor,
  deflist,
  diagrams,
  footnote,
  replaceLink,
  taskLists,
];
