import { HTMLAttributes } from "react";

export default function IconButton (props:HTMLAttributes<HTMLButtonElement>) {
    return (
        <button className={`bg-blue-700 text-slate-100 rounded-full p-2 ${props.className}`} {...props}>
            { props.children }
        </button>
    );
};