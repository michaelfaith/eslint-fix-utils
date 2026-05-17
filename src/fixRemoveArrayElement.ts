import type { Rule } from 'eslint';

import {
  type ArrayElement,
  type ArrayElementsOrParent,
  removeArrayElement,
} from './removeArrayElement';

/**
 * Given an ArrayExpression or the list of elements an ArrayExpression has, and
 * the index or node within that array that you want to remove, this function
 * returns a fixer function that you can provide to a report descriptor that
 * will remove that node along with any trailing comma.
 * @param context ESLint Rule Context
 * @param elementOrIndex The child expression, spread element, or a numeric
 * index of the child
 * @param parentOrElements The array expression node, or its `.elements` array
 * @returns a fixer function that you can provide to a report descriptor, that
 * removes an element from an array expression, along with any commas that are
 * no longer necessary.
 */
export const fixRemoveArrayElement = (
  context: Rule.RuleContext,
  elementOrIndex: ArrayElement | number,
  parentOrElements: ArrayElementsOrParent,
): ((fixer: Rule.RuleFixer) => Generator<Rule.Fix, void>) => {
  return (fixer: Rule.RuleFixer) =>
    removeArrayElement(context, fixer, elementOrIndex, parentOrElements);
};
