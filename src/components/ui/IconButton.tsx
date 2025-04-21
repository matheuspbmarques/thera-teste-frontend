import { HTMLAttributes } from "react";

export default function IconButton (props:HTMLAttributes<HTMLButtonElement>) {
    return (
        <button {...props} type="button" className={`bg-blue-700 text-slate-100 rounded-full p-2 duration-300 hover:bg-blue-500 ${props.className}`}>
            { props.children }
        </button>
    );
};