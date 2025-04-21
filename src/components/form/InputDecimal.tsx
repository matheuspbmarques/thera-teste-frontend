import inputError from "@/configs/styles/inputError";
import { UseFormRegisterInputReturn } from "@/hooks/useForm";

type InputDecimalProps = {
    label?: string,
    errorMessages?: Array<string>,
    id?: string,
    placeholder?: string,
    register?: UseFormRegisterInputReturn,
};

export default function InputDecimal ({
    label,
    errorMessages,
    id,
    placeholder,
    register
}:InputDecimalProps) {
    const renderErrorMessages = errorMessages?.map((errorMessage, index) => {
        return <span key={index} className="text-rose-700 text-xs">{ errorMessage }</span>;
    });

    return (
        <div className="flex flex-col gap-1 flex-1">
            {label && <label htmlFor={id}>{ label }</label>}
            <input
                type="text"
                placeholder={placeholder}
                className="bg-white p-2 outline outline-gray-300 rounded-lg hover:outline-black focus:outline-blue-700 duration-300 w-full placeholder-gray-400 dark:text-slate-800"
                style={errorMessages ? inputError : undefined}
                {...register}
            />
            {renderErrorMessages}
        </div>
    );
};