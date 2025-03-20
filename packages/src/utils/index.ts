import { structuredClone as _structuredClone } from './structuredClone'

const structuredClone = <T>(obj: T): T => {
    // If structuredClone is not available, provide the polyfill
    return typeof structuredClone !== 'function' ? _structuredClone(obj) : structuredClone(obj);
}

/**
 * Type definition for all possible return values of the typeof operator
 */
type TypeofReturnType = 'undefined' | 'object' | 'boolean' | 'number' | 'bigint' | 'string' | 'symbol' | 'function' | 'null' | 'array' | 'object' | 'function' | 'date' | 'regexp' | 'map' | 'set' | 'weakmap' | 'weakset' | 'error';

/**
 * typeof operator polyfill for TypeScript
 * Implements the functionality of JavaScript's native typeof operator
 * 
 * @param value - The value to check the type of
 * @returns A string representing the type of the value, matching native typeof behavior
 */
const typeOf = (value: unknown): TypeofReturnType => {
    if (value === null) return "null";
    if (value === undefined) return "undefined";

    // Get the basic type using Object.prototype.toString
    const objectType = Object.prototype.toString.call(value).slice(8, -1).toLowerCase() as TypeofReturnType;
    return objectType;
};

const getParams = (strOrSearchParams?: string | URLSearchParams) =>
    new URLSearchParams(
        typeof strOrSearchParams === "string"
            ? getQueryFromHref(strOrSearchParams)
            : strOrSearchParams?.toString?.() || "",
    );

const getQueryFromHref = (str: string) => str.split("?")?.[1] || str || "";

export { structuredClone, typeOf, getParams };
