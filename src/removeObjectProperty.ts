import type { Rule } from 'eslint';
import type * as ESTree from 'estree';

export type ObjectProperty = ESTree.Property | ESTree.SpreadElement;

/**
 * Given an ObjectProperty, and a rule fixer, this function yields removals for
 * the node itself, as well as any trailing commas that are no longer necessary.
 * @param context ESLint Rule Context
 * @param fixer Rule fixer
 * @param property The property node
 * @yields fixer removals for the node itself, as well as any trailing commas
 * that are no longer necessary.
 */
export function* removeObjectProperty(
  context: Rule.RuleContext,
  fixer: Rule.RuleFixer,
  property: ObjectProperty,
): Generator<Rule.Fix, void> {
  const tokenAfter = context.sourceCode.getTokenAfter(property);
  const tokenBefore = context.sourceCode.getTokenBefore(property);

  // If this is not the only entry, then the line above this one
  // will become the last line, and should not have a trailing comma.
  if (tokenAfter?.value !== ',' && tokenBefore?.value === ',') {
    yield fixer.remove(tokenBefore);
  }

  yield fixer.remove(property);

  // If this is not the last entry, then we need to remove the comma from this line.
  if (tokenAfter?.value === ',') {
    yield fixer.remove(tokenAfter);
  }
}
