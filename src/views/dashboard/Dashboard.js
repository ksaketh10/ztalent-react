import React, { Component } from "react";
import Header from "../../_components/Header";
import { withStyles } from "@material-ui/core/styles";
import { EmployeeSkillData } from "../../_components/EmployeeSkillData";
import { Grid } from "@material-ui/core";

const styles = {
    root: {
        flexGrow: 1,
        height: "100%"
    },
    card: {
        height: 290,
        width: 280
    },
    gridContainer: {
        height: "100%",
        margin: 0,
        width: "100%"
    },
    box: {
        borderRadius: 0
    }
};

export class Dashboard extends Component {

    render() {
        return (
            <div spacing={20}>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Header />
                    </Grid>
                    <Grid item xs={12}>
                        <EmployeeSkillData />
                    </Grid>
                </Grid>
            </div>
        )
    }
}
export default withStyles(styles)(Dashboard);