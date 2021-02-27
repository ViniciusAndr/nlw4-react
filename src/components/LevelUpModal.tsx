import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/LevelUpModal.module.css';

export function LevelUpModal(){
    const { level, closeLevelupModal } = useContext(ChallengesContext);
    return(
        <div className={styles.overlay}>
            <div className={ styles.container} >
                <header>{ level }</header>
                <strong>parabens</strong>
                <p>Você alcançou um novo nível!</p>

                <button type="button" onClick={ closeLevelupModal }>
                    <img src="/icons/close.svg" alt=""/>
                </button>
            </div>
        </div>
    )
}