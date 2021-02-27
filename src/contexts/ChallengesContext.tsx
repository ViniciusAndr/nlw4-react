import { createContext, ReactNode, useEffect, useState } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';


interface ChallangeProviderProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

interface Challenge{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
    percentToNextLevel: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelupModal: () => void;
}

export const ChallengesContext = createContext({} as ChallengesContextData);

export function ChallengesProvider({ children, ...rest } :ChallangeProviderProps){

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    const percentToNextLevel = Math.round(( currentExperience * 100) / experienceToNextLevel);

    useEffect( () => {
        Notification.requestPermission();
    }, [])

    useEffect( () => {
        Cookies.set('level', level.toString())
        Cookies.set('currentExperience', currentExperience.toString())
        Cookies.set('challengesCompleted', challengesCompleted.toString())

    }, [level, currentExperience, challengesCompleted])

    function levelUp(){
        setLevel(level+1);
        setIsLevelUpModalOpen(true);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        if(Notification.permission === 'granted'){
            const audio = new Audio('notification.mp3');
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount} xp!`
            })
            audio.play();
        }
    }

    function resetChallenge(){
        if(currentExperience > 0){
            const { amount } = activeChallenge;
            let finalExperience = currentExperience - amount; 
            setCurrentExperience(finalExperience < 0 ? 0 : finalExperience);
        }
            
        setActiveChallenge(null);
    }

    function closeLevelupModal(){
        setIsLevelUpModalOpen(false);
    }

    function completeChallenge(){
        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;

        if(finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setChallengesCompleted(challengesCompleted+1);
        setActiveChallenge(null);
    }

    return(
        <ChallengesContext.Provider value={{ 
                level, 
                currentExperience,
                challengesCompleted, 
                startNewChallenge, 
                levelUp,
                activeChallenge,
                resetChallenge,
                completeChallenge,
                experienceToNextLevel,
                percentToNextLevel,
                closeLevelupModal
            }} >
            { children }
            { isLevelUpModalOpen && <LevelUpModal />}
        </ChallengesContext.Provider>

    )
}

