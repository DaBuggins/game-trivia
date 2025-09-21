import { Typography, Input, Select, Grid, Box, Button } from "@mui/material";

export default function Options({
  handleSettingsSubmit,
  amount,
  setAmount,
  difficulty,
  setDifficulty,
}) {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Typography
          variant="h3"
          style={{
            margin: "10px",
            padding: "10px",
            fontWeight: "700",
            fontStyle: "italic",
          }}
        >
          Make Your Choice
        </Typography>

        <form onSubmit={handleSettingsSubmit} style={{ marginBottom: "20px" }}>
          <Box>
            <label>
              Questions:
              <Input
                type="number"
                min="1"
                max="50"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ margin: "0 10px", width: "50px" }}
              />
            </label>
            <label>
              Difficulty:
              <Select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                style={{ margin: "0 10px" }}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </Select>
            </label>
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="success"
            style={{ margin: "10px" }}
          >
            Start Quiz
          </Button>
        </form>
      </Box>
    </>
  );
}
