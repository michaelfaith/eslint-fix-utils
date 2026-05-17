import type { Rule } from 'eslint';
import type * as ESTree from 'estree';

import { describe, expect, it, vi } from 'vitest';

import { addObjectProperty } from '../src/addObjectProperty';

describe(addObjectProperty, () => {
  it('should add a property to an empty object', () => {
    const mockContext = {
      sourceCode: {
        getTokenAfter: vi.fn().mockReturnValue(undefined),
      },
    } as unknown as Rule.RuleContext;
    const insertTextAfterRange = vi.fn();
    const mockFixer = {
      insertTextAfterRange,
    } as unknown as Rule.RuleFixer;
    const mockObjectExpression = {
      properties: [],
      type: 'ObjectExpression',
    } as ESTree.ObjectExpression;

    const fixes = [
      ...addObjectProperty(
        mockContext,
        mockFixer,
        mockObjectExpression,
        'testKey',
        'testValue',
      ),
    ];

    expect(insertTextAfterRange).toHaveBeenCalledWith([0, 1], '\n');
    expect(insertTextAfterRange).toHaveBeenCalledWith(
      [0, 1],
      '  "testKey": "testValue"\n',
    );
    expect(fixes).toHaveLength(2);
  });

  it('should add a property to an object with existing properties without trailing comma', () => {
    const mockContext = {
      sourceCode: {
        getTokenAfter: vi.fn().mockReturnValue(undefined),
      },
    } as unknown as Rule.RuleContext;
    const insertTextAfterRange = vi.fn();
    const mockFixer = {
      insertTextAfterRange,
    } as unknown as Rule.RuleFixer;
    const mockProperty = {
      range: [10, 20],
    } as unknown as ESTree.Property;
    const mockObjectExpression = {
      properties: [mockProperty],
    } as unknown as ESTree.ObjectExpression;

    const fixes = [
      ...addObjectProperty(
        mockContext,
        mockFixer,
        mockObjectExpression,
        'newKey',
        'newValue',
      ),
    ];

    expect(insertTextAfterRange).toHaveBeenCalledWith([10, 20], ',');
    expect(insertTextAfterRange).toHaveBeenCalledWith(
      [11, 21],
      '  "newKey": "newValue"\n',
    );
    expect(fixes).toHaveLength(2);
  });

  it('should add a property to an object with existing properties with trailing comma', () => {
    const mockContext = {
      sourceCode: {
        getTokenAfter: vi.fn().mockReturnValue({ range: [20, 21], value: ',' }),
      },
    } as unknown as Rule.RuleContext;
    const insertTextAfterRange = vi.fn();
    const mockFixer = {
      insertTextAfterRange,
    } as unknown as Rule.RuleFixer;
    const mockProperty = {
      range: [10, 20],
    } as unknown as ESTree.Property;
    const mockObjectExpression = {
      properties: [mockProperty],
    } as unknown as ESTree.ObjectExpression;

    const fixes = [
      ...addObjectProperty(
        mockContext,
        mockFixer,
        mockObjectExpression,
        'newKey',
        'newValue',
      ),
    ];

    expect(insertTextAfterRange).toHaveBeenCalledWith([20, 21], '\n');
    expect(insertTextAfterRange).toHaveBeenCalledWith(
      [20, 21],
      '  "newKey": "newValue"\n',
    );
    expect(fixes).toHaveLength(2);
  });

  it('should properly serialize string values in properties', () => {
    const mockContext = {
      sourceCode: {
        getTokenAfter: vi.fn().mockReturnValue(undefined),
      },
    } as unknown as Rule.RuleContext;
    const insertTextAfterRange = vi.fn();
    const mockFixer = {
      insertTextAfterRange,
    } as unknown as Rule.RuleFixer;
    const mockObjectExpression = {
      properties: [],
      type: 'ObjectExpression',
    } as ESTree.ObjectExpression;

    const fixes = [
      ...addObjectProperty(
        mockContext,
        mockFixer,
        mockObjectExpression,
        'stringKey',
        'stringValue',
      ),
    ];

    expect(insertTextAfterRange).toHaveBeenCalledWith(
      [0, 1],
      '  "stringKey": "stringValue"\n',
    );
    expect(fixes).toHaveLength(2);
  });

  it('should properly serialize numeric values in properties', () => {
    const mockContext = {
      sourceCode: {
        getTokenAfter: vi.fn().mockReturnValue(undefined),
      },
    } as unknown as Rule.RuleContext;
    const insertTextAfterRange = vi.fn();
    const mockFixer = {
      insertTextAfterRange,
    } as unknown as Rule.RuleFixer;
    const mockObjectExpression = {
      properties: [],
      type: 'ObjectExpression',
    } as ESTree.ObjectExpression;

    const fixes = [
      ...addObjectProperty(
        mockContext,
        mockFixer,
        mockObjectExpression,
        'numberKey',
        42,
      ),
    ];

    expect(insertTextAfterRange).toHaveBeenCalledWith(
      [0, 1],
      '  "numberKey": 42\n',
    );
    expect(fixes).toHaveLength(2);
  });

  it('should properly serialize boolean values in properties', () => {
    const mockContext = {
      sourceCode: {
        getTokenAfter: vi.fn().mockReturnValue(undefined),
      },
    } as unknown as Rule.RuleContext;
    const insertTextAfterRange = vi.fn();
    const mockFixer = {
      insertTextAfterRange,
    } as unknown as Rule.RuleFixer;
    const mockObjectExpression = {
      properties: [],
      type: 'ObjectExpression',
    } as ESTree.ObjectExpression;

    const fixes = [
      ...addObjectProperty(
        mockContext,
        mockFixer,
        mockObjectExpression,
        'booleanKey',
        true,
      ),
    ];

    expect(insertTextAfterRange).toHaveBeenCalledWith(
      [0, 1],
      '  "booleanKey": true\n',
    );
    expect(fixes).toHaveLength(2);
  });

  it('should properly serialize null values in properties', () => {
    const mockContext = {
      sourceCode: {
        getTokenAfter: vi.fn().mockReturnValue(undefined),
      },
    } as unknown as Rule.RuleContext;
    const insertTextAfterRange = vi.fn();
    const mockFixer = {
      insertTextAfterRange,
    } as unknown as Rule.RuleFixer;
    const mockObjectExpression = {
      properties: [],
      type: 'ObjectExpression',
    } as ESTree.ObjectExpression;

    const fixes = [
      ...addObjectProperty(
        mockContext,
        mockFixer,
        mockObjectExpression,
        'nullKey',
        null,
      ),
    ];

    expect(insertTextAfterRange).toHaveBeenCalledWith(
      [0, 1],
      '  "nullKey": null\n',
    );
    expect(fixes).toHaveLength(2);
  });

  it('should properly serialize object values in properties', () => {
    const mockContext = {
      sourceCode: {
        getTokenAfter: vi.fn().mockReturnValue(undefined),
      },
    } as unknown as Rule.RuleContext;
    const insertTextAfterRange = vi.fn();
    const mockFixer = {
      insertTextAfterRange,
    } as unknown as Rule.RuleFixer;
    const mockObjectExpression = {
      properties: [],
      type: 'ObjectExpression',
    } as ESTree.ObjectExpression;

    const objectValue = { nested: 'value' };

    const fixes = [
      ...addObjectProperty(
        mockContext,
        mockFixer,
        mockObjectExpression,
        'objectKey',
        objectValue,
      ),
    ];

    expect(insertTextAfterRange).toHaveBeenCalledWith(
      [0, 1],
      '  "objectKey": {"nested":"value"}\n',
    );
    expect(fixes).toHaveLength(2);
  });

  it('should properly serialize array values in properties', () => {
    const mockContext = {
      sourceCode: {
        getTokenAfter: vi.fn().mockReturnValue(undefined),
      },
    } as unknown as Rule.RuleContext;
    const insertTextAfterRange = vi.fn();
    const mockFixer = {
      insertTextAfterRange,
    } as unknown as Rule.RuleFixer;
    const mockObjectExpression = {
      properties: [],
      type: 'ObjectExpression',
    } as ESTree.ObjectExpression;

    const arrayValue = [1, 2, 3];

    const fixes = [
      ...addObjectProperty(
        mockContext,
        mockFixer,
        mockObjectExpression,
        'arrayKey',
        arrayValue,
      ),
    ];

    expect(insertTextAfterRange).toHaveBeenCalledWith(
      [0, 1],
      '  "arrayKey": [1,2,3]\n',
    );
    expect(fixes).toHaveLength(2);
  });

  it('should add property to object with multiple existing properties', () => {
    const mockContext = {
      sourceCode: {
        getTokenAfter: vi.fn().mockReturnValue(undefined),
      },
    } as unknown as Rule.RuleContext;
    const insertTextAfterRange = vi.fn();
    const mockFixer = {
      insertTextAfterRange,
    } as unknown as Rule.RuleFixer;
    const mockProperty1 = {
      range: [5, 10],
    } as unknown as ESTree.Property;
    const mockProperty2 = {
      range: [15, 25],
    } as unknown as ESTree.Property;
    const mockObjectExpression = {
      properties: [mockProperty1, mockProperty2],
    } as unknown as ESTree.ObjectExpression;

    const fixes = [
      ...addObjectProperty(
        mockContext,
        mockFixer,
        mockObjectExpression,
        'newKey',
        'newValue',
      ),
    ];

    expect(insertTextAfterRange).toHaveBeenCalledWith([15, 25], ',');
    expect(insertTextAfterRange).toHaveBeenCalledWith(
      [16, 26],
      '  "newKey": "newValue"\n',
    );
    expect(fixes).toHaveLength(2);
  });

  it('should handle property keys that need escaping', () => {
    const mockContext = {
      sourceCode: {
        getTokenAfter: vi.fn().mockReturnValue(undefined),
      },
    } as unknown as Rule.RuleContext;
    const insertTextAfterRange = vi.fn();
    const mockFixer = {
      insertTextAfterRange,
    } as unknown as Rule.RuleFixer;
    const mockObjectExpression = {
      properties: [],
      type: 'ObjectExpression',
    } as ESTree.ObjectExpression;

    const fixes = [
      ...addObjectProperty(
        mockContext,
        mockFixer,
        mockObjectExpression,
        'key"with"quotes',
        'value',
      ),
    ];

    expect(insertTextAfterRange).toHaveBeenCalledWith(
      [0, 1],
      '  "key\\"with\\"quotes": "value"\n',
    );
    expect(fixes).toHaveLength(2);
  });

  it('should yield exactly the correct number of fixes', () => {
    const mockContext = {
      sourceCode: {
        getTokenAfter: vi.fn().mockReturnValue(undefined),
      },
    } as unknown as Rule.RuleContext;
    const insertTextAfterRange = vi.fn();
    const mockFixer = {
      insertTextAfterRange,
    } as unknown as Rule.RuleFixer;
    const mockProperty = {
      range: [10, 20],
    } as unknown as ESTree.Property;
    const mockObjectExpression = {
      properties: [mockProperty],
    } as unknown as ESTree.ObjectExpression;

    const fixes = [
      ...addObjectProperty(
        mockContext,
        mockFixer,
        mockObjectExpression,
        'key',
        'value',
      ),
    ];

    expect(fixes).toHaveLength(2);
    expect(insertTextAfterRange).toHaveBeenCalledTimes(2);
  });

  it('should handle empty string as property key', () => {
    const mockContext = {
      sourceCode: {
        getTokenAfter: vi.fn().mockReturnValue(undefined),
      },
    } as unknown as Rule.RuleContext;
    const insertTextAfterRange = vi.fn();
    const mockFixer = {
      insertTextAfterRange,
    } as unknown as Rule.RuleFixer;
    const mockObjectExpression = {
      properties: [],
      type: 'ObjectExpression',
    } as ESTree.ObjectExpression;

    const fixes = [
      ...addObjectProperty(
        mockContext,
        mockFixer,
        mockObjectExpression,
        '',
        'value',
      ),
    ];

    expect(insertTextAfterRange).toHaveBeenCalledWith(
      [0, 1],
      '  "": "value"\n',
    );
    expect(fixes).toHaveLength(2);
  });

  it('should handle empty string as property value', () => {
    const mockContext = {
      sourceCode: {
        getTokenAfter: vi.fn().mockReturnValue(undefined),
      },
    } as unknown as Rule.RuleContext;
    const insertTextAfterRange = vi.fn();
    const mockFixer = {
      insertTextAfterRange,
    } as unknown as Rule.RuleFixer;
    const mockObjectExpression = {
      properties: [],
      type: 'ObjectExpression',
    } as ESTree.ObjectExpression;

    const fixes = [
      ...addObjectProperty(
        mockContext,
        mockFixer,
        mockObjectExpression,
        'key',
        '',
      ),
    ];

    expect(insertTextAfterRange).toHaveBeenCalledWith([0, 1], '  "key": ""\n');
    expect(fixes).toHaveLength(2);
  });
});
