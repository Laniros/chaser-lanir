import React, { useEffect, useState } from "react";
import * as firebase from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import Alert from "@material-ui/lab/Alert";

export function AddQ() {
  const [value, setValue] = useState(0);
  const [season, setSeason] = useState(0);
  const [data, setData] = useState("");
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [episode, setEpisode] = useState("");

  const handleChangeValue = (event) => {
    setValue(event.target.value);
  };
  const handleChangeSeason = (event) => {
    setSeason(event.target.value);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    await changeData().then(console.log(data));
  }

  async function changeData() {
    setError("");
    setData({
      question: question,
      1: { answer: answer1, isCorrect: parseInt(value) === 1 },
      2: { answer: answer2, isCorrect: parseInt(value) === 2 },
      3: { answer: answer3, isCorrect: parseInt(value) === 3 },
    });
  }

  const changeQuestion = (event) => {
    setQuestion(event.target.value);
  };

  //not the best use but safe as long as only the button calls for a change in data state
  useEffect(() => {
    if (data && season > 0) {
      const ref = firebase.firestore.collection(
        "questions-" + season + "-" + episode
      );
      ref
        .add(Object.assign({}, data))
        .then(console.log("success"))
        .catch((error) => setError(error));
      console.log(data);
    }
  }, [data]);

  const useStyles = makeStyles((theme) => ({
    box: {
      position: "fixed",
      top: "40%",
      left: "40%",
      transform: "translate(-50%, -50%)",
      width: "1000px",
      textAlign: "center",
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      alignContent: "center",

      color: theme.palette.text.secondary,
    },
  }));

  const classes = useStyles();

  return (
    <div dir="rtl">
      <Box className={classes.box}>
        <form className={classes.container} onSubmit={handleSubmit}>
          {error ? <Alert severity="error">{error}</Alert> : ""}
          <Grid container alignItems="center" spacing={3}>
            <Grid item={true} xs={9}>
              <TextField
                placeholder="כתוב את השאלה"
                fullWidth
                className={classes.paper}
                id="outlined-basic-0"
                variant="outlined"
                required
                onChange={changeQuestion}
              />
            </Grid>
            <Grid item={true} xs={3}>
              <Paper></Paper>
            </Grid>
            <Grid item={true} xs={3}>
              <TextField
                placeholder="תשובה 1"
                fullWidth
                className={classes.paper}
                id="outlined-basic-1"
                variant="outlined"
                required
                onChange={(e) => setAnswer1(e.target.value)}
              />
            </Grid>
            <Grid item={true} xs={3}>
              <TextField
                placeholder="תשובה 2"
                fullWidth
                className={classes.paper}
                id="outlined-basic-2"
                variant="outlined"
                required
                onChange={(e) => setAnswer2(e.target.value)}
              />
            </Grid>
            <Grid item={true} xs={3}>
              <TextField
                placeholder="תשובה 3"
                fullWidth
                className={classes.paper}
                id="outlined-basic-3"
                variant="outlined"
                required
                onChange={(e) => setAnswer3(e.target.value)}
              />
            </Grid>
            <Grid item={true} xs={3}>
              <Paper></Paper>
            </Grid>

            <Grid container direction="row">
              <Grid item={true} xs={3}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">תשובה נכונה</FormLabel>
                  <RadioGroup
                    row
                    aria-label="answer"
                    name="answer"
                    value={value}
                    onChange={handleChangeValue}
                    required
                  >
                    <FormControlLabel value="1" control={<Radio />} label="1" />

                    <FormControlLabel value="2" control={<Radio />} label="2" />
                    <FormControlLabel value="3" control={<Radio />} label="3" />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item={true} xs={2}>
                <TextField
                  placeholder="מספר פרק"
                  fullWidth
                  className={classes.paper}
                  id="outlined-basic-4"
                  variant="outlined"
                  required
                  onChange={(e) => setEpisode(e.target.value)}
                />
              </Grid>
              <Grid item={true} xs={3}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">עונה</FormLabel>
                  <Grid container>
                    <RadioGroup
                      style={{ marginRight: "70px" }}
                      row
                      aria-label="season"
                      name="season"
                      value={season}
                      onChange={handleChangeSeason}
                      required
                    >
                      <FormControlLabel
                        value="3"
                        control={<Radio />}
                        label="3"
                      />

                      <FormControlLabel
                        value="4"
                        control={<Radio />}
                        label="4"
                      />
                      <FormControlLabel
                        value="5"
                        control={<Radio />}
                        label="5"
                      />
                    </RadioGroup>
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            style={{ marginLeft: "220px", marginTop: "50px" }}
            variant="contained"
            color="primary"
          >
            הכנס שאלה למאגר
          </Button>
        </form>
      </Box>
    </div>
  );
}

export default AddQ;
