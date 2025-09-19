import { useEffect, useState } from "react";
import "./App.css";
import Question from "./Question";
import sampleQuestions from "./sampleQuestions";

export default function Trivia() {
  const [trivia, setTrivia] = useState([]);
  const [questionNo, setQuestionNo] = useState(0);

  const triviaurl =
    "https://opentdb.com/api.php?amount=10&category=15&difficulty=medium";

  const nextQuestion = () => {
    setQuestionNo((prev) => prev + 1);
  };

  const fetchTrivia = async () => {
    const response = await fetch(triviaurl);
    const data = await response.json();
    console.log(data.results[0].question);
    setTrivia(data.results);
    setTrivia(sampleQuestions);
  };

  useEffect(() => {
    setTrivia(sampleQuestions);
    // fetchTrivia();
  }, []);

  if (trivia.length === 0) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      {console.log(trivia)}
      <h1>Game Trivia</h1>
      <h2>
        Question {questionNo + 1} / {trivia.length}
      </h2>

      <Question question={trivia[questionNo]} nextQuestion={nextQuestion} />
      <button onClick={nextQuestion}>Skip</button>
    </>
  );
}
