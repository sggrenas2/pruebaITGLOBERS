import styles from "../Styles/Welcome.module.scss";

const Welcome = () => {
    return <>
        <div id={styles.container}>
            <h1 className={styles.title}>Bienvenido</h1>
            <p className={styles.subtitle}>Por favor seleccione una opcion del menu para contactarnos</p>
        </div>
    </>
}

export default Welcome;