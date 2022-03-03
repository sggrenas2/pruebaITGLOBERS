import { useState, useEffect} from 'react';
import { airlines } from "./../Assets/airlines";
import { airlinesType } from "./../Typings/airlinesType";
import { NavLink } from "react-router-dom";
import styles from "./../Styles/Header.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faAngleDoubleRight,
    faJetFighter,
    faPlane,
    faPlaneArrival,
    faPlaneDeparture,
    faPlaneSlash
} from '@fortawesome/free-solid-svg-icons';


const Header = () => {

    const [airlinesList] = useState<Array<airlinesType>>(airlines);
    const [screenWidth, setScreenWidth] = useState<Number>(0);

    const icons = [
        <FontAwesomeIcon className={styles.icon} icon={faJetFighter} />,
        <FontAwesomeIcon className={styles.icon} icon={faPlane} />,
        <FontAwesomeIcon className={styles.icon} icon={faPlaneArrival} />,
        <FontAwesomeIcon className={styles.icon} icon={faPlaneDeparture} />,
        <FontAwesomeIcon className={styles.icon} icon={faPlaneSlash} />
    ]

    useEffect(() => {
        setScreenWidth(window.outerWidth);
        window.addEventListener('resize', () => {
            setScreenWidth(window.outerWidth);
        })
    },[]);

    return (
        <nav>
            { (screenWidth < 920) ?
                <>
                    <input type="checkbox" id={styles.menuControl} />
                    <label htmlFor={styles.menuControl}><FontAwesomeIcon className={styles.icon} icon={faAngleDoubleRight} /></label>
                </>
                : 
                '' 
            }
            <ul className={styles.menu} >
                {airlinesList.map((element, key) => 
                    <li key={key}>  
                        <NavLink 
                            to={`/${element.name.replaceAll(' ','_')}`}
                        ><span className={styles.icon}>{icons[key]}</span>{element.name}</NavLink>
                    </li>
                )}
            </ul>
        </nav>
    )


}

export default Header;