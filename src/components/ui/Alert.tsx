import { CSSProperties, ReactNode, useMemo } from "react"
import { X } from 'react-feather'
import IconButton from "./IconButton";
import colors from 'tailwindcss/colors'

type AlertProps = {
    children?: ReactNode,
    onClose?: () => void,
    color?: 'success' | 'error'
};
type Color = {
    container: CSSProperties,
    button: CSSProperties,
}

export default function Alert ({
    children,
    onClose,
    color
}:AlertProps) {

    const colorDefined: Color = useMemo(() => {
        const primaryColor: Color = {
            container: {
                backgroundColor: colors.blue[700]
            },
            button: {
                backgroundColor: colors.slate[100],
                color: colors.slate[800]
            }
        };
    
        const successColor: Color = {
            container: {
                backgroundColor: colors.emerald[700]
            },
            button: {
                backgroundColor: colors.slate[100],
                color: colors.rose[700]
            }
        }

        const errorColor: Color = {
            container: {
                backgroundColor: colors.rose[700]
            },
            button: {
                backgroundColor: colors.slate[100],
                color: colors.rose[700]
            }
        };

        switch (color) {
            case 'success': return successColor

            case 'error': return errorColor

            default: return primaryColor
        };
    }, [color])

    return (
        <div className="fixed inset-x-6 bottom-6 flex py-2 pl-4 pr-2 rounded-full text-slate-100 max-w-3xl mx-auto items-center w-max gap-4" style={colorDefined.container}>
            <p className="flex-1">{ children }</p>
            <IconButton
                onClick={onClose}
                style={colorDefined.button}
            >
                <X />
            </IconButton>
        </div>
    )
}