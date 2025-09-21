import { useEffect, useState } from "react";
import { Card } from "@mui/material";
import decodeHTML from "./utils";

export default function Question({ trivia, handleAnswer }) {
  if (!trivia) return null;

  const [choices, setChoices] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  const toggleDisable = () => {
    setDisableButton(true);
  };

  const handleClick = (e) => {
    if (e.target.innerText === decodeHTML(trivia.correct_answer)) {
      handleAnswer(true);
      toggleDisable();
    } else {
      handleAnswer();
      toggleDisable();
    }
  };

  useEffect(() => {
    const answers = [...trivia.incorrect_answers, trivia.correct_answer];
    setChoices(answers.sort(() => Math.random() - 0.5));
    setDisableButton(false);
  }, [trivia]);

  return (
    <>
      <Card sx={{ border: "solid black 2px", padding: "10px" }}>
        <h2>{decodeHTML(trivia.question)}</h2>
      </Card>
      <h3>
        {choices.map((c) => {
          return (
            <button
              key={c}
              style={{
                margin: "10px",
                padding: "10px",
                backgroundColor: "lightgrey",
                fontWeight: "700",
                fontStyle: "italic",
              }}
              onClick={handleClick}
              disabled={disableButton}
            >
              {decodeHTML(c)}
            </button>
          );
        })}
      </h3>
    </>
  );
}
