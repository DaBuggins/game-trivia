import { useEffect, useState } from "react";
import decodeHTML from "./utils";

export default function Question({ trivia, wrongAnswer, correctAnswer }) {
  if (!trivia) return null;

  const [choices, setChoices] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  const toggleDisable = () => {
    setDisableButton(true);
  };

  const handleClick = (e) => {
    if (e.target.innerText === decodeHTML(trivia.correct_answer)) {
      correctAnswer();
      toggleDisable();
    } else {
      wrongAnswer();
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
      <h2>{decodeHTML(trivia.question)}</h2>
      <h3>
        {choices.map((c) => {
          return (
            <button
              key={c}
              style={{ margin: "10px" }}
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
