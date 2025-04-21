import { UseFormRegisterInputSelectReturn } from "@/hooks/useForm"
import { useState } from "react";
import { ChevronDown, ChevronUp, X } from "react-feather"
import colors from 'tailwindcss/colors'

type InputSelectProps = {
    label?: string,
    placeholder?: string,
    register?: UseFormRegisterInputSelectReturn,
    options: Array<SelectOption>
};
type SelectOption = {
    name: string,
    value: string
};

export default function InputSelect({
    label,
    placeholder,
    register,
    options
}: InputSelectProps) {
    const [valueSelect, setValueSelect] = useState<string | undefined>(options.find(option => option.value === register?.value)?.name);
    const [showOptions, setShowOptions] = useState<boolean>(false);

    const renderOptions = options.map(({ name, value }, index) => {
        return (
            <li
                key={index}
                className="p-2 border-gray-200 hover:bg-blue-100 duration-300"
                style={{
                    borderTop: index > 0 ? 1 : undefined
                }}
                onClick={() => {
                    register?.onSelect(value);
                    setValueSelect(name);
                    setShowOptions(false);
                }}
            >{name}</li>
        );
    });

    return (
        <div className="flex flex-col gap-1 flex-1">
            {label && <label>{label}</label>}
            <div
                className="bg-white outline outline-gray-300 rounded-lg flex gap-1 cursor-default relative hover:outline-black duration-300"
                onClick={() => {
                    if(typeof valueSelect == 'undefined') setShowOptions(!showOptions);
                }}
            >
                <span className="flex-1 py-2 pl-2" style={{
                    color: valueSelect ? colors.slate[800] : colors.gray[400]
                }}>{valueSelect ? valueSelect : placeholder}</span>
                {
                    valueSelect
                        ?
                        <div className="p-2" onClick={() => {
                            register?.onSelect(undefined)
                            setValueSelect(undefined);
                        }}>
                            <X />
                        </div>
                        :
                        <div className="p-2">
                            {
                                showOptions
                                ?
                                <ChevronUp className="text-gray-400" />
                                :
                                <ChevronDown className="text-gray-400" />
                            }
                        </div>
                }
                {showOptions && <ul className="absolute top-11 w-full bg-white left-0 z-10 rounded-lg overflow-hidden">
                    {renderOptions}
                </ul>}
            </div>
            <input
                type="text"
                name={register?.name}
                onChange={register?.onChange}
                value={register?.value}
                hidden
            />
        </div>
    )
}