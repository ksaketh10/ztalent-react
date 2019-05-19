import React from "react";
import { Route, Router } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Loadable from 'react-loadable';
import { history } from './_helpers/history';
import PrivateRoute from "./common/PrivateRoute";

const Loading = () => <div>loading...</div>;

const HomePage = Loadable({
  loader: () => import('./views/homepage/HomePage'),
  loading: Loading,
});

const LoginPage = Loadable({
  loader: () => import('./views/login/Login'),
  loading: Loading,
});

const SignUpPage = Loadable({
  loader: () => import('./views/login/SignUp'),
  loading: Loading,
});

const SkillPage = Loadable({
  loader: () => import('./views/skill/Skill'),
  loading: Loading,
});

const ProjectPage = Loadable({
  loader: () => import('./views/project/Project'),
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
    MuiToolBar: {
      root:{
        backgrond:'transparent',
        boxShadow: 'none'
      }
    },
    MUIDataTableHeadCell: {
      root: {
        paddingRight: 15,
        paddingLeft: 15,
        verticalAlign: 'middle',
        whiteSpace: 'nowrap',
        backgroundColor: 'black'
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

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Router history={history}>
            <div>
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignUpPage} />
              <PrivateRoute path="/home" component={HomePage} />
              <PrivateRoute path="/skill" component={SkillPage} />
              <PrivateRoute path="/project" component={ProjectPage} />
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}