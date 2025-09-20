import Alert from "@mui/material/Alert";

export default function AnswerFlash({ isWrong, isCorrect }) {
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Alert
          icon={false}
          variant="filled"
          severity="error"
          style={{ display: isWrong }}
        >
          Wrong..
        </Alert>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Alert
          icon={false}
          variant="filled"
          severity="success"
          style={{ display: isCorrect }}
        >
          Correct!
        </Alert>
      </div>
    </>
  );
}
