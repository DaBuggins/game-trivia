import { Typography } from "@mui/material";

export default function ScoreBanner({ score, trivia, questionNo }) {
  return (
    <>
      <Typography variant="h2">Game Trivia</Typography>
      <Typography variant="h4">Score: {score}</Typography>

      <Typography variant="overline" style={{fontSize: "2rem"}}>
        Question {questionNo + 1} / {trivia.length}
      </Typography>
    </>
  );
}
