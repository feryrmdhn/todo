import { useEffect, useRef } from "react"
import { debounce } from "../helper"

export const useDebounce = <T extends (...args: any) => any>(func: T, args: Array<any>, wait?: number, funcBeforeDebounce?: () => void) => {
    const debounceProcess = useRef(debounce(func, wait))

    const listener = () => {
        if (funcBeforeDebounce) funcBeforeDebounce()
        debounceProcess.current(...args)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(listener, [...args])
}