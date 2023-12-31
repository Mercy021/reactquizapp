import React, {useState} from 'react';
import { fetchQuizQuestions } from './API';
//components
import QuestionCard from './Components/QuestionCard';
//types
import {QuestionState, Difficulty } from './API';

type AnswerObject={
  question: string;
  answer: string; 
  correct: boolean;
  correctAnswer: string;

}

const TOTAL_QUESTIONS= 10;


const App = () =>{
  const [loading, setLoading]= useState(false);
  const [questions, setQuestions]= useState<QuestionState[]>([]);
  const [number, setNumber]= useState(0);
  const [userAnswer, setUserAnswers]= useState<AnswerObject[]>([]);
  const [score, setScore]= useState(0);
  const [gameOver, setGameOver]= useState(true);

  console.log(questions);

  const startTrivia= async ()=>{
    setLoading(true);
    setGameOver(false)

    const newQuestion= await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestion);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);


  }
  const checkAnswer= (e:React. MouseEvent<HTMLButtonElement>) =>{

  }
  const nextQuestion=() =>{

  }
  return (
    <div className="App">
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswer.length === TOTAL_QUESTIONS ? ( 
      <button className='start' onClick={startTrivia}>
        Start
      </button>
      ): null}
      {! gameOver ? <p className='score'>Score:</p> : null}
      { loading && <p>Loading Questions ....</p>}
      {!loading && !gameOver &&(
      <QuestionCard
      questionNr={number + 1}
      totalQuestions={TOTAL_QUESTIONS}
      question={questions[number].question}
      answers={questions[number].answers}
      userAnswer={userAnswer ? userAnswer[number] :undefined}
      callback={checkAnswer}
      />
      )}
      {!gameOver && 
      !loading && 
      userAnswer.length=== number + 1 && 
      number!== TOTAL_QUESTIONS-1 ? (
        <button className='next' onClick={nextQuestion}>
        Next Question
      </button>
      ) :null}

      </div>
  );
}

export default App;


