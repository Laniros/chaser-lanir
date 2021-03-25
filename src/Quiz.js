import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { fetchQ } from "./firebase";
import noData from "./pics/noData.png";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
function Quiz({ match }) {
  const season = match.params.season;
  const episode = match.params.episode;
  const [data, setData] = useState("");
  const [numOfQuestion, setNumOfQuestion] = useState(0);
  const defaultStyling = {
    borderColor: "black",
    width: "100%",
    border: "1px solid",
  };
  const badAnswer = {
    width: "100%",
    border: "7px solid",
    borderBottom: 7,
    borderColor: "red",
  };
  const correctAnswer = {
    width: "100%",
    border: "7px solid",
    borderBottom: 1,
    borderColor: "green",
  };
  const [clicked, setClicked] = useState({
    1: false,
    2: false,
    3: false,
  });
  const [styling, setStyling] = useState({
    1: defaultStyling,
    2: defaultStyling,
    3: defaultStyling,
  });

  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      height: window.innerWidth > 700 ? "" : "80px",
      verticalAlign: "middle",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
    },
    button: {
      padding: theme.spacing(2),
      backgroundColor: "white",
      "&:hover": {
        background: "#E8E8E8",
      },
      height: "70px",
      weight: "60px",
    },
    grid: {
      padding: theme.spacing(2),
      justifyItems: "center",
    },
    spinner: {
      display: "flex",
      marginTop: "150px",
      flexDirection: "column",
      jusifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      minHeight: "40vh",
    },
    container: {
      marginTop: "100px",
    },
  }));
  function handleClick(number) {
    if (!clicked[number]) {
      if (data[numOfQuestion][number].isCorrect) {
        setStyling((prevState) => ({
          ...prevState,
          [number]: correctAnswer,
        }));
      } else {
        setStyling((prevState) => ({
          ...prevState,
          [number]: badAnswer,
        }));
      }
      setClicked((prevState) => ({
        ...prevState,
        [number]: true,
      }));
    } else {
      setStyling((prevState) => ({
        ...prevState,
        [number]: defaultStyling,
      }));
      setClicked((prevState) => ({
        ...prevState,
        [number]: false,
      }));
    }
  }

  function handleNextQuestion() {
    resetButtons();
    if (numOfQuestion === data.length - 1) {
      return;
    }
    setNumOfQuestion(numOfQuestion + 1);
  }

  function handlePrevQuestion() {
    resetButtons();
    if (numOfQuestion === 0) {
      return;
    }
    setNumOfQuestion(numOfQuestion - 1);
  }

  function resetButtons() {
    setStyling({
      1: defaultStyling,
      2: defaultStyling,
      3: defaultStyling,
    });
    setClicked({
      1: false,
      2: false,
      3: false,
    });
  }

  useEffect(() => {
    fetchQ(season, episode).then((data) => {
      setData(data);
    });
  }, []);

  function chooseRender() {
    if (window.innerWidth > 700) {
      return renderDesktop();
    } else {
      return renderMobile();
    }
  }

  function renderDesktop() {
    return (
      <Container className={classes.container}>
        <p style={{ color: "white" }}>
          {data.length} / {numOfQuestion + 1}
        </p>
        <Grid
          container
          direction="row"
          justify="center"
          spacing={2}
          className={classes.grid}
        >
          <Grid item={true} xs={12}>
            <Paper className={classes.paper}>
              {data[numOfQuestion].question}
            </Paper>
          </Grid>

          <Grid item={true} xs={4}>
            <Button
              className={classes.button}
              style={styling[1]}
              value={1}
              variant="outlined"
              onClick={(e) => handleClick(e.currentTarget.value)}
            >
              {data[numOfQuestion][1].answer}
            </Button>
          </Grid>
          <Grid item={true} xs={4} border={1}>
            <Button
              className={classes.button}
              value={2}
              style={styling[2]}
              variant="outlined"
              onClick={(e) => handleClick(e.currentTarget.value)}
            >
              {data[numOfQuestion][2].answer}
            </Button>
          </Grid>
          <Grid item={true} xs={4}>
            <Button
              className={classes.button}
              style={styling[3]}
              variant="outlined"
              value={3}
              onClick={(e) => handleClick(e.currentTarget.value)}
            >
              {data[numOfQuestion][3].answer}
            </Button>
          </Grid>
          <Button
            onClick={handlePrevQuestion}
            style={{ color: "white" }}
            disabled={numOfQuestion === 0}
          >
            לשאלה הקודמת
          </Button>
          <Button
            onClick={handleNextQuestion}
            style={{ color: "white" }}
            disabled={numOfQuestion === data.length - 1}
          >
            לשאלה הבאה
          </Button>
        </Grid>
      </Container>
    );
  }

  function renderMobile() {
    return (
      <Container>
        <p style={{ color: "white" }}>
          {data.length} / {numOfQuestion + 1}
        </p>
        <Grid
          container
          direction="row"
          justify="center"
          spacing={2}
          className={classes.grid}
        >
          <Grid item={true} xs={12}>
            <Paper className={classes.paper}>
              {data[numOfQuestion].question}
            </Paper>
          </Grid>

          <Grid item={true} xs={12}>
            <Button
              className={classes.button}
              style={styling[1]}
              value={1}
              variant="outlined"
              onClick={(e) => handleClick(e.currentTarget.value)}
            >
              {data[numOfQuestion][1].answer}
            </Button>
          </Grid>
          <Grid item={true} xs={12} border={1}>
            <Button
              className={classes.button}
              value={2}
              style={styling[2]}
              variant="outlined"
              onClick={(e) => handleClick(e.currentTarget.value)}
            >
              {data[numOfQuestion][2].answer}
            </Button>
          </Grid>
          <Grid item={true} xs={12}>
            <Button
              className={classes.button}
              style={styling[3]}
              variant="outlined"
              value={3}
              onClick={(e) => handleClick(e.currentTarget.value)}
            >
              {data[numOfQuestion][3].answer}
            </Button>
          </Grid>
          <Button
            onClick={handlePrevQuestion}
            style={{ color: "white" }}
            disabled={numOfQuestion === 0}
          >
            לשאלה הקודמת
          </Button>
          <Button
            onClick={handleNextQuestion}
            style={{ color: "white" }}
            disabled={numOfQuestion === data.length - 1}
          >
            לשאלה הבאה
          </Button>
        </Grid>
      </Container>
    );
  }

  const classes = useStyles();
  return (
    <div dir="rtl">
      {data ? (
        data.length > 0 ? (
          <div>{chooseRender()}</div>
        ) : (
          <div className={classes.spinner}>
            <Typography variant="h2" align="center" color="primary">
              פרק זה עדיין לא זמין
            </Typography>
            <img className={classes.img} src={noData} alt="noDataYet" />
          </div>
        )
      ) : (
        <div className={classes.spinner}>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}

export default Quiz;
