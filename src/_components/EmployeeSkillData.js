import React from 'react';
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { history } from "../_helpers/history";
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import { Messages } from "../_constants/Messages";
import { getEmployees } from "../_actions/employee.action"

const options = {
    textLabels: {
        body: {
            noMatch: Messages.NO_TABULAR_DATA
        }
    },
    pagination: true,
    selectableRows: false,
    rowsPerPageOptions: [10, 25, 50, 100],
    search: true,
    print: false,
    download: true,
    viewColumns: false,
    filter: false,
};

const styles = {

    tablecell: {
        fontSize: 15
    },
    removeLine: {
        fontSize: 15,
        textDecoration: "none"
    },
    heading: {
        fontSize: 30
    }
};

class EmployeeSkillData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rowsData: [],
            columns: []
        };
        this.renderTableCell = this.renderTableCell.bind(this);
    }

    componentWillMount() {
        const { classes } = this.props;
        const columns = [
            {
                property: "id",
                name: "ID",
                options: {
                    sort: true,
                    sortDirection: "asc",
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return this.renderTableCell(value);
                    }
                }
            },
            {
                property: "firstName",
                name: "FIRST NAME",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return this.renderTableCell(value);
                    }
                }
            },
            {
                property: "lastName",
                name: "LAST NAME",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return this.renderTableCell(value);
                    }
                }
            },
            {
                property: "designation",
                name: "DESIGNATION",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return this.renderTableCell(value);
                    }
                }
            },
            {
                property: "skills",
                name: "SKILLS",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return this.renderTableCell(value);
                    }
                }
            },
            {
                property: "projectAssigned",
                name: "PROJECT_ASSIGNED",
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return this.renderTableCell(value);
                    }
                }
            }
        ];
        this.setState({ columns: columns });
    }

    componentDidMount() {
        this.props.getEmployees();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        let { employees } = nextProps.employees.data;
        let datasets = [];
        employees.forEach(item => {
            let dataset = [];
            this.state.columns.forEach(column => {
                dataset = dataset.concat(item[column.property]);
            });
            datasets.push(dataset);
        });
        this.setState({ rowsData: datasets });
    }

    renderTableCell(value) {
        return (
            <Typography className={this.props.classes.tablecell}>{value}</Typography>
        );
    }

    render() {
        return (
            <div>
                <br />
                <MUIDataTable id={"MUIDataTableListDatasets"}
                    data={this.state.rowsData}
                    columns={this.state.columns}
                    options={options}
                />
            </div>
        );
    }
}

function mapsStateToProps(state) {
    const { employees } = state;
    return {
        employees
    };
}

const connectedListData = connect(mapsStateToProps, { getEmployees })(
    withStyles(styles)(EmployeeSkillData)
);

export { connectedListData as EmployeeSkillData };
