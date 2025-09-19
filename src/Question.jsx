import { useEffect, useState } from "react";

export default function Question({ question, nextQuestion }) {
  const [choices, setChoices] = useState([]);

  const decodeHTML = function (html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  const handleClick = (e) => {
    if (e.target.innerText === decodeHTML(question.correct_answer)) {
      alert("Correct!");
      nextQuestion();
    } else {
      alert("Wrong!");
    }
  };

  useEffect(() => {
    const answers = [...question.incorrect_answers, question.correct_answer];
    setChoices(answers.sort(() => Math.random() - 0.5));
  }, [question]);

  return (
    <>
      <h2>Question: {decodeHTML(question.question)}</h2>
      <h3>
        {choices.map((c) => {
          return (
            <div key={c} style={{ margin: "10px" }}>
              <button onClick={handleClick}>{decodeHTML(c)}</button>
            </div>
          );
        })}
      </h3>
    </>
  );
}
