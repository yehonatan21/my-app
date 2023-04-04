import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Button, TextField } from "@mui/material";
import stringMath from 'string-math';

interface IRow {
  Row: string[];
  handleButtonClick: (value: string) => void;
}

const Row = (props: IRow) => {
  return (
    <React.Fragment>
      {props.Row.map((btn: string) => (
        <Grid item key={btn}>
          <Button
            value={btn}
            variant="contained"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              switch ((e.target as HTMLButtonElement).value) {
                case "=":
                  props.handleButtonClick("=");
                  break;
                case "C":
                  props.handleButtonClick("");
                  break;
                default:
                  props.handleButtonClick(
                    (e.target as HTMLButtonElement).value
                  );
              }
            }}
          >
            {btn}
          </Button>
        </Grid>
      ))}
    </React.Fragment>
  );
};

export const Calculator = () => {
  const [input, setInput] = React.useState("");

  const handleButtonClick = (value: string) => {
    switch (value) {
      case "":
        setInput("");
        break;
      case "=":
        setInput(String(stringMath(input)));
        break;
      default:
        setInput(input + value);
    }
  };

  return (
    <Box sx={{ position: "fixed", flexGrow: 1,  padding: 5, borderRadius: '5%', border: 1 }}>
      <TextField label="Input" value={input} variant="outlined" />
      <Grid>
        <Grid container item spacing={2}>
          <Row
            Row={["1", "2", "3", "C"]}
            handleButtonClick={handleButtonClick}
          />
        </Grid>
        <Grid container item spacing={2}>
          <Row
            Row={["4", "5", "6", " / "]}
            handleButtonClick={handleButtonClick}
          />
        </Grid>
        <Grid container item spacing={2}>
          <Row
            Row={["7", "8", "9", " - "]}
            handleButtonClick={handleButtonClick}
          />
        </Grid>
        <Grid container item spacing={2}>
          <Row
            Row={[" + ", " * ", ".", "="]}
            handleButtonClick={handleButtonClick}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
