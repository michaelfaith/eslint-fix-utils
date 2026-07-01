import type { Rule } from 'eslint';
import type * as ESTree from 'estree';

export type ArrayElement = ESTree.Expression | ESTree.SpreadElement;

export type ArrayElementsOrParent =
  ESTree.ArrayExpression | ESTree.ArrayExpression['elements'];

/**
 * Given an ArrayExpression or the list of elements an ArrayExpression has,
 * the index or node within that array that you want to remove, and a rule fixer,
 * this function yields removals for the node itself, as well as any trailing
 * commas that are no longer necessary.
 * @param context ESLint Rule Context
 * @param fixer Rule fixer
 * @param elementOrIndex The child expression, spread element, or a numeric
 * index of the child
 * @param parentOrElements The array expression node, or its `.elements` array
 * @yields fixer removals for the node itself, as well as any trailing commas
 * that are no longer necessary.
 */
export function* removeArrayElement(
  context: Rule.RuleContext,
  fixer: Rule.RuleFixer,
  elementOrIndex: ArrayElement | number,
  parentOrElements: ArrayElementsOrParent,
): Generator<Rule.Fix, void> {
  const elements = Array.isArray(parentOrElements)
    ? parentOrElements
    : parentOrElements.elements;
  const [element, index] = getElementAndIndex(elements, elementOrIndex);

  if (!element) {
    throw new Error('Cannot remove a null (blank) array element.');
  }

  const tokenAfter = context.sourceCode.getTokenAfter(element);
  const tokenBefore = context.sourceCode.getTokenBefore(element);

  // If this is the last line and it's not the only entry, then the line above this one
  // will become the last line, and should not have a trailing comma.
  if (index > 0 && tokenAfter?.value !== ',' && tokenBefore?.value === ',') {
    yield fixer.remove(tokenBefore);
  }

  yield fixer.remove(element);

  // If this is not the last entry, then we need to remove the comma from this line.
  if (tokenAfter?.value === ',') {
    yield fixer.remove(tokenAfter);
  }
}

function getElementAndIndex(
  elements: (ArrayElement | null)[],
  elementOrIndex: ArrayElement | number,
) {
  if (typeof elementOrIndex === 'number') {
    return [elements[elementOrIndex], elementOrIndex] as const;
  }

  const index = elements.indexOf(elementOrIndex);

  if (index === -1) {
    throw new Error('Node is not a child of the parent array.');
  }

  return [elements[index], index] as const;
}
