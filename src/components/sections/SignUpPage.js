import React, { useState, useEffect } from "react";
import { Link as RouterLink, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import validate from "validate.js";
import { makeStyles } from "@material-ui/styles";
import {
  Grid,
  Button,
  IconButton,
  TextField,
  Link,
  FormHelperText,
  Checkbox,
  Typography,
  Container,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Auth } from "aws-amplify";

const schema = {
  username: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32,
    },
  },
  phoneNumber: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 32,
    },
  },
  email: {
    presence: { allowEmpty: false, message: "is required" },
    email: true,
    length: {
      maximum: 64,
    },
  },
  password: {
    presence: { allowEmpty: false, message: "is required" },
    length: {
      maximum: 128,
    },
  },
  policy: {
    presence: { allowEmpty: false, message: "is required" },
    // checked: true,
  },
};

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    height: "100%",
  },
  grid: {
    height: "100%",
  },
  quoteContainer: {
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  quote: {
    backgroundColor: theme.palette.neutral,
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url(/images/auth.jpg)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  quoteInner: {
    textAlign: "center",
    flexBasis: "600px",
  },
  quoteText: {
    color: theme.palette.white,
    fontWeight: 300,
  },
  name: {
    marginTop: theme.spacing(3),
    color: theme.palette.white,
  },
  bio: {
    color: theme.palette.white,
  },
  contentContainer: {},
  content: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  contentHeader: {
    display: "flex",
    alignItems: "center",
    paddingTop: theme.spacing(5),
    paddingBototm: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  logoImage: {
    marginLeft: theme.spacing(4),
  },
  contentBody: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
      justifyContent: "center",
    },
  },
  form: {
    paddingLeft: 100,
    paddingRight: 100,
    paddingBottom: 125,
    flexBasis: 700,
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  },
  title: {
    marginTop: theme.spacing(3),
    color: "#9CA9B3",
  },
  textField: {
    marginTop: theme.spacing(2),
  },
  policy: {
    marginTop: theme.spacing(1),
    display: "flex",
    alignItems: "center",
  },
  policyCheckbox: {
    marginLeft: "-14px",
  },
  signUpButton: {
    margin: theme.spacing(2, 0),
  },
  input: {
    color: "#FFFFFF",
  },
}));

const SignUp = (props) => {
  const { history } = props;

  const classes = useStyles();

  const [formState, setFormState] = useState({
    isValid: false,
    values: {},
    touched: {},
    errors: {},
  });

  useEffect(() => {
    const errors = validate(formState.values, schema);

    setFormState((formState) => ({
      ...formState,
      isValid: errors ? false : true,
      errors: errors || {},
    }));
  }, [formState.values]);

  const handleChange = (event) => {
    event.persist();
    console.debug("dd");
    console.debug(formState);
    setFormState((formState) => ({
      ...formState,
      values: {
        ...formState.values,
        [event.target.name]:
          event.target.type === "checkbox"
            ? event.target.checked
            : event.target.value,
      },
      touched: {
        ...formState.touched,
        [event.target.name]: true,
      },
    }));
  };

  const handleBack = () => {
    history.goBack();
  };

  const handleSignUp = (event) => {
    console.debug("111");
    const { verified } = formState.values;
    event.preventDefault();
    //history.push("/");

    if (verified) {
      console.debug("verified");
      //   this.confirmSignUp();
      //   this.setState({
      //     confirmationCode: "",
      //     username: "",
      //   });
    } else {
      console.debug("signup");
      console.debug(formState);
      signUp();
      setFormState((formState) => ({
        ...formState,
        values: {
          ...formState.values,
          username: "",
          password: "",
          email: "",
          phoneNumber: "",
          verified: true,
        },
      }));
      console.debug(formState);
    }
  };
  const signUp = () => {
    const { username, password, email, phoneNumber } = formState.values;
    Auth.signUp({
      username: username,
      password: password,
      attributes: {
        email: email,
        phone_number: phoneNumber,
      },
    })
      .then(() => {
        console.log("Successfully signed up");
      })
      .catch((err) => console.log(`Error signing up: ${err}`));
  };

  const hasError = (field) =>
    formState.touched[field] && formState.errors[field] ? true : false;
  const { verified } = formState.values;
  if (verified) {
    return (
      <div>
        <form>
          <label>Confirmation Code</label>
          <input id="confirmationCode" type="text" onChange={handleChange} />
          <button>Confirm Sign up</button>
        </form>
      </div>
    );
  } else {
    return (
      <div>
        <Container>
          <Grid className={classes.grid} container>
            <Grid className={classes.quoteContainer} item lg={5}>
              <div className={classes.quote}>
                <div className={classes.quoteInner}>
                  <Typography className={classes.quoteText} variant="h1">
                    Signup with Will
                  </Typography>
                  <div className={classes.person}>
                    <Typography className={classes.name} variant="body1">
                      Uber
                    </Typography>
                    <Typography className={classes.bio} variant="body2">
                      Manager at Will
                    </Typography>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid className={classes.content} item lg={7} xs={12}>
              <div className={classes.content}>
                <div className={classes.contentBody}>
                  <form className={classes.form} onSubmit={handleSignUp}>
                    <Typography className={classes.title} variant="h2">
                      Create new account
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      Use your email to create new account
                    </Typography>
                    <TextField
                      className={classes.textField}
                      error={hasError("username")}
                      fullWidth
                      helperText={
                        hasError("username")
                          ? formState.errors.username[0]
                          : null
                      }
                      label="Username"
                      name="username"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.username || ""}
                      variant="outlined"
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                    <TextField
                      className={classes.textField}
                      error={hasError("phoneNumber")}
                      fullWidth
                      helperText={
                        hasError("phoneNumber")
                          ? formState.errors.phoneNumber[0]
                          : null
                      }
                      label="Phone Number"
                      name="phoneNumber"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.phoneNumber || ""}
                      variant="outlined"
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                    <TextField
                      className={classes.textField}
                      error={hasError("email")}
                      fullWidth
                      helperText={
                        hasError("email") ? formState.errors.email[0] : null
                      }
                      label="Email address"
                      name="email"
                      onChange={handleChange}
                      type="text"
                      value={formState.values.email || ""}
                      variant="outlined"
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                    <TextField
                      className={classes.textField}
                      error={hasError("password")}
                      fullWidth
                      helperText={
                        hasError("password")
                          ? formState.errors.password[0]
                          : null
                      }
                      label="Password"
                      name="password"
                      onChange={handleChange}
                      type="password"
                      value={formState.values.password || ""}
                      variant="outlined"
                      InputProps={{
                        className: classes.input,
                      }}
                    />
                    <div className={classes.policy}>
                      <Checkbox
                        checked={formState.values.policy || false}
                        className={classes.policyCheckbox}
                        color="primary"
                        name="policy"
                        onChange={handleChange}
                      />
                      <Typography
                        className={classes.policyText}
                        color="textSecondary"
                        variant="body1"
                      >
                        I have read the{" "}
                        <Link
                          color="primary"
                          component={RouterLink}
                          to="#"
                          underline="always"
                          variant="h6"
                        >
                          Terms and Conditions
                        </Link>
                      </Typography>
                    </div>
                    {hasError("policy") && (
                      <FormHelperText error>
                        {formState.errors.policy[0]}
                      </FormHelperText>
                    )}
                    <Button
                      className={classes.signUpButton}
                      color="primary"
                      disabled={!formState.isValid}
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                    >
                      Sign up now
                    </Button>
                    <Typography color="textSecondary" variant="body1">
                      Have an account?{" "}
                      <Link component={RouterLink} to="/sign-in" variant="h6">
                        Sign in
                      </Link>
                    </Typography>
                  </form>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  }
};

SignUp.propTypes = {
  history: PropTypes.object,
};

export default withRouter(SignUp);
