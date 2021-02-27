import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import Styles from '../styles/components/ExperienceBar.module.css';

export function ExperienceBar(){

    const { currentExperience, experienceToNextLevel, percentToNextLevel } = useContext(ChallengesContext);

    return(
        <header className={Styles.expBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width:`${ percentToNextLevel }%` }} />
                <span className={Styles.currentExperience} style={{ left: `${ percentToNextLevel }%` }}> 
                    { currentExperience } xp 
                </span>
            </div>
            <span>{ experienceToNextLevel } xp</span>
        </header>
    );
}