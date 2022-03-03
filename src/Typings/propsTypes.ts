
export interface inputsPropsType{
    inputState: validState;
    stateModifier: (stado:validState) => void;
    type: string;
    label?: string;
    name?: string;
    placeholder?: string;
    inputID?: string;
    inputClasses?: string;
    messages?: messages;
    validator?: string;
    functionValidator?: (valor:React.FormEvent<HTMLInputElement>) => boolean;
}

export interface validState{
    isValid: boolean | undefined;
    value: string;
}

interface messages{
    error: string;
    valid: string;
}