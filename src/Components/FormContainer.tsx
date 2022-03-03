import { useParams } from "react-router-dom";
import styles from './../Styles/FormContainer.module.scss';
import Inputs from './Inputs';
import { useState } from 'react';
import { validState } from "../Typings/propsTypes";
import { 
    messagesName,
    messagesCelular,
    messagesEdad,
    messagesEmail,
} from "../Assets/messages/inputsMessages";

const FormContainer = () => {

    const {airline} = useParams();

    const [isSuccessfull, triggerLightbox] = useState<boolean | undefined>(undefined)

    const [name, setName] = useState<validState>({
        isValid: undefined,
        value:"",
    });

    const [email, setEmail] = useState<validState>({
        isValid: undefined,
        value:"",
    });

    const [celular, setCelular] = useState<validState>({
        isValid: undefined,
        value:"",
    });

    const [edad, setEdad] = useState<validState>({
        isValid: undefined,
        value:"",
    });

    const submitForm = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if(
            name.isValid &&
            email.isValid &&
            celular.isValid &&
            edad.isValid
        ){  
            console.table({
                "nombre": name.value,
                "email": email.value,
                "celular": celular.value,
                "edad": edad.value
            });
            (document.getElementById('airlineForm') as HTMLFormElement )?.reset();
            triggerLightbox(true);
            setName({
                "isValid" : undefined,
                "value" : "",
            });
            setEmail({
                "isValid" : undefined,
                "value" : "",
            });
            setCelular({
                "isValid" : undefined,
                "value" : "",
            });
            setEdad({
                "isValid" : undefined,
                "value" : "",
            });
            setTimeout(() => { 
                triggerLightbox(undefined)
            }, 5000);
        }else{
            triggerLightbox(false);
            setTimeout(() => {
                triggerLightbox(undefined)
            },1000)
        }
      }

    const ageValidator = (ev:React.FormEvent<HTMLInputElement>) => {
        return (Number(ev.currentTarget.value) >= 18 && Number(ev.currentTarget.value) <= 100) ? true : false;
    }

    return (
        <> 
            <section className={styles.container}>
                <h1 className={styles.title}>Hola, Bienvenid@</h1>
                <p className={styles.subTitle}>Sabemos que quieres viajar en con {airline?.replace('_',' ')}, por favor diligencia el siguiente formulario:</p>
                <form onSubmit={submitForm} id="airlineForm">
                    <Inputs 
                        inputState={name}
                        type='text'
                        stateModifier={setName}
                        label="Nombre Completo"
                        placeholder="Inserte su Nombre"
                        validator="^([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\']+[\s])+([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])+[\s]?([A-Za-zÁÉÍÓÚñáéíóúÑ]{0}?[A-Za-zÁÉÍÓÚñáéíóúÑ\'])?$"
                        messages={messagesName}
                    />
                    <Inputs 
                        inputState={email}
                        type='text'
                        stateModifier={setEmail}
                        label="Correo Electronico"
                        placeholder="tucorreo@mail.com"
                        validator="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                        messages={messagesEmail}
                    />
                    <Inputs 
                        inputState={celular}
                        type='text'
                        stateModifier={setCelular}
                        label="Celular"
                        placeholder="3009999999"
                        validator="3[0-9]{9}$"
                        messages={messagesCelular}
                    />
                    <Inputs 
                        inputState={edad}
                        type='number'
                        stateModifier={setEdad}
                        label="Edad"
                        placeholder="valor numerico entre 18 y 100"
                        messages={messagesEdad}
                        functionValidator = {ageValidator}
                    />
                    <input type="submit" value={'enviar'} className={styles.submitButton}></input>
                </form> 
                {   (isSuccessfull !== undefined) ? 
                        (isSuccessfull) ?
                            <section id={styles.lightbox}>
                                <div className={styles.lContent}>
                                    <p className={styles.lTitle}>Envio Exitoso</p>
                                    <p className={styles.lSubtitle} >Tu información fue enviada con éxito, estaremos en contacto contigo</p>
                                </div>
                            </section>
                        :
                            <section id={styles.formError}>
                                <p className={styles.formErrorMessage}>El Formulario tiene campos invalidos</p>
                            </section>
                    :
                    ''
                }
            </section>
        </>
    )

}

export default FormContainer;