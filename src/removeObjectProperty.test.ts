import type { Rule } from 'eslint';
import type * as ESTree from 'estree';
import { describe, expect, it, vi } from 'vitest';

import { removeObjectProperty } from '../src/removeObjectProperty';

describe('removeObjectProperty', () => {
  it('should remove the property and trailing comma when it is not the last property', () => {
    const mockContext = {
      sourceCode: {
        getTokenAfter: vi.fn().mockReturnValue({ value: ',' }),
        getTokenBefore: vi.fn().mockReturnValue({ value: ',' }),
      },
    } as unknown as Rule.RuleContext;
    const remove = vi.fn();
    const mockFixer = { remove } as unknown as Rule.RuleFixer;
    const mockProperty = {
      key: { name: 'key' },
      type: 'Property',
    } as ESTree.Property;

    const fixes = [
      ...removeObjectProperty(mockContext, mockFixer, mockProperty),
    ];

    expect(remove).toHaveBeenCalledWith(mockProperty);
    expect(remove).toHaveBeenCalledWith({ value: ',' }); // Trailing comma
    expect(fixes).toHaveLength(2);
  });

  it('should remove the property and preceding comma when it is the last property', () => {
    const mockContext = {
      sourceCode: {
        getTokenAfter: vi.fn().mockReturnValue(undefined),
        getTokenBefore: vi.fn().mockReturnValue({ value: ',' }),
      },
    } as unknown as Rule.RuleContext;
    const remove = vi.fn();
    const mockFixer = { remove } as unknown as Rule.RuleFixer;
    const mockProperty = {
      key: { name: 'key' },
      type: 'Property',
    } as ESTree.Property;

    const fixes = [
      ...removeObjectProperty(mockContext, mockFixer, mockProperty),
    ];

    expect(remove).toHaveBeenCalledWith(mockProperty);
    expect(remove).toHaveBeenCalledWith({ value: ',' }); // Preceding comma
    expect(fixes).toHaveLength(2);
  });

  it('should remove the property without commas when it is the only property', () => {
    const mockContext = {
      sourceCode: {
        getTokenAfter: vi.fn().mockReturnValue(undefined),
        getTokenBefore: vi.fn().mockReturnValue(undefined),
      },
    } as unknown as Rule.RuleContext;
    const remove = vi.fn();
    const mockFixer = { remove } as unknown as Rule.RuleFixer;
    const mockProperty = {
      key: { name: 'key' },
      type: 'Property',
    } as ESTree.Property;

    const fixes = [
      ...removeObjectProperty(mockContext, mockFixer, mockProperty),
    ];

    expect(remove).toHaveBeenCalledWith(mockProperty);
    expect(fixes).toHaveLength(1);
  });

  it('should handle spread elements as properties', () => {
    const mockContext = {
      sourceCode: {
        getTokenAfter: vi.fn().mockReturnValue({ value: ',' }),
        getTokenBefore: vi.fn().mockReturnValue({ value: ',' }),
      },
    } as unknown as Rule.RuleContext;
    const remove = vi.fn();
    const mockFixer = { remove } as unknown as Rule.RuleFixer;
    const mockProperty = {
      argument: { name: 'spread' },
      type: 'SpreadElement',
    } as ESTree.SpreadElement;

    const fixes = [
      ...removeObjectProperty(mockContext, mockFixer, mockProperty),
    ];

    expect(remove).toHaveBeenCalledWith(mockProperty);
    expect(remove).toHaveBeenCalledWith({ value: ',' }); // Trailing comma
    expect(fixes).toHaveLength(2);
  });

  it("should handle cases token before and after aren't commas", () => {
    const mockContext = {
      sourceCode: {
        getTokenAfter: vi.fn().mockReturnValue('.'),
        getTokenBefore: vi.fn().mockReturnValue('.'),
      },
    } as unknown as Rule.RuleContext;
    const remove = vi.fn();
    const mockFixer = { remove } as unknown as Rule.RuleFixer;
    const mockProperty = {
      key: { name: 'key' },
      type: 'Property',
    } as ESTree.Property;

    const fixes = [
      ...removeObjectProperty(mockContext, mockFixer, mockProperty),
    ];

    expect(remove).toHaveBeenCalledWith(mockProperty);
    expect(fixes).toHaveLength(1);
  });
});
