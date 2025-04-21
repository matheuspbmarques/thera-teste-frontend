import parseToDecimalString from "@/tools/parseToDecimal";
import { ChangeEvent, FormEvent, FormEventHandler, useState } from "react";

type CheckText = {
    type: 'text',
    min?: [number, errorMessage: string],
    max?: [number, errorMessage: string]
};
type CheckDecimal = {
    type: 'decimal',
    min?: [number, errorMessage: string],
    max?: [number, errorMessage: string]
};
type CheckUrl = {
    type: 'url',
    invalidMessage: string,
    requiredMessage?: string
};
type CheckSelect = {
    type: 'select',
    requiredMessage?: string
};

export type UseFormCheck<Form> = {
    [K in keyof Form]: CheckText | CheckDecimal | CheckUrl | CheckSelect
};

type Error<Form> = {
    [K in keyof Form]: Array<string> | undefined
};

type SubmitFunction<Form> = (formData: Form) => void;

function checkText (value: FormDataEntryValue, check: CheckText): Array<string> | undefined {
    const errorMessages: Array<string> = [];

    if (check.min) {
        const [min, errorMessage] = check.min;

        if (value.toString().length < min && !errorMessages.includes(errorMessage)) errorMessages.push(errorMessage);
    };

    if (check.max) {
        const [max, errorMessage] = check.max;

        if (value.toString().length > max && !errorMessages.includes(errorMessage)) errorMessages.push(errorMessage);
    };

    return errorMessages.length === 0 ? undefined : errorMessages;
};
function checkDecimal (value: FormDataEntryValue, check: CheckDecimal): Array<string> | undefined {
    const errorMessages: Array<string> = [];

    if (check.min) {
        const [min, errorMessage] = check.min;

        if (value.toString().length < min && !errorMessages.includes(errorMessage)) errorMessages.push(errorMessage);
    };

    if (check.max) {
        const [max, errorMessage] = check.max;

        if (value.toString().length > max && !errorMessages.includes(errorMessage)) errorMessages.push(errorMessage);
    };

    return errorMessages.length === 0 ? undefined : errorMessages;
};
function checkUrl (value: FormDataEntryValue, check: CheckUrl): Array<string> | undefined {
    const errorMessages: Array<string> = [];

    if (check.requiredMessage && value.toString() == "") {
        errorMessages.push(check.requiredMessage);
    };

    if (
        !/^(https?:\/\/)?(www\.)?([a-zA-Z0-9\-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/[^\s]*)?$/.test(value.toString()) &&
        !errorMessages.includes(check.invalidMessage)
    ) {
        errorMessages.push(check.invalidMessage);
    };

    return errorMessages.length === 0 ? undefined : errorMessages;
}
function checkSelect (value: FormDataEntryValue, check: CheckSelect): Array<string> | undefined {
    const errorMessages: Array<string> = [];

    if (check.requiredMessage && value.toString() == "") {
        errorMessages.push(check.requiredMessage);
    };

    return errorMessages.length === 0 ? undefined : errorMessages;
}

export type UseFormRegisterInputReturn = {
    name: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    value: string
};
export type UseFormRegisterTextareaReturn = {
    name: string,
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    value: string
};
export type UseFormRegisterInputSelectReturn = {
    name: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    value: string,
    onSelect: (value?: string) => void
};

type UseFormReturn<Form> = {
    handleOnSubmit: (submit:SubmitFunction<Form>) => FormEventHandler<HTMLFormElement>,
    inputError: Error<Form>,
    register: Register<Form>,
    resetFormData: () => void,
    formData: Form
};
type Register<Form> = {
    inputText: (inputName: keyof Form) => UseFormRegisterInputReturn,
    inputDecimal: (inputName: keyof Form) => UseFormRegisterInputReturn,
    inputTextArea: (inputName: keyof Form) => UseFormRegisterTextareaReturn,
    inputSelect: (inputName: keyof Form) => UseFormRegisterInputSelectReturn,
};

export default function useForm <Form extends object> (check:UseFormCheck<Form>): UseFormReturn<Form> {
    const [formData, setFormData] = useState<Form>({} as Form);
    const [inputError, setInputError] = useState<Error<Form>>({} as Error<Form>);

    function addInputError (inputName: string, errors: Array<string> | undefined): void {
        inputError[inputName as keyof Form] = errors;

        setInputError({ ...inputError });
    };

    function hasInputError (): boolean {
        const errors = Object.keys(inputError);

        return errors.length > 0;
    };

    function handleOnSubmit (submit: SubmitFunction<Form>): FormEventHandler<HTMLFormElement> {
        return (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();

            setInputError({} as Error<Form>);

            const formData: Record<string, unknown> = {};
    
            const formDataDefault = new FormData(event.currentTarget);

            function addOnFormData (inputName: string, value: FormDataEntryValue, valueType: 'text' | 'decimal' | 'url' | 'select') {
                switch (valueType) {
                    case 'text': {
                        formData[inputName] = value.toString() === '' ? undefined : value.toString();

                        break;
                    };

                    case 'decimal': {
                        if (value.toString() === '' || isNaN(parseFloat(value.toString().replaceAll('.', '').replace(',', '.')))) {
                            formData[inputName] = undefined;
                        } else {
                            formData[inputName] = parseFloat(value.toString().replaceAll('.', '').replace(',', '.'));
                        };

                        break;
                    };

                    case 'url': {
                        formData[inputName] = value.toString() === '' ? undefined : value.toString();

                        break;
                    };

                    case 'select': {
                        formData[inputName] = value.toString() === '' ? undefined : value.toString();

                        break;
                    };
                };
            };
    
            formDataDefault.forEach((inputValue, inputName) => {
                const inputCheck = check[inputName as keyof Form];
    
                switch (inputCheck.type) {
                    case 'text': {
                        const errorMessages = checkText(inputValue, inputCheck);
    
                        if (errorMessages) addInputError(inputName, errorMessages);
                            
                        addOnFormData(inputName, inputValue, inputCheck.type);
    
                        break;
                    };

                    case 'decimal': {
                        const errorMessages = checkDecimal(inputValue, inputCheck);
    
                        if (errorMessages) addInputError(inputName, errorMessages);

                        addOnFormData(inputName, inputValue, inputCheck.type);
    
                        break;
                    };

                    case 'url': {
                        const errorMessages = checkUrl(inputValue, inputCheck);
    
                        if (errorMessages) addInputError(inputName, errorMessages);

                        addOnFormData(inputName, inputValue, inputCheck.type);
    
                        break;
                    };

                    case 'select': {
                        const errorMessages = checkSelect(inputValue, inputCheck);
    
                        if (errorMessages) addInputError(inputName, errorMessages);

                        addOnFormData(inputName, inputValue, inputCheck.type);
    
                        break;
                    }
                };
            })

            if (!hasInputError()) {
                submit(formData as Form);
            };
        };
    };

    function resetFormData () {
        setFormData({} as Form);
    };

    function setNewValueToFormData (inputName: keyof Form, value?: string) {
        if (value) {
            formData[inputName] = value as Form[keyof Form];
        } else {
            delete formData[inputName];
        };

        setFormData({ ...formData });
    };

    function registerInputText (inputName: keyof Form): UseFormRegisterInputReturn {
        function onChange (e: ChangeEvent<HTMLInputElement>) {
            if (typeof inputError[inputName] !== 'undefined') {
                delete inputError[inputName];

                setInputError({...inputError});
            };

            setNewValueToFormData(inputName, e.target.value);
        };

        return {
            name: inputName as string,
            onChange,
            value: Object.create(formData)[inputName] ?? ''
        };
    };

    function registerInputDecimal (inputName: keyof Form): UseFormRegisterInputReturn {
        function onChange (e: ChangeEvent<HTMLInputElement>) {
            if (typeof inputError[inputName] !== 'undefined') {
                delete inputError[inputName];

                setInputError({...inputError});
            };

            const { valueString } = parseToDecimalString(e.target.value);

            setNewValueToFormData(inputName, valueString);
        };

        return {
            name: inputName as string,
            onChange,
            value: Object.create(formData)[inputName] ?? ''
        };
    };

    function registerInputTextArea (inputName: keyof Form): UseFormRegisterTextareaReturn {
        function onChange (e: ChangeEvent<HTMLTextAreaElement>) {
            if (typeof inputError[inputName] !== 'undefined') {
                delete inputError[inputName];

                setInputError({...inputError});
            };

            setNewValueToFormData(inputName, e.target.value);
        };

        return {
            name: inputName as string,
            onChange,
            value: Object.create(formData)[inputName] ?? ''
        };
    };

    function registerInputSelect (inputName: keyof Form): UseFormRegisterInputSelectReturn {
        function onChange (e: ChangeEvent<HTMLInputElement>) {
            if (typeof inputError[inputName] !== 'undefined') {
                delete inputError[inputName];

                setInputError({...inputError});
            };

            setNewValueToFormData(inputName, e.target.value);
        };

        function onSelect (value?: string): void {
            if (typeof inputError[inputName] !== 'undefined') {
                delete inputError[inputName];

                setInputError({...inputError});
            };

            setNewValueToFormData(inputName, value);
        };

        return {
            name: inputName as string,
            onChange,
            value: Object.create(formData)[inputName] ?? '',
            onSelect
        };
    };

    return {
        handleOnSubmit,
        inputError,
        register: {
            inputText: registerInputText,
            inputDecimal: registerInputDecimal,
            inputTextArea: registerInputTextArea,
            inputSelect: registerInputSelect
        },
        resetFormData,
        formData
    };
};