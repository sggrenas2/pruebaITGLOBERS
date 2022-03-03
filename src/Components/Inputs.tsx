import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faCircleCheck,
    faCircleExclamation
} from "@fortawesome/free-solid-svg-icons";

import { inputsPropsType } from "../Typings/propsTypes";
import styles from "./../Styles/Inputs.module.scss";

const Inputs = (
    {
        inputState,
        type,
        stateModifier,
        ...props
    }: inputsPropsType
) => {

    const validateInput = (ev:React.FormEvent<HTMLInputElement>) => {
            // stateModifier({...inputState, value : ev.currentTarget.value})
        if(props.validator){
            let validator = new RegExp(props.validator)
            if(validator.test(ev.currentTarget.value)){
                stateModifier({ 
                    isValid: true, 
                    value : ev.currentTarget.value
                });
            }else{
                stateModifier({ 
                    ...inputState,
                    isValid: false 
                });
            }
        }else if(props.functionValidator){
            if(props.functionValidator(ev)){
                stateModifier({ 
                    isValid: true,
                    value : ev.currentTarget.value 
                });
            }else{
                stateModifier({ 
                    ...inputState,
                    isValid: false
                });
            }
        }else{
            console.warn(`No hay validador para el input ${type} con clases inputs ${props?.inputClasses}`);
        }

    }

    const blurEvent = () => {
        if(!inputState.isValid){
            setTimeout(()=>{
                stateModifier({...inputState, isValid: undefined})
            },1000)
        }
    }

    return <>
        <div className={styles.inputContainerGeneral}>
            <label htmlFor="input">{(props?.label)}</label>
            <div className={styles.inputContainer}>
                <input 
                    type={type} 
                    name={props?.name}  
                    placeholder={props.placeholder} 
                    className={`${styles.inputs} ${inputState.isValid !== undefined 
                        ? 
                        inputState.isValid ? 
                            styles.valid 
                            : 
                            styles.error 
                        : ''
                    } ${props.inputClasses}`} 
                    id={props.inputID}
                    onChange = {validateInput} 
                    onBlur ={blurEvent}
                    required
                />
                <span className={`${styles.inputIcon} ${inputState.isValid !== undefined 
                        ? 
                        inputState.isValid ? 
                            styles.valid 
                            : 
                            styles.error 
                        : ''
                    }`}>{
                    (inputState.isValid !== undefined) ? 
                        inputState.isValid ? 
                            <FontAwesomeIcon icon={faCircleCheck} />
                        :
                            <FontAwesomeIcon icon={faCircleExclamation} />
                    :
                    ''
                }
                </span>
            </div>
            <span className={styles.controlMessage}>
                {
                    (inputState.isValid !== undefined) ? 
                        inputState.isValid ? 
                            <span className={styles.valid}>{(props.messages) ? props.messages.valid : 'El valor es valido'}</span>
                        :
                            <span className={styles.error}>{(props.messages) ? props.messages.error : 'El valor no es valido'}</span>
                    :
                    ''
               }
            </span>
        </div>
    </>
}

export default Inputs;