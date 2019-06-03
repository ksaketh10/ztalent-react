import React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';
import { Messages } from "../_constants/Messages";
import { getEmployees, deleteExistingEmployee } from "../_actions/employee.action";
import Chip from "@material-ui/core/Chip";
import DoneAll from "@material-ui/icons/DoneAll"
import CloseRounded from "@material-ui/icons/CloseOutlined";
import EditIcon from '@material-ui/icons/EditRounded';
import DeleteIcon from '@material-ui/icons/DeleteForeverRounded';
import ConfirmationDialog from './ConfirmationDialog';
import { Button } from '@material-ui/core';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        width: '100%',
        marginTop: theme.spacing.unit,
        overflowX: 'auto',
    },
    tablecell: {
        fontSize: 15
    },
    removeLine: {
        fontSize: 15,
        textDecoration: "none"
    },
    heading: {
        fontSize: 20,
        weight: "bold"
    },
    table: {
        minWidth: 700,
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
        color: "primary",
        fontSize: 10
    }
});

class EmployeeSkillDataTable extends React.Component {
    options = {
        textLabels: {
            body: {
                noMatch: Messages.NO_TABULAR_DATA
            }
        },
        pagination: true,
        rowsPerPageOptions: [10, 25, 50, 100],
        search: true,
        print: false,
        download: true,
        viewColumns: true,
        filter: true,
        selectableRows: false,
        filterType: 'multiselect',
        downloadOptions: {
            columns: ["empId","firstName"]
        }
    };

    state = {
        rowsData: [],
        columns: [],
        deleteEmpId: null,
        openConfirmDialog: false
    };

    onDeleteEmployee = (id) => {
        this.setState({
            deleteEmpId: id,
            openConfirmDialog: true
        })
    }

    handleOk = () => {
        this.props.deleteExistingEmployee(this.state.deleteEmpId);
    }

    componentWillMount() {
        const columns = [
            {
                property: "empId",
                name: (<Typography><strong>EMP ID</strong></Typography>),
                options: {
                    sortDirection: "asc",
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return this.renderTableCell(value);
                    },
                }
            },
            {
                property: "firstName",
                name: <Typography><strong>FIRST NAME</strong></Typography>,
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return this.renderTableCell(value);
                    }
                }
            },
            {
                property: "lastName",
                name: <Typography><strong>LAST NAME</strong></Typography>,
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return this.renderTableCell(value);
                    },
                },
            },
            {
                property: "designation",
                name: <Typography><strong>DESIGNATION</strong></Typography>,
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return this.renderTableCell(value);
                    }
                }
            },
            {
                property: "skills",
                name: <Typography><strong>SKILLS</strong></Typography>,
                options: {
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        let componentsToRender = value.map(skill => {
                            return (
                                <Chip
                                    key={skill}
                                    label={skill}
                                    color="primary"
                                    className={this.props.classes.chip}
                                />
                            )
                        })
                        return (
                            <div className={this.props.classes.root}>
                                {componentsToRender}
                            </div>
                        );
                    }
                }
            },
            {
                property: "projects",
                name: <Typography><strong>PROJECTS</strong></Typography>,
                options: {
                    sort: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        let componentsToRender = value.map(project => {
                            return (
                                <Chip
                                    key={project}
                                    label={project}
                                    color="secondary"
                                    className={this.props.classes.chip}
                                />
                            )
                        })
                        return (
                            <div className={this.props.classes.root}>
                                {componentsToRender}
                            </div>
                        );
                    }
                }
            },
            {
                property: "projectAssigned",
                name: <Typography><strong>ASSIGN</strong></Typography>,
                options: {
                    filterType: 'dropdown',
                    customBodyRender: (value, tableMeta, updateValue) => {
                        let componentsToRender = value ? <DoneAll color="primary" /> : <CloseRounded color="secondary" />
                        return (
                            componentsToRender
                        );
                    }
                }
            },
            {
                property: "edit",
                name: <Typography><strong>EDIT</strong></Typography>,
                options: {
                    sort: false,
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <Button id="edit" onClick={() => this.props.handleEditEmployeeClick(value)}>
                                <EditIcon />
                            </Button>
                        )
                    }
                }
            },
            {
                property: "delete",
                name: <Typography><strong>DELETE</strong></Typography>,
                options: {
                    sort: false,
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return (
                            <Button id="delete" onClick={() => this.onDeleteEmployee(value)}>
                                <DeleteIcon color="secondary" onClick={() => this.onDeleteEmployee(value)} />
                            </Button>
                        )
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
        if (nextProps.employees) {
            let employees = nextProps.employees.data;
            let datasets = [];
            employees.forEach(employee => {
                let dataset = [];
                this.state.columns.forEach(column => {
                    if (column.property === "skills" || column.property === "projects") {//for skills and projects push items array into dataset 
                        let items = [];
                        employee[column.property].forEach(item => {
                            items.push(item);
                        })
                        dataset.push(items.sort());
                    } else if (column.property === "edit") {//for edit add the employee information as value
                        let editEmp = {
                            "id": employee["id"],
                            "empId": employee["empId"],
                            "firstName": employee["firstName"],
                            "lastName": employee["lastName"],
                            "designation": employee["designation"],
                            "skills": employee["skills"],
                            "projectAssigned": employee["projectAssigned"],
                            "projects": employee["projects"]
                        };
                        dataset = dataset.concat(editEmp);
                    } else if (column.property === "delete") {//for delete add the employee id as value
                        dataset = dataset.concat(employee["id"]);
                    } else {
                        dataset = dataset.concat(employee[column.property]);
                    }
                });
                datasets.push(dataset);
            });
            this.setState({
                rowsData: datasets,
                deleteEmpId: null,
                openConfirmDialog: false
            });
        }
    }

    renderTableCell = (value) => {
        return (
            <Typography className={this.props.classes.tablecell}>{value}</Typography>
        );
    }

    render() {
        return (
            <div>
                <MUIDataTable
                    title={"Employee Skills"}
                    className={this.props.classes.table}
                    data={this.state.rowsData}
                    columns={this.state.columns}
                    options={this.options}
                />
                <ConfirmationDialog
                    open={this.state.openConfirmDialog}
                    handleOk={this.handleOk}
                    content="Are you sure you want to delete this employee"
                />
            </div>
        );
    }
}

function mapsStateToProps(state) {
    const { employees } = state.employees;
    return {
        employees
    };
}

const connectedEmployeeSkillData = connect(mapsStateToProps, { getEmployees, deleteExistingEmployee })(
    withStyles(styles)(EmployeeSkillDataTable)
);

export default connectedEmployeeSkillData;
