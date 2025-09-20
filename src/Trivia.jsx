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

  // Controlled input state
  const [amount, setAmount] = useState(10);
  const [difficulty, setDifficulty] = useState("easy");

  const triviaurl =
    // "https://opentdb.com/api.php?amount=10&category=15&difficulty=medium";
    `https://opentdb.com/api.php?amount=${amount}&category=15&difficulty=${difficulty}`;

  const fetchTrivia = async () => {
    const response = await fetch(triviaurl);
    const data = await response.json();
    console.log(data.results[0].question);
    setTrivia(data.results);
    setQuestionNo(0);
    setScore(0);
  };

  // useEffect(() => {
  //   // setTrivia(sampleQuestions);
  //   fetchTrivia();
  // }, []);

  useEffect(() => {
    checkEnd();
  }, [score]);

  function checkEnd() {
    if (questionNo + 1 >= trivia.length) {
      console.log("END OF QUIZ");
      console.log(`SCORE: `, score);
      return true;
    }
  }

  const nextQuestion = () => {
    if (questionNo + 1 >= trivia.length) {
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

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    fetchTrivia();
  };

  if (trivia.length === 0) {
    return (
      <>
        <h2>Preparing...</h2>
        <form onSubmit={handleSettingsSubmit} style={{ marginBottom: "20px" }}>
          <label>
            Amount:
            <input
              type="number"
              min="1"
              max="50"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              style={{ margin: "0 10px" }}
            />
          </label>
          <label>
            Difficulty:
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              style={{ margin: "0 10px" }}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </label>
          <button type="submit">Start Quiz</button>
        </form>
      </>
    );
  }

  return (
    <>
      <form onSubmit={handleSettingsSubmit} style={{ marginBottom: "20px" }}>
        <label>
          Amount:
          <input
            type="number"
            min="1"
            max="50"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ margin: "0 10px" }}
          />
        </label>
        <label>
          Difficulty:
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            style={{ margin: "0 10px" }}
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </label>
        <button type="submit">Restart Quiz</button>
      </form>

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
