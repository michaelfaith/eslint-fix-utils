import type { Rule } from 'eslint';
import { describe, expect, it, vi } from 'vitest';

import { fixRemoveObjectProperty } from './fixRemoveObjectProperty';
import {
  removeObjectProperty,
  type ObjectProperty,
} from './removeObjectProperty';

vi.mock('../src/removeObjectProperty', () => ({
  removeObjectProperty: vi.fn(),
}));

describe('fixRemoveObjectProperty', () => {
  it('should call removeObjectProperty with the correct arguments when the fixer function is invoked', () => {
    const mockContext = {} as Rule.RuleContext;
    const mockFixer = {} as Rule.RuleFixer;
    const mockProperty = {} as ObjectProperty;

    const fixerFunction = fixRemoveObjectProperty(mockContext, mockProperty);

    fixerFunction(mockFixer);

    expect(removeObjectProperty).toHaveBeenCalledWith(
      mockContext,
      mockFixer,
      mockProperty,
    );
  });
});
