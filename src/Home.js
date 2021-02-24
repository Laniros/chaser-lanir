import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { NavLink } from "react-router-dom";
import { fetchByDate } from "./firebase";
import Paper from "@material-ui/core/Paper";
import Tada from "react-reveal/Tada";

function Home() {
  const [season, setSeason] = useState(0);
  const [dates, setDates] = useState("");
  const [numOfEpisodes, setNumOfEpisodes] = useState(0);
  const handleChangeSeason = (event) => {
    setSeason(event.target.value);
  };

  function renderBySeason() {
    var episodes = [];
    for (let i = 1; i <= numOfEpisodes; i++) {
      episodes.push(
        <Grid item xs={2} key={i}>
          <Paper className={classes.paper}>
            <NavLink
              style={{
                textDecoration: "none",
              }}
              to={`/questions/${season}/${i}`}
            >
              פרק {i}
            </NavLink>
          </Paper>
        </Grid>
      );
    }
    return episodes;
  }

  useEffect(() => {
    if (parseInt(season) === 3) {
      setNumOfEpisodes(38);
    }
    if (parseInt(season) === 4) {
      setNumOfEpisodes(41);
    }
    if (parseInt(season) === 5) {
      setNumOfEpisodes(18);
    }
  }, [season, numOfEpisodes]);

  const useStyles = makeStyles((theme) => ({
    paper: {
      padding: theme.spacing(2),
      textAlign: "center",
      height: "30px",
    },
  }));

  useEffect(() => {
    fetchByDate(season).then((data) => setDates(data));
  }, [season]);

  const classes = useStyles();
  return (
    <div dir="rtl">
      <Container fixed>
        <Tada>
          <Typography variant="h2" align="center" color="primary">
            ברוכים הבאים למרדף
          </Typography>
        </Tada>

        <Grid container justify="center">
          <FormControl component="fieldset">
            <h2
              style={{
                color: "white",
                textAlign: "center",
              }}
            >
              בחרו עונה
            </h2>

            <RadioGroup
              row
              aria-label="season"
              name="season"
              value={season}
              onChange={handleChangeSeason}
              required
            >
              <FormControlLabel
                value="3"
                control={<Radio style={{ color: "white" }} />}
                style={{ color: "white" }}
                label="3"
              />

              <FormControlLabel
                value="4"
                control={<Radio style={{ color: "white" }} />}
                style={{ color: "white" }}
                label="4"
              />
              <FormControlLabel
                value="5"
                control={<Radio style={{ color: "white" }} />}
                style={{ color: "white" }}
                label="5"
              />
            </RadioGroup>
          </FormControl>
          <Grid
            container
            direction="row"
            alignContent="center"
            alignItems="center"
            spacing={2}
            style={{
              minheight: "80%",
              marginTop: "10px",
            }}
          >
            {renderBySeason()}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default Home;
