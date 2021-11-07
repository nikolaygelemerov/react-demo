import ClassCmp from './ClassCmp/ClassCmp';
import FuncCmp from './FuncCmp/FuncCmp';

export { default as NotFound } from './NotFound/NotFound';

export default [
  { name: 'ClassCmp', route: 'class-cmp', Cmp: ClassCmp },
  { name: 'FuncCmp', route: 'func-cmp', Cmp: FuncCmp }
];
