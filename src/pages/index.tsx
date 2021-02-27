import Head from 'next/head';
import { GetServerSideProps } from 'next/';
import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallanges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';
import Styles from '../styles/pages/Home.module.css';
import React from 'react';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface AppProps{
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function  App(props: AppProps) {
  return (
    <ChallengesProvider 
      level={props.level} 
      challengesCompleted = {props.challengesCompleted} 
      currentExperience = {props.currentExperience}
    >
      <div className={Styles.container}>
        <Head>
          <title> inicio | Movit </title>
        </Head>
        <ExperienceBar/>
        <CountdownProvider>
          <section>
            <div >
              <Profile />
              <CompletedChallanges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const user = {
    level: 1,
    currentExperience: 50,
    challengesCompleted: 1
  }

  const { level, currentExperience, challengesCompleted } = ctx.req.cookies;

  return{
    props: { 
      level : Number(level), 
      currentExperience: Number(currentExperience), 
      challengesCompleted: Number(challengesCompleted)
    }
  }
}