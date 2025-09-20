export default function ScoreBanner({ score, trivia, questionNo }) {
  return (
    <>
      <h1>Game Trivia</h1>
      <h2>
        Score: {score} / {trivia.length}
      </h2>

      <h3>
        Question {questionNo + 1} / {trivia.length}
      </h3>
    </>
  );
}
