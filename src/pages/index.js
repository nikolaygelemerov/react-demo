import ClassCmp from './ClassCmp/ClassCmp';
import FuncCmp from './FuncCmp/FuncCmp';
import PlaygroundCmp from './PlaygroundCmp/PlaygroundCmp';

export { default as NotFound } from './NotFound/NotFound';

export default [
  { name: 'ClassCmp', route: 'class-cmp', Cmp: ClassCmp },
  { name: 'FuncCmp', route: 'func-cmp', Cmp: FuncCmp },
  { name: 'PlaygroundCmp', route: 'playground-cmp', Cmp: PlaygroundCmp }
];
