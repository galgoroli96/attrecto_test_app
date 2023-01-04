import { useEffect, useState } from "react";

export function useLocalStorage(key: string, initialValue: string) {
    const [value, setValue] = useState(() => {
        const localValue = localStorage.getItem(key);
        if (localValue != null) return JSON.parse(localValue);
        return initialValue;
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
}