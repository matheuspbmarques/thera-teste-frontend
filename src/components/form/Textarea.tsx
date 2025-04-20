import inputError from "@/configs/styles/inputError";
import { UseFormRegisterTextareaReturn } from "@/hooks/useForm";

type TextAreaProps = {
    register?: UseFormRegisterTextareaReturn,
    errorMessages?: Array<string>,
    label?: string,
    id?: string,
    placeholder?: string
};

export default function TextArea ({
    id,
    label,
    errorMessages,
    register,
    placeholder
}: TextAreaProps) {
    const renderErrorMessages = errorMessages?.map((errorMessage, index) => {
        return <span key={index} className="text-rose-700 text-xs">{errorMessage}</span>
    });

    return (
        <div className="flex flex-col gap-1">
            {label && <label htmlFor={ id }>{ label }</label>}
            <textarea
                {...register}
                className={`border border-slate-800 rounded-lg p-2 outline-blue-700 resize-none`}
                style={errorMessages ? inputError : undefined}
                placeholder={placeholder}
            ></textarea>
            {renderErrorMessages}
        </div>
    )
}