import type { Rule } from 'eslint';

import {
  type ObjectProperty,
  removeObjectProperty,
} from './removeObjectProperty';

/**
 * Given an ObjectProperty, this function returns a fixer function that you can
 * provide to a report descriptor that will remove that node along with any
 * trailing comma.
 * @param context ESLint Rule Context
 * @param property The property node
 * @returns a fixer function that you can provide to a report descriptor, that
 * removes a property from an object expression, along with any commas that
 * are no longer necessary.
 */
export const fixRemoveObjectProperty = (
  context: Rule.RuleContext,
  property: ObjectProperty,
): ((fixer: Rule.RuleFixer) => Generator<Rule.Fix, void>) => {
  return (fixer: Rule.RuleFixer) =>
    removeObjectProperty(context, fixer, property);
};
