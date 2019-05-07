import React from "react";
import { Route, Router } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Loadable from 'react-loadable';
import {history} from './_helpers/history'

const Loading = () => <div>loading...</div>;

const HomePage = Loadable({
  loader: () => import('./views/homepage/HomePage'),
  loading: Loading,
});

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1989fa"
    },
  },
  typography: {
    fontFamily: ["Poppins Regular"].join(",")
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
        textTransform: 'uppercase',
        color: '#677e8c',
      }
    },
    MUIDataTableHeadCell: {
      root: {
        paddingRight: 15,
        paddingLeft: 15,
        verticalAlign: 'middle',
        whiteSpace: 'nowrap'
      },
    },
    MUIDataTableBodyCell: {
      root: {
        paddingRight: 15,
        paddingLeft: 15
      }
    },
    MUIDataTable: {
      paper: {
        boxShadow: 'none',
        borderRadius: '0'
      }
    },
    MUIDataTableToolbar: {
      root: {
        display: 'none'
      }
    },
    MuiListItemText: {
      primary: {
        '&$textDense': {
          fontSize: 'inherit'
        },
        lineHeight: 'normal',
        color: "inherit"
      },
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
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div style={{ height: '100%' }}>

          <Router history={history}>
            <div>
              <Route path="/home" component={HomePage} />
            </div>
          </Router>
        </div>
      </MuiThemeProvider>

    );
  }
}