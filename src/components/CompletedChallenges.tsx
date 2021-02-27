import { useContext } from 'react'
import { ChallengesContext } from '../contexts/ChallengesContext'
import Styles from '../styles/components/CompletedChallanges.module.css'

export function CompletedChallanges(){
    const { challengesCompleted } = useContext(ChallengesContext);

    return (
        <div className={Styles.completedChallangesContainer}>
            <span>Desafios completos</span>
            <span>{challengesCompleted}</span>
        </div>
    )
}