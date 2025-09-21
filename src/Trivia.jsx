import { useEffect, useState } from "react";
import "./App.css";
import Question from "./Question";
import sampleQuestions from "./sampleQuestions";
import AnswerFlash from "./AnswerFlash";
import ScoreBanner from "./ScoreBanner";
import Options from "./Options";
import { Typography, Box } from "@mui/material";

export default function Trivia() {
  // set no. questions & difficulty
  const [amount, setAmount] = useState(10);
  const [difficulty, setDifficulty] = useState("easy");

  // fetch data and track questions/answers
  const [trivia, setTrivia] = useState([]);
  const [questionNo, setQuestionNo] = useState(0);
  const [answer, setAnswer] = useState({ correct: "none", wrong: "none" });
  const [score, setScore] = useState(0);

  const isQuizEnd = questionNo >= trivia.length;

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

  const nextQuestion = () => {
    if (isQuizEnd) {
      return;
    }
    setQuestionNo((prev) => prev + 1);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore((score) => score + 1);
      setAnswer({ ...answer, correct: "block", wrong: "none" });
    } else {
      setAnswer({ correct: "none", wrong: "block" });
    }
    setTimeout(() => {
      setAnswer({ wrong: "none", correct: "none" });
      nextQuestion();
    }, 1000);
  };

  const handleSettingsSubmit = (e) => {
    e.preventDefault();
    fetchTrivia();
  };

  if (trivia.length === 0) {
    return (
      <>
        <Options
          handleSettingsSubmit={handleSettingsSubmit}
          amount={amount}
          setAmount={setAmount}
          difficulty={difficulty}
          setDifficulty={setDifficulty}
        />
      </>
    );
  }

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 1,
          borderRadius: 2,
          p: 2,
          minWidth: 300,
        }}
      >
        {isQuizEnd ? (
          // End card UI
          <div style={{ textAlign: "center" }}>
            <Typography variant="h3" gutterBottom>
              Quiz Complete!
            </Typography>
            <Typography variant="h5" gutterBottom>
              You Scored: {score} / {trivia.length}
            </Typography>
            <br />
            <Options
              handleSettingsSubmit={handleSettingsSubmit}
              amount={amount}
              setAmount={setAmount}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
            />
          </div>
        ) : (
          <>
            <ScoreBanner
              score={score}
              trivia={trivia}
              questionNo={questionNo}
            />
            <AnswerFlash isWrong={answer.wrong} isCorrect={answer.correct} />
            <Question trivia={trivia[questionNo]} handleAnswer={handleAnswer} />
          </>
        )}
      </Box>
    </>
  );
}
