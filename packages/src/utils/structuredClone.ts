/**
 * structuredClone polyfill - TypeScript version
 * Deep clones JavaScript objects, handling circular references
 * 
 * @param obj - The object to clone
 * @returns A deep clone of the input object
 */
function structuredClone<T>(obj: T): T {
    // Handle primitive types and null
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // Handle built-in types that require special handling
    if (obj instanceof Date) {
        return new Date(obj) as unknown as T;
    }
    if (obj instanceof RegExp) {
        return new RegExp(obj) as unknown as T;
    }
    if (obj instanceof Map) {
        const clonedMap = new Map();
        const refMap = new WeakMap();
        refMap.set(obj, clonedMap);

        obj.forEach((value, key) => {
            // Handle circular references for Map values
            if (typeof value === 'object' && value !== null) {
                if (refMap.has(value)) {
                    clonedMap.set(structuredClone(key), refMap.get(value));
                    return;
                }
            }
            clonedMap.set(structuredClone(key), structuredClone(value));
        });
        return clonedMap as unknown as T;
    }
    if (obj instanceof Set) {
        const clonedSet = new Set();
        const refMap = new WeakMap();
        refMap.set(obj, clonedSet);

        obj.forEach(value => {
            // Handle circular references for Set values
            if (typeof value === 'object' && value !== null) {
                if (refMap.has(value)) {
                    clonedSet.add(refMap.get(value));
                    return;
                }
            }
            clonedSet.add(structuredClone(value));
        });
        return clonedSet as unknown as T;
    }

    // Handle ArrayBuffer and TypedArrays
    if (obj instanceof ArrayBuffer) {
        return obj.slice(0) as unknown as T;
    }
    if (ArrayBuffer.isView(obj)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return new (obj.constructor as any)(obj.buffer.slice(0)) as unknown as T;
    }

    // Use WeakMap to track cloned objects and handle circular references
    const refMap = new WeakMap();

    function cloneObject<S>(source: S): S {
        if (source === null || typeof source !== 'object') {
            return source;
        }

        // Check if we've already cloned this object (circular reference)
        if (refMap.has(source as object)) {
            return refMap.get(source as object) as S;
        }

        // Create a new object or array
        const clone = Array.isArray(source) ? [] : {};

        // Store reference to the clone
        refMap.set(source as object, clone);

        // Clone each property
        Object.keys(source as object).forEach(key => {
            clone[key] = cloneObject((source)[key]);
        });

        return clone as S;
    }

    return cloneObject(obj);
}

export { structuredClone };