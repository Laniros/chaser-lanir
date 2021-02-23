import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import { Box } from "@material-ui/core";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { NavLink } from "react-router-dom";
import { fetchByDate } from "./firebase";
import YouTube from "react-youtube";
function Home() {
  const [season, setSeason] = useState(0);
  const [dates, setDates] = useState("");
  const [numOfEpisodes, setNumOfEpisodes] = useState(0);
  let audio = new Audio("./Theme.mp3");
  const handleChangeSeason = (event) => {
    setSeason(event.target.value);
  };

  function renderBySeason() {
    var episodes = [];
    for (let i = 1; i <= numOfEpisodes; i++) {
      episodes.push(
        <Grid
          className={classes.root}
          item
          xs={3}
          xm={3}
          key={i}
          style={{
            border: "solid 1px",
          }}
        >
          <NavLink
            style={{ textDecoration: "none" }}
            to={`/questions/${season}/${i}`}
          >
            פרק {i}
          </NavLink>
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
    box: {},
    formControl: {
      margin: theme.spacing(2),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(5),
    },
    root: {
      width: "100%",
      maxWidth: 360,
      height: "50px",
      backgroundColor: theme.palette.background.paper,
    },
  }));

  useEffect(() => {
    fetchByDate(season).then((data) => setDates(data));
  }, [season]);

  const opts = {
    height: "110",
    width: "110",
    playerVars: {
      autoplay: 1,
    },
  };

  function videoOnReady(event) {
    event.target.seekTo(0);
  }

  const classes = useStyles();
  return (
    <div dir="rtl">
      {/*      <YouTube
        videoId="Wc-2Lf8vXEY"
        opts={opts}
        onReady={(event) => videoOnReady(event)}
      />*/}
      ;
      <Container fixed>
        <Box className={classes.box}>
          <Typography variant="h2" gutterBottom align="center" color="primary">
            ברוכים הבאים לצ'ייסר
          </Typography>

          <Grid container>
            <FormControl component="fieldset">
              <FormLabel style={{ marginRight: "70px" }} component="legend">
                בחרו עונה
              </FormLabel>

              <RadioGroup
                row
                aria-label="season"
                name="season"
                value={season}
                onChange={handleChangeSeason}
                required
              >
                <FormControlLabel value="3" control={<Radio />} label="3" />

                <FormControlLabel value="4" control={<Radio />} label="4" />
                <FormControlLabel value="5" control={<Radio />} label="5" />
              </RadioGroup>
            </FormControl>
            <Grid
              container
              direction="row"
              alignContent="center"
              alignItems="center"
              spacing={1}
              style={{
                minheight: "80%",
              }}
            >
              {renderBySeason()}
            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}

export default Home;
