import type { Rule } from 'eslint';
import type * as ESTree from 'estree';

import { describe, expect, it, vi } from 'vitest';

import { addObjectProperty } from './addObjectProperty';
import { fixAddObjectProperty } from './fixAddObjectProperty';

vi.mock('../src/addObjectProperty', () => ({
  addObjectProperty: vi.fn(),
}));

describe(fixAddObjectProperty, () => {
  it('should call addObjectProperty with the correct arguments when the fixer function is invoked', () => {
    const mockContext = {} as Rule.RuleContext;
    const mockObjectExpression = {} as ESTree.ObjectExpression;
    const mockFixer = {} as Rule.RuleFixer;

    const fixerFunction = fixAddObjectProperty(
      mockContext,
      mockObjectExpression,
      'testKey',
      'testValue',
    );

    fixerFunction(mockFixer);

    expect(addObjectProperty).toHaveBeenCalledWith(
      mockContext,
      mockFixer,
      mockObjectExpression,
      'testKey',
      'testValue',
    );
  });

  it('should pass numeric values correctly to addObjectProperty', () => {
    const mockContext = {} as Rule.RuleContext;
    const mockObjectExpression = {} as ESTree.ObjectExpression;
    const mockFixer = {} as Rule.RuleFixer;

    const fixerFunction = fixAddObjectProperty(
      mockContext,
      mockObjectExpression,
      'numberKey',
      42,
    );

    fixerFunction(mockFixer);

    expect(addObjectProperty).toHaveBeenCalledWith(
      mockContext,
      mockFixer,
      mockObjectExpression,
      'numberKey',
      42,
    );
  });

  it('should pass boolean values correctly to addObjectProperty', () => {
    const mockContext = {} as Rule.RuleContext;
    const mockObjectExpression = {} as ESTree.ObjectExpression;
    const mockFixer = {} as Rule.RuleFixer;

    const fixerFunction = fixAddObjectProperty(
      mockContext,
      mockObjectExpression,
      'booleanKey',
      true,
    );

    fixerFunction(mockFixer);

    expect(addObjectProperty).toHaveBeenCalledWith(
      mockContext,
      mockFixer,
      mockObjectExpression,
      'booleanKey',
      true,
    );
  });

  it('should pass null values correctly to addObjectProperty', () => {
    const mockContext = {} as Rule.RuleContext;
    const mockObjectExpression = {} as ESTree.ObjectExpression;
    const mockFixer = {} as Rule.RuleFixer;

    const fixerFunction = fixAddObjectProperty(
      mockContext,
      mockObjectExpression,
      'nullKey',
      null,
    );

    fixerFunction(mockFixer);

    expect(addObjectProperty).toHaveBeenCalledWith(
      mockContext,
      mockFixer,
      mockObjectExpression,
      'nullKey',
      null,
    );
  });

  it('should pass object values correctly to addObjectProperty', () => {
    const mockContext = {} as Rule.RuleContext;
    const mockObjectExpression = {} as ESTree.ObjectExpression;
    const mockFixer = {} as Rule.RuleFixer;
    const objectValue = { count: 123, nested: 'value' };

    const fixerFunction = fixAddObjectProperty(
      mockContext,
      mockObjectExpression,
      'objectKey',
      objectValue,
    );

    fixerFunction(mockFixer);

    expect(addObjectProperty).toHaveBeenCalledWith(
      mockContext,
      mockFixer,
      mockObjectExpression,
      'objectKey',
      objectValue,
    );
  });

  it('should pass array values correctly to addObjectProperty', () => {
    const mockContext = {} as Rule.RuleContext;
    const mockObjectExpression = {} as ESTree.ObjectExpression;
    const mockFixer = {} as Rule.RuleFixer;
    const arrayValue = [1, 2, 3, 'four'];

    const fixerFunction = fixAddObjectProperty(
      mockContext,
      mockObjectExpression,
      'arrayKey',
      arrayValue,
    );

    fixerFunction(mockFixer);

    expect(addObjectProperty).toHaveBeenCalledWith(
      mockContext,
      mockFixer,
      mockObjectExpression,
      'arrayKey',
      arrayValue,
    );
  });
});
