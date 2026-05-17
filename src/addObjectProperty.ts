import type { Rule } from 'eslint';
import type * as ESTree from 'estree';

/**
 * Given an ObjectProperty, and a rule fixer, this function yields the addition
 * of a new property to the given ObjectExpression, along with any necessary commas.
 * The new property is at the end of the object.
 * @param context ESLint Rule Context
 * @param fixer Rule fixer
 * @param objectExpression The object expression to which the property will be added
 * @param propertyKey The key for the new property
 * @param propertyValue The value for the new property
 * @yields fixer addition for the new property into the object expression, as well as any necessary commas
 */
export function* addObjectProperty(
  context: Rule.RuleContext,
  fixer: Rule.RuleFixer,
  objectExpression: ESTree.ObjectExpression,
  propertyKey: string,
  propertyValue: unknown,
): Generator<Rule.Fix, void> {
  const sourceCode = context.sourceCode;
  let insertPosition: [number, number] | undefined;
  let needsComma = false;
  if (objectExpression.properties.length > 0) {
    const tokenAfter = sourceCode.getTokenAfter(
      objectExpression.properties[objectExpression.properties.length - 1],
    );
    if (tokenAfter?.value === ',') {
      insertPosition = tokenAfter.range;
    } else {
      needsComma = true;
      insertPosition = objectExpression.properties.at(-1)?.range;
    }
  }
  insertPosition ??= [0, 1]; // after the opening brace

  if (needsComma) {
    yield fixer.insertTextAfterRange(insertPosition, ',');
    insertPosition = [insertPosition[0] + 1, insertPosition[1] + 1];
  } else {
    yield fixer.insertTextAfterRange(insertPosition, '\n');
  }

  const propertyString = `${JSON.stringify(propertyKey)}: ${JSON.stringify(propertyValue)}`;
  const textToInsert = `  ${propertyString}\n`;

  yield fixer.insertTextAfterRange(insertPosition, textToInsert);
}
