import React from "react";
import { Route, Router } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Loadable from 'react-loadable';
import { history } from './_helpers/history';
import PrivateRoute from "./common/PrivateRoute";

const Loading = () => <div>loading...</div>;

const HomePage = Loadable({
  loader: () => import('./views/homepage'),
  loading: Loading,
});

const SignInPage = Loadable({
  loader: () => import('./views/login/SignIn'),
  loading: Loading,
});

const SignUpPage = Loadable({
  loader: () => import('./views/login/SignUp'),
  loading: Loading,
});

const SkillPage = Loadable({
  loader: () => import('./views/skill'),
  loading: Loading,
});

const ProjectPage = Loadable({
  loader: () => import('./views/project'),
  loading: Loading,
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1989fa"
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: ["poppins-regular"].join(",")
  },
  indicator: {
    backgroundColor: 'white',
  },
  props: {
    MuiButtonBase: {
      disableRipple: true,
    },
  },
  overrides: {
    MuiFormLabel: {
      root: {
        textTransform: 'uppercase'
      }
    },
    MUIDataTableHeadCell: {
      root: {
        paddingRight: 15,
        paddingLeft: 15,
        verticalAlign: 'middle',
        whiteSpace: 'nowrap',
        backgroundColor: '#000000'
      },
    },
    MUIDataTableBodyCell: {
      root: {
        paddingRight: 15,
        paddingLeft: 15
      }
    },
    MuiTablePagination: {
      caption: {
        flexShrink: 0,
        textTransform: 'uppercase'
      }
    }
  }
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <div>
      <Router history={history}>
        <div>
          <Route path="/login" component={SignInPage} />
          <Route path="/signup" component={SignUpPage} />
          <PrivateRoute path="/home" component={HomePage} />
          <PrivateRoute path="/skill" component={SkillPage} />
          <PrivateRoute path="/project" component={ProjectPage} />
        </div>
      </Router>
    </div>
  </MuiThemeProvider>
);
export default App;