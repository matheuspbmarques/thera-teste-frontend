import inputError from "@/configs/styles/inputError";
import { UseFormRegisterInputReturn } from "@/hooks/useForm";

type InputProps = {
    label?: string,
    register?: UseFormRegisterInputReturn,
    errorMessages?: Array<string>,
    id?: string,
    placeholder?: string,
};

export default function InputText ({
    label,
    register,
    errorMessages,
    id,
    placeholder
}:InputProps) {
    const renderErrorMessages = errorMessages?.map((errorMessage, index) => {
        return <span key={index} className="text-rose-700 text-xs">{ errorMessage }</span>;
    });

    return (
        <div className="flex flex-col gap-1">
            {label && <label htmlFor={id}>{ label }</label>}
            <input
                id={id}
                type="text"
                placeholder={placeholder}
                {...register}
                className="bg-white p-2 rounded-lg outline outline-gray-300 hover:outline-black focus:outline-blue-700 duration-300 dark:text-slate-800"
                style={errorMessages ? inputError : undefined}
            />
            { renderErrorMessages }
        </div>
    )
}