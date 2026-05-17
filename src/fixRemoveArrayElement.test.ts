import type { Rule } from 'eslint';

import { describe, expect, it, vi } from 'vitest';

import type { ArrayElementsOrParent } from './removeArrayElement';

import { fixRemoveArrayElement } from './fixRemoveArrayElement';
import { removeArrayElement } from './removeArrayElement';

vi.mock('../src/removeArrayElement', () => ({
  removeArrayElement: vi.fn(),
}));

describe('fixRemoveArrayElement', () => {
  it('should call removeArrayElement with the correct arguments when the fixer function is invoked', () => {
    const mockContext = {} as Rule.RuleContext;
    const mockFixer = {} as Rule.RuleFixer;
    const mockElementOrIndex = 1;
    const mockParentOrElements: ArrayElementsOrParent = [];

    const fixerFunction = fixRemoveArrayElement(
      mockContext,
      mockElementOrIndex,
      mockParentOrElements,
    );

    fixerFunction(mockFixer);

    expect(removeArrayElement).toHaveBeenCalledWith(
      mockContext,
      mockFixer,
      mockElementOrIndex,
      mockParentOrElements,
    );
  });
});
