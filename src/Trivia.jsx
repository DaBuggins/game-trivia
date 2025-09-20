import { useEffect, useState } from "react";
import "./App.css";
import Question from "./Question";
import sampleQuestions from "./sampleQuestions";
import AnswerFlash from "./AnswerFlash";
import ScoreBanner from "./ScoreBanner";

export default function Trivia() {
  const [trivia, setTrivia] = useState([]);
  const [questionNo, setQuestionNo] = useState(0);
  const [answer, setAnswer] = useState({ correct: "none", wrong: "none" });
  const [score, setScore] = useState(0);

  function checkEnd() {
    if (questionNo + 1 >= trivia.length) {
      console.log("END OF QUIZ");
      console.log(`SCORE: `, score);
      return true;
    }
  }

  const nextQuestion = () => {
    if (checkEnd()) {
      return;
    }
    setQuestionNo((prev) => prev + 1);
  };

  const wrongAnswer = () => {
    setAnswer({ wrong: "block", correct: "none" });
    setTimeout(() => {
      setAnswer({ wrong: "none", correct: "none" });
      nextQuestion();
    }, 1000); // Hide the alert after 1 second
  };

  const correctAnswer = () => {
    setScore((score) => score + 1);
    setAnswer({ ...answer, correct: "block" });
    setTimeout(() => {
      setAnswer({ wrong: "none", correct: "none" });
      nextQuestion();
    }, 1000); // Hide the alert after 1 second
  };

  const triviaurl =
    "https://opentdb.com/api.php?amount=10&category=15&difficulty=medium";
  // `https://opentdb.com/api.php?amount=${15}&category=15&difficulty=medium`;

  const fetchTrivia = async () => {
    const response = await fetch(triviaurl);
    const data = await response.json();
    console.log(data.results[0].question);
    setTrivia(data.results);
  };

  useEffect(() => {
    setTrivia(sampleQuestions);
    // fetchTrivia();
  }, []);

  useEffect(() => {
    checkEnd();
  }, [score]);

  if (trivia.length === 0) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      {console.log(trivia)}

      <ScoreBanner score={score} trivia={trivia} questionNo={questionNo} />

      <AnswerFlash isWrong={answer.wrong} isCorrect={answer.correct} />
      <Question
        trivia={trivia[questionNo]}
        wrongAnswer={wrongAnswer}
        correctAnswer={correctAnswer}
      />
      <button onClick={nextQuestion}>Skip</button>
    </>
  );
}
