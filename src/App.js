import React, { useRef, useEffect } from "react";
import { useLocation, Switch } from "react-router-dom";
import AppRoute from "./utils/AppRoute";
import ScrollReveal from "./utils/ScrollReveal";
import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";
import { ThemeProvider } from "@material-ui/styles";
import { useThemeMode } from "./theme/themeController";

// Layouts
import LayoutDefault from "./layouts/LayoutDefault";
// Views
import Home from "./views/Home";
import Car from "./views/Car";
import SignUp from "./views/SignUp";
Amplify.configure(aws_exports);

//import ReactGA from 'react-ga';

const App = () => {
  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add("is-loaded");
    childRef.current.init();
    // trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  const [theme, selectTheme] = useThemeMode();
  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <ThemeProvider theme={theme}>
            <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
            <AppRoute path="/car" component={Car} layout={LayoutDefault} />
            <AppRoute
              path="/signup"
              component={SignUp}
              layout={LayoutDefault}
            />
          </ThemeProvider>
        </Switch>
      )}
    />
  );
};

export default App;
