import { KeyboardEvent } from "react"

export const onKeyPressHandler = (evt: KeyboardEvent<HTMLElement>) => {
    const allowedKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "Delete", "Backspace", "ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight", "Tab", "."]
    const finder = allowedKeys.find(key => key === evt.key)

    if (!finder) evt.preventDefault()
}

export const replaceAlphabetInDigits = (val: string) => {
    return val.replace(/[^\d,]+/g, '');
}

export const numFormatter = (n: string | number | bigint, decimalSymbol?: string) => {
    let splitStr = n.toString().split(decimalSymbol || '.')
    splitStr[0] = splitStr[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')

    return splitStr.join(decimalSymbol || '.')
}

export const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const validURL = (str?: string) => {
    const res = (str || "").match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    return (res !== null)
}

export const debounce = <T extends (...args: any) => any>(func: T, wait?: number) => {
    let timeout: NodeJS.Timeout | number | undefined;
    return (...args: any) => {
        const later = () => {
            timeout = undefined;

            func(...args);
        };
        clearTimeout(timeout as number | undefined);

        timeout = setTimeout(later, wait);
    };
};

