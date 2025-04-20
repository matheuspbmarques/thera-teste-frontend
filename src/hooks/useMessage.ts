import { Dispatch, SetStateAction, useEffect, useState } from "react";

type UseMessageReturn = [
    message: string | undefined,
    setMessage: Dispatch<SetStateAction<string | undefined>>
];

export default function useMessage (delay: number): UseMessageReturn {
    const [message, setMessage] = useState<string>();

    useEffect(() => {
        const closeMessageTimeOut = setTimeout(() => {
            if (typeof message !== 'undefined') {
                setMessage(undefined);
            };
        }, delay);

        return () => {
            clearTimeout(closeMessageTimeOut);
        };
    });

    return [message, setMessage];
};