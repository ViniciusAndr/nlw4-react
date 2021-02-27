import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import Styles from '../styles/components/Countdown.module.css';

export function Countdown(){

    const { minutes, seconds, hasFinished, isActive, resetCountdown, startCountdown } = useContext(CountdownContext);

    const [minuteL, minuteR] = String(minutes).padStart(2 , '0').split('');
    const [secundL, secundR] = String(seconds).padStart(2 , '0').split('');

    return(
            <div>
            <div className={Styles.countDownContainer}>
                <div>
                    <span>{ minuteL }</span>
                    <span>{ minuteR }</span>
                </div>
                <span>:</span>
                <div>
                    <span>{ secundL }</span>
                    <span>{ secundR }</span>
                </div>
            </div>

            {hasFinished ?(
                <button 
                    type="button" 
                    disabled
                    className={Styles.countdownButton}
                > 
                    Ciclo encerrado 
                </button>
            ) : (
                <>
                    {isActive ? (
                        <button 
                            onClick={resetCountdown} 
                            type="button" 
                            className={`${Styles.countdownButton} ${Styles.countdownButtonActive}`}
                        > 
                            Abandonar ciclo 
                        </button>
                    ) : (
                        <button 
                            onClick={startCountdown} 
                            type="button" 
                            className={Styles.countdownButton}
                        >
                            Iniciar um ciclo
                        </button>
                    )}
                </>
            )
                
        }
            
            

        </div>
    )
}