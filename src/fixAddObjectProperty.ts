import type { Rule } from 'eslint';
import type * as ESTree from 'estree';

import { addObjectProperty } from './addObjectProperty';

/**
 * Given an ObjectExpression and the key and value of a property,
 * this function returns a fixer function that you can provide to a report
 * descriptor that will add the new property to it.
 * @param context ESLint Rule Context
 * @param objectExpression The object expression to which the property will be added
 * @param propertyKey The key for the new property
 * @param propertyValue The value for the new property
 * @returns a fixer function that you can provide to a report descriptor that
 * adds a new property to an object expression, along with any commas that
 * are needed.
 */
export const fixAddObjectProperty = (
  context: Rule.RuleContext,
  objectExpression: ESTree.ObjectExpression,
  propertyKey: string,
  propertyValue: unknown,
): ((fixer: Rule.RuleFixer) => Generator<Rule.Fix, void>) => {
  return (fixer: Rule.RuleFixer) =>
    addObjectProperty(
      context,
      fixer,
      objectExpression,
      propertyKey,
      propertyValue,
    );
};
