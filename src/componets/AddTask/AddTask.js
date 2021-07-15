import React, { Component } from 'react';
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import styles from './addTaskStyle.module.css';
import PropTypes from 'prop-types';

export default class AddTask extends Component {

    state = {
        inputValue: ''
    }

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.addTasks();
        }
    };

    handleInputChange = (event) => {
        this.setState({
            inputValue: event.target.value
        })
    };

    addTasks = () => {
        const { inputValue } = this.state;
        if (!inputValue) {
            return;
        }

        this.props.onAdd(inputValue)
        
        this.setState({
            inputValue: ''
        })
    };

    render() {
        const { inputValue } = this.state;
        const {disabled} = this.props
        return (
            <InputGroup className={styles.input}>
                <FormControl
                    placeholder="Input new task"
                    aria-label="Input new task"
                    aria-describedby="basic-addon2"
                    onChange={this.handleInputChange}
                    onKeyDown={this.handleKeyDown}
                    value={inputValue}
                    disabled={disabled}

                />
                <InputGroup.Append>
                    <Button
                        variant="outline-primary"
                        onClick={this.addTasks}
                        disabled={disabled}
                    >Add
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        )
    }
}

AddTask.propTypes = {
    disabled: PropTypes.bool,
    onAdd: PropTypes.func.isRequired
}