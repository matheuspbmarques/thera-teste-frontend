import inputError from "@/configs/styles/inputError";
import { UseFormRegisterInputReturn } from "@/hooks/useForm";

type InputSearchProps = {
    label?: string,
    register?: UseFormRegisterInputReturn,
    errorMessages?: Array<string>,
    id?: string,
    placeholder?: string,
};

export default function InputSearch ({
    label,
    register,
    errorMessages,
    id,
    placeholder
}:InputSearchProps) {
    const renderErrorMessages = errorMessages?.map((errorMessage, index) => {
        return <span key={index} className="text-rose-700 text-xs">{ errorMessage }</span>;
    });

    return (
        <div className="flex flex-col gap-1">
            {label && <label htmlFor={id}>{ label }</label>}
            <div className="bg-white p-2 rounded-lg">
                <input
                    id={id}
                    type="text"
                    placeholder={placeholder}
                    {...register}
                    style={errorMessages ? inputError : undefined}
                />
            </div>
            { renderErrorMessages }
        </div>
    )
}