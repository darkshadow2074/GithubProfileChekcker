import { useState } from "react";
import axios from "axios";
import "./styles.css";
import { useGithubHook } from "./githubContext";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 240
  }
});

const GithubSerachComponent = ({ setDataSearched }) => {
  const [inputText, setInputText] = useState("");
  const {
    setAvtar,
    setUserName,
    setFollowers,
    setFollowing,
    setrepos,
    setBio,
    setLocation,
    setUrl
  } = useGithubHook();

  const searchHandler = async () => {
    setDataSearched(true);
    try {
      const {
        data: {
          name,
          avatar_url: avtar,
          location,
          bio,
          public_repos: repo,
          followers,
          following,
          html_url: url
        }
      } = await axios.get("https://api.github.com/users/" + inputText);

      setAvtar(avtar);
      setUserName(name);
      setLocation(location);
      setBio(bio);
      setrepos(repo);
      setFollowers(followers);
      setFollowing(following);
      setUrl(url);
      setInputText("");
    } catch (err) {
      console.error("error!!!!" + err);
      setDataSearched(false);
    }
  };
  return (
    <>
      <h1>Github Search Component</h1>
      <div className="">
        <input
          type="search"
          className="searchFeild"
          placeholder="Enter Username"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button
          type="search"
          variant="contained"
          className="searchButton"
          onClick={searchHandler}
        >
          search
        </Button>
      </div>
    </>
  );
};

const ShowProfile = () => {
  const {
    avtar,
    userName,
    followers,
    following,
    repos,
    bio,
    location,
    url
  } = useGithubHook();
  const classes = useStyles();
  console.log(avtar);

  return (
    <div className="cardContainer">
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={avtar} title={userName} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {userName}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {bio}
            </Typography>
            <Typography variant="body2" color="black" component="p">
              {location}
            </Typography>
            <Typography variant="body2" color="black" component="p">
              Total no. of Repos : {repos}
            </Typography>
            <Typography variant="body2" color="black" component="p">
              Followers : {followers} &nbsp; Following:{following}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <a href={url} class="githubLink">
            Github
          </a>
        </CardActions>
      </Card>
    </div>
  );
};
export default function App() {
  const [dataSearched, setDataSearched] = useState(false);
  return (
    <div className="App">
      <GithubSerachComponent setDataSearched={setDataSearched} />
      {dataSearched && <ShowProfile />}
    </div>
  );
}
