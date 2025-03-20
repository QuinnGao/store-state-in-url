import { getParams, typeOf } from "./utils";

function replacer(_key: string, value: unknown): unknown {
    const type = typeOf(value);

    if (type !== "object" && type !== "array") {
        return value;
    }

    if (type === "object") {
        const _value = value as { [key: string]: unknown };
        Object.keys(_value).forEach((objKey) => {
            _value[objKey] = replacer(_key, _value[objKey]);
        });
        return _value;
    }
    if (type === "array") {
        return (value as unknown as Array<unknown>).map(
            (val) => replacer(_key, val),
        );
    }

    return value;
}

const _encode = (payload: unknown): string => {
    if (typeOf(payload) === "function" || typeOf(payload) === "symbol") return "";

    return JSON.stringify(structuredClone(payload), replacer)
        .replace(/'/g, "%27")
        .replace(/"/g, "'");
}


const _decode = <T>(payload: string, fallback?: T) => {
    try {
        const _jsonStr = payload.replace(/'/g, '"').replace(/%27/g, "'")
        return JSON.parse(_jsonStr) as T;
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_) {
        return fallback as T ?? payload;
    }
}

export const decode = <T>(
    uriString: string | URLSearchParams,
    defaults?: T,
) => {
    return {
        ...(defaults || {}),
        ...Object.fromEntries(
            [...getParams(uriString).entries()].map(([key, value]) => {
                const fallback = defaults?.[key as keyof typeof defaults];
                return [key, _decode(value, fallback) ?? fallback];
            }),
        ),
    } as undefined extends T ? unknown : T;
}

export const encode = <T>(
    state: T,
    defaults?: T,
    paramsToKeep?: string | URLSearchParams,
) => {
    const params = getParams(paramsToKeep);
    Object.entries(state || {}).forEach(([key, value]) => {
        const initialVal = defaults?.[key as keyof typeof defaults];
        if (JSON.stringify(value) !== JSON.stringify(initialVal)) {
            params.set(key, _encode(value));
        }
    });
    return params.toString();
}