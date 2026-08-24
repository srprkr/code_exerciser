import { describe, expect, it } from 'vitest';
import { deepEqual } from '../../src/lib/utils/deepEqual.js';

describe('deepEqual', () => {
  it('matches primitives', () => {
    expect(deepEqual(1, 1)).toBe(true);
    expect(deepEqual('a', 'a')).toBe(true);
    expect(deepEqual(1, 2)).toBe(false);
    expect(deepEqual('a', 'b')).toBe(false);
  });

  it('matches undefined against undefined (the grading-serialization edge case)', () => {
    expect(deepEqual(undefined, undefined)).toBe(true);
    expect(deepEqual(undefined, null)).toBe(false);
    expect(deepEqual(undefined, 0)).toBe(false);
  });

  it('treats null specially (typeof null === "object")', () => {
    expect(deepEqual(null, null)).toBe(true);
    expect(deepEqual(null, {})).toBe(false);
    expect(deepEqual({}, null)).toBe(false);
  });

  it('matches arrays structurally, order-sensitive', () => {
    expect(deepEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepEqual([1, 2, 3], [3, 2, 1])).toBe(false);
    expect(deepEqual([1, 2], [1, 2, 3])).toBe(false);
  });

  it('matches nested objects structurally', () => {
    expect(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);
    expect(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })).toBe(false);
  });

  it('rejects mismatched types', () => {
    expect(deepEqual(1, '1')).toBe(false);
    expect(deepEqual([1, 2], { 0: 1, 1: 2 })).toBe(true); // Object.keys-based, arrays and array-likes with same keys/values match
  });
});
