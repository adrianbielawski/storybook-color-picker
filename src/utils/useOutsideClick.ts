import { MutableRefObject, useEffect } from "react";

export const useOutsideClick = (ref: MutableRefObject<HTMLElement>, callback: Function) => {
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                callback(e)
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref]);
}