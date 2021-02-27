import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import Styles from '../styles/components/Profile.module.css';

export function Profile(){
    const { level } = useContext(ChallengesContext);

    return(
        <div className={Styles.profileContainer}>
            <img src="https://github.com/ViniciusAndr.png" alt="Vinicius de Andrade"/>
            <div>
                <strong>Vinicius de Andrade</strong>
                <p>
                    <img src="icons/level.svg" alt="level"/>
                    Level { level }
                </p>
            </div>
        </div>
    );
}