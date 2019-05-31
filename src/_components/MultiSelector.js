
import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NoSsr from '@material-ui/core/NoSsr';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import CancelIcon from '@material-ui/icons/Cancel';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    input: {
        display: 'flex',
        padding: 0,
    },
    valueContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        flex: 1,
        alignItems: 'center',
        overflow: 'hidden',
    },
    chip: {
        margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
    },
    chipFocused: {
        backgroundColor: emphasize(
            theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
            0.08,
        ),
    },
    noOptionsMessage: {
        padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    },
    placeholder: {
        position: 'absolute',
        left: 2,
        fontSize: 16,
    },
    paper: {
        position: 'absolute',
        zIndex: 1,
        marginTop: theme.spacing.unit,
        left: 0,
        right: 0,
    },
    divider: {
        height: theme.spacing.unit * 2,
    },
});

function inputComponent({ inputRef, ...props }) {
    return <div ref={inputRef} {...props} />;
}

function Option(props) {
    return (
        <MenuItem
            buttonRef={props.innerRef}
            selected={props.isFocused}
            component="div"
            style={{
                fontWeight: props.isSelected ? 500 : 400,
            }}
            {...props.innerProps}
        >
            {props.children}
        </MenuItem>
    );
}

function Placeholder(props) {
    return (
        <Typography
            color="textSecondary"
            className={props.selectProps.classes.placeholder}
            {...props.innerProps}
        >
            {props.children}
        </Typography>
    );
}

function ValueContainer(props) {
    return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function Control(props) {
    return (
        <TextField
            fullWidth
            InputProps={{
                inputComponent,
                inputProps: {
                    className: props.selectProps.classes.input,
                    inputRef: props.innerRef,
                    children: props.children,
                    ...props.innerProps
                },
            }}
            {...props.selectProps.textFieldProps}
        />
    );
}

function MultiValue(props) {
    return (
        <Chip
            tabIndex={-1}
            label={props.children}
            className={classNames(props.selectProps.classes.chip, {
                [props.selectProps.classes.chipFocused]: props.isFocused,
            })}
            onDelete={props.removeProps.onClick}
            deleteIcon={<CancelIcon {...props.removeProps} />}
        />
    );
}

function Menu(props) {
    return (
        <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
            {props.children}
        </Paper>
    );
}

class MultiSelector extends React.Component {
    newItem = "";
    state = {
        multi: this.props.selectedItems ? this.props.selectedItems.map(item => ({
            value: item,
            label: item
        })) : [],
        items: this.props.items,
        searchText: ""
    };

    handleNewItemClick = (value) => {
        if (value.length !== 0) {
            this.newItem = value;
            this.props.onAddNewItem(value);
        }
    }

    onInputChange = (newValue, actionMeta) => {
        this.setState({
            searchText: newValue
        })
    }

    NoOptionsMessage = (props) => {
        return (
            <Button id="no_options" fullWidth variant="contained" color="default" size="small" onClick={() => this.handleNewItemClick(props.selectProps.inputValue)}>
                {props.selectProps.inputValue.length !== 0 && <AddIcon /> }
                <Typography
                    color="textPrimary"
                    className={props.selectProps.classes.noOptionsMessage}
                    {...props.innerProps}
                >
                    {props.selectProps.inputValue.length !== 0 ? this.props.noOptionsMessage: props.children}
                </Typography>
            </Button>
        );
    }

    components = {
        Control,
        Menu,
        MultiValue,
        NoOptionsMessage: this.NoOptionsMessage,
        Option,
        Placeholder,
        ValueContainer
    };

    handleChange = value => {
        let items = [];
        this.setState({
            multi: value,
        });
        value.forEach(item => {
            items.push(item.value);
        });
        this.props.handleSelectedItems(items)
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.items !== this.props.items) {
            this.setState({
                items: nextProps.items,
                searchText: ""
            });
            let newSeletectedItems = this.state.multi;
            newSeletectedItems.push({
                value: this.newItem,
                label: this.newItem
            });
            this.handleChange(newSeletectedItems)
        }
    }

    render() {
        const { classes, theme } = this.props;
        const suggestions = this.state.items.map(item => ({
            value: item,
            label: item
        }));
        const selectStyles = {
            input: base => ({
                ...base,
                color: theme.palette.text.primary,
                '& input': {
                    font: 'inherit',
                },
            }),
        };

        return (
            <div className={classes.root}>
                <NoSsr>
                    <Select
                        classes={classes}
                        styles={selectStyles}
                        textFieldProps={{
                            label: this.props.name,
                            InputLabelProps: {
                                shrink: true,
                            },
                        }}
                        options={suggestions}
                        components={this.components}
                        value={this.state.multi}
                        onChange={this.handleChange}
                        placeholder={this.props.placeholder}
                        inputValue={this.state.searchText}
                        onInputChange={this.onInputChange}
                        isMulti
                    />
                </NoSsr>
            </div>
        );
    }
}

MultiSelector.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(MultiSelector);
