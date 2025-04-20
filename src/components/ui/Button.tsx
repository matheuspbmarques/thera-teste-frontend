import { ButtonHTMLAttributes } from "react";

type ButtonProps = {
    startIcon?: React.ReactNode,
    endIcon?: React.ReactNode,
    children?: React.ReactNode,
    className?: string,
    type?: ButtonHTMLAttributes<HTMLButtonElement>["type"],
    loadingText?: string,
    isLoading?: boolean
};

export default function Button({
    startIcon,
    endIcon,
    children,
    className,
    type = "button",
    loadingText,
    isLoading
}:ButtonProps) {
    return (
        <button
            className={`flex gap-2 p-2 bg-blue-700 text-slate-100 rounded-lg items-center ${className} hover:bg-blue-500 duration-300 outline-none`}
            type={type}
        >
            {
                isLoading
                ?
                loadingText ? loadingText : 'Loading...'
                :
                <>
                {startIcon}
                <span>{children}</span>
                {endIcon}
                </>
            }
        </button>
    )
}