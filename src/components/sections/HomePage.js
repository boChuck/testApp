import React from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography } from "@material-ui/core";
import CategoryCard from "./home/CategoryCard";
import AK from "../../assets/images/AK.jpg";
import Car from "../../assets/images/Car.jpg";
import More from "../../assets/images/More.jpg";
// import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 10,
    backgroundImage: 'url("bg.jpg")',
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    // alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      backgroundImage: 'url("bg_portrait.jpg")',
    },
  },

  heading: {
    fontWeight: "bold",
    marginTop: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      fontSize: "3rem",
    },
  },

  subHeading: {
    fontWeight: "100",
    marginBottom: theme.spacing(10),

    [theme.breakpoints.down("sm")]: {
      fontSize: "1.5rem",
      marginBottom: theme.spacing(4),
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "1rem",
    },
  },

  cardContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
}));

const HomePage = () => {
  const classes = useStyles();
  // const navigate = useNavigate();
  const history = useHistory();
  const navigateTo = () => history.push("/car");

  return (
    <div className={classes.root}>
      <Container>
        <Typography
          variant="h1"
          color="primary"
          align="center"
          className={classes.heading}
        >
          EZ4U
        </Typography>
        {/* <Typography
          variant="h4"
          color="primary"
          align="center"
          className={classes.subHeading}
        >
          A.K / Car / More
        </Typography> */}
        <div className={classes.cardContainer}>
          <CategoryCard
            name="A.K"
            imageURL={AK}
            // onClick={() => navigate("/ak")}
          />
          <CategoryCard
            name="Car"
            imageURL={Car}
            onClick={() => navigateTo("/car")}
          />
          <CategoryCard
            name="More"
            // imageURL=""
            imageURL={More}
            // onClick={() => navigate("/more")}
          />
        </div>
      </Container>
    </div>
  );
};

export default HomePage;
