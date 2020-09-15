import React, { Component } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { withStyles } from "@material-ui/styles";
import { Container, Typography, TextField, Button } from "@material-ui/core";
import CategoryCard from "./home/CategoryCard";
import AK from "../../assets/images/AK.jpg";
import Car from "../../assets/images/Car.jpg";
import More from "../../assets/images/More.jpg";
import { Auth } from "aws-amplify";

// import { useNavigate } from "react-router-dom";

const styles = (theme) => ({
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
  textField: {
    marginTop: theme.spacing(2),
  },
});

class CarPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      phone_number: "",
      email: "",
      confirmationCode: "",
      verified: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signUp = this.signUp.bind(this);
    this.confirmSignUp = this.confirmSignUp.bind(this);
  }
  signUp() {
    const { username, password, email, phone_number } = this.state;
    Auth.signUp({
      username: username,
      password: password,
      attributes: {
        email: email,
        phone_number: phone_number,
      },
    })
      .then(() => {
        console.log("Successfully signed up");
      })
      .catch((err) => console.log(`Error signing up: ${err}`));
  }

  confirmSignUp() {
    const { username, confirmationCode } = this.state;
    Auth.confirmSignUp(username, confirmationCode)
      .then(() => {
        console.log("Successfully confirmed signed up");
        this.props.handleSignup();
      })
      .catch((err) => console.log(`Error confirming sign up - ${err}`));
  }

  handleSubmit(e) {
    const { verified } = this.state;

    e.preventDefault();

    if (verified) {
      this.confirmSignUp();
      this.setState({
        confirmationCode: "",
        username: "",
      });
    } else {
      this.signUp();
      this.setState({
        password: "",
        email: "",
        phone_number: "",
        verified: true,
      });
    }
    e.target.reset();
  }

  handleChange(e) {
    if (e.target.id === "username") {
      this.setState({
        username: e.target.value,
      });
    } else if (e.target.id === "password") {
      this.setState({
        password: e.target.value,
      });
    } else if (e.target.id === "phone_number") {
      this.setState({
        phone_number: e.target.value,
      });
    } else if (e.target.id === "email") {
      this.setState({
        email: e.target.value,
      });
    } else if (e.target.id === "confirmationCode") {
      this.setState({
        confirmationCode: e.target.value,
      });
    }
  }
  render() {
    const { classes } = this.props;
    const { verified } = this.state;
    if (verified) {
      return (
        <div className={classes.root}>
          <Container>
            <Typography
              variant="h3"
              color="secondary"
              align="center"
              className={classes.heading}
            >
              Become an uber driver
            </Typography>
            <div className={classes.cardContainer}>
              <CategoryCard
                name="Car"
                imageURL={Car}
                // onClick={() => navigateTo("/car")}
              />
            </div>
            <div>
              <form onSubmit={this.handleSubmit}>
                <label>Confirmation Code</label>
                <input
                  id="confirmationCode"
                  type="text"
                  onChange={this.handleChange}
                />
                <button>Confirm Sign up</button>
              </form>
            </div>
          </Container>
        </div>
      );
    } else {
      return (
        <div className={classes.root}>
          <Container>
            <Typography
              variant="h3"
              color="secondary"
              align="center"
              className={classes.heading}
            >
              Become an uber driver
            </Typography>
            <div className={classes.cardContainer}>
              <CategoryCard
                name="Car"
                imageURL={Car}
                // onClick={() => navigateTo("/car")}
              />
            </div>
            {/* <div>
              <form onSubmit={this.handleSubmit}>
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Username"
                  name="username"
                  onChange={this.handleChange}
                  type="text"
                  variant="outlined"
                  id="username"
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Password"
                  name="password"
                  onChange={this.handleChange}
                  type="text"
                  variant="outlined"
                  id="password"
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Email"
                  name="email"
                  onChange={this.handleChange}
                  type="text"
                  variant="outlined"
                  id="email"
                />
                <TextField
                  className={classes.textField}
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  onChange={this.handleChange}
                  type="text"
                  variant="outlined"
                  id="phone_number"
                />
                <Button
                  className={classes.signUpButton}
                  color="primary"
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                >
                  Sign up now
                </Button>
              </form>
            </div> */}
          </Container>
        </div>
      );
    }
  }
}

export default withStyles(styles)(CarPage);
