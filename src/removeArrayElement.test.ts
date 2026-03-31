import type { Rule } from "eslint";
import type * as ESTree from "estree";

import { describe, expect, it, vi } from "vitest";

import type { ArrayElement, ArrayElementsOrParent } from "./removeArrayElement";

import { removeArrayElement } from "./removeArrayElement";

describe("removeArrayElement", () => {
	it("should throw an error if the element is null", () => {
		const mockContext = {
			sourceCode: {
				getTokenAfter: vi.fn(),
				getTokenBefore: vi.fn(),
			},
		} as unknown as Rule.RuleContext;
		const mockFixer = {} as Rule.RuleFixer;
		const mockElements = [null, null];
		const mockIndex = 0;

		expect(() => [
			...removeArrayElement(mockContext, mockFixer, mockIndex, mockElements),
		]).toThrow("Cannot remove a null (blank) array element.");
	});

	it("should throw an error if the element is not a child of the parent array", () => {
		const mockContext = {
			sourceCode: {
				getTokenAfter: vi.fn(),
				getTokenBefore: vi.fn(),
			},
		} as unknown as Rule.RuleContext;
		const remove = vi.fn();
		const mockFixer = { remove } as unknown as Rule.RuleFixer;
		const mockElements: ArrayElementsOrParent = [];
		const mockElement: ArrayElement = { type: "Literal", value: 42 };

		expect(() => [
			...removeArrayElement(mockContext, mockFixer, mockElement, mockElements),
		]).toThrow("Node is not a child of the parent array.");
	});

	it("should remove the element and trailing comma when it is not the last element", () => {
		const mockContext = {
			sourceCode: {
				getTokenAfter: vi.fn().mockReturnValue({ value: "," }),
				getTokenBefore: vi.fn().mockReturnValue({ value: "," }),
			},
		} as unknown as Rule.RuleContext;
		const remove = vi.fn();
		const mockFixer = { remove } as unknown as Rule.RuleFixer;
		const mockElements: ArrayElement[] = [
			{ type: "Literal", value: 1 },
			{ type: "Literal", value: 2 },
		];
		const mockIndex = 1;

		const fixes = [
			...removeArrayElement(mockContext, mockFixer, mockIndex, mockElements),
		];

		expect(remove).toHaveBeenCalledWith(mockElements[1]);
		expect(remove).toHaveBeenCalledWith({ value: "," }); // Trailing comma
		expect(fixes).toHaveLength(2);
	});

	it("should remove the element and trailing comma when it is the first element", () => {
		const mockContext = {
			sourceCode: {
				getTokenAfter: vi.fn().mockReturnValue({ value: "," }),
				getTokenBefore: vi.fn().mockReturnValue(undefined),
			},
		} as unknown as Rule.RuleContext;
		const remove = vi.fn();
		const mockFixer = { remove } as unknown as Rule.RuleFixer;
		const mockElements: ArrayElement[] = [
			{ type: "Literal", value: 1 },
			{ type: "Literal", value: 2 },
		];
		const mockIndex = 1;

		const fixes = [
			...removeArrayElement(mockContext, mockFixer, mockIndex, mockElements),
		];

		expect(remove).toHaveBeenCalledWith(mockElements[1]);
		expect(remove).toHaveBeenCalledWith({ value: "," }); // Trailing comma
		expect(fixes).toHaveLength(2);
	});

	it("should remove the element and preceding comma when it is the last element", () => {
		const mockContext = {
			sourceCode: {
				getTokenAfter: vi.fn().mockReturnValue(undefined),
				getTokenBefore: vi.fn().mockReturnValue({ value: "," }),
			},
		} as unknown as Rule.RuleContext;
		const remove = vi.fn();
		const mockFixer = { remove } as unknown as Rule.RuleFixer;
		const mockElements: ArrayElement[] = [
			{ type: "Literal", value: 1 },
			{ type: "Literal", value: 2 },
		];
		const mockIndex = 1;

		const fixes = [
			...removeArrayElement(mockContext, mockFixer, mockIndex, mockElements),
		];

		expect(remove).toHaveBeenCalledWith(mockElements[1]);
		expect(remove).toHaveBeenCalledWith({ value: "," }); // Preceding comma
		expect(fixes).toHaveLength(2);
	});

	it("should remove the element without commas when it is the only element", () => {
		const mockContext = {
			sourceCode: {
				getTokenAfter: vi.fn().mockReturnValue(undefined),
				getTokenBefore: vi.fn().mockReturnValue(undefined),
			},
		} as unknown as Rule.RuleContext;
		const remove = vi.fn();
		const mockFixer = { remove } as unknown as Rule.RuleFixer;
		const mockElements: ArrayElement[] = [{ type: "Literal", value: 1 }];
		const mockIndex = 0;

		const fixes = [
			...removeArrayElement(mockContext, mockFixer, mockIndex, mockElements),
		];

		expect(remove).toHaveBeenCalledWith(mockElements[0]);
		expect(fixes).toHaveLength(1);
	});

	it("should handle both array expression node and element", () => {
		const mockContext = {
			sourceCode: {
				getTokenAfter: vi.fn().mockReturnValue({ value: "," }),
				getTokenBefore: vi.fn().mockReturnValue({ value: "," }),
			},
		} as unknown as Rule.RuleContext;
		const remove = vi.fn();
		const mockFixer = { remove } as unknown as Rule.RuleFixer;
		const mockArrayExpression: ESTree.ArrayExpression = {
			elements: [
				{ type: "Literal", value: 1 },
				{ type: "Literal", value: 2 },
			],
			type: "ArrayExpression",
		};
		const mockIndex: ArrayElement = { type: "Literal", value: 2 };
		mockArrayExpression.elements.indexOf = vi.fn().mockReturnValue(1);

		const fixes = [
			...removeArrayElement(
				mockContext,
				mockFixer,
				mockIndex,
				mockArrayExpression,
			),
		];

		expect(remove).toHaveBeenCalledWith(mockArrayExpression.elements[1]);
		expect(remove).toHaveBeenCalledWith({ value: "," }); // Trailing comma
		expect(fixes).toHaveLength(2);
	});

	it("should leave the token before and after if they're not commas", () => {
		const mockContext = {
			sourceCode: {
				getTokenAfter: vi.fn().mockReturnValue({ value: "." }),
				getTokenBefore: vi.fn().mockReturnValue({ value: "." }),
			},
		} as unknown as Rule.RuleContext;
		const remove = vi.fn();
		const mockFixer = { remove } as unknown as Rule.RuleFixer;
		const mockArrayExpression: ESTree.ArrayExpression = {
			elements: [
				{ type: "Literal", value: 1 },
				{ type: "Literal", value: 2 },
			],
			type: "ArrayExpression",
		};
		const mockIndex = 1;

		const fixes = [
			...removeArrayElement(
				mockContext,
				mockFixer,
				mockIndex,
				mockArrayExpression,
			),
		];

		expect(remove).toHaveBeenCalledWith(mockArrayExpression.elements[1]);
		expect(fixes).toHaveLength(1);
	});
});
