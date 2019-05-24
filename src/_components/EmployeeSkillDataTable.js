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
        filterType: 'multiselect'
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
                name: <Typography>EMP ID</Typography>,
                options: {
                    sort: true,
                    sortDirection: "asc",
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return this.renderTableCell(value);
                    }
                }
            },
            {
                property: "firstName",
                name: <Typography>FIRST NAME</Typography>,
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return this.renderTableCell(value);
                    }
                }
            },
            {
                property: "lastName",
                name: <Typography>LAST NAME</Typography>,
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return this.renderTableCell(value);
                    },
                },
            },
            {
                property: "designation",
                name: <Typography>DESIGNATION</Typography>,
                options: {
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return this.renderTableCell(value);
                    }
                }
            },
            {
                property: "skills",
                name: <Typography>SKILLS</Typography>,
                options: {
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
                name: <Typography>PROJECTS</Typography>,
                options: {
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
                name: <Typography>ASSIGN</Typography>,
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
                name: <Typography>EDIT</Typography>,
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return <EditIcon onClick={() => this.props.handleEditEmployeeClick(value)} />
                    }
                }
            },
            {
                property: "delete",
                name: <Typography>DELETE</Typography>,
                options: {
                    filter: false,
                    customBodyRender: (value, tableMeta, updateValue) => {
                        return <DeleteIcon color="secondary" onClick={() => this.onDeleteEmployee(value)} />
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
                        dataset.push(items);
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
