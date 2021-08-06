import React, { Component, createRef } from 'react';
import { FormControl, Button, Modal } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './addTaskStyle.module.css';
import PropTypes from 'prop-types';

export default class AddTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            date: new Date()
        }
        this.titleRef = createRef(null);
    }

    

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.addTasks();
        }
    };


    //variant 1
    // handleChange = (event, name) => {
    //     this.setState({
    //         [name]: event.target.value
    //     });
    // };

    //variant 2
    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleDateChange = (date) => {
        this.setState({
            date
        });
    }

    addTasks = () => {
        const { title, description, date } = this.state;
        if (!title) {
            return;
        }
        const tasks = {
            // title: title,
            // description: description
            title,
            description,
            date: date.toISOString().slice(0, 10)
        }
        this.props.onAdd(tasks)
    };

    componentDidMount = () =>{
        this.titleRef.current.focus()
    }

    render() {
        const { onCLose } = this.props

        return (
            <Modal
                show={true}
                onHide={onCLose}
                centered>
                <Modal.Header>
                    <Modal.Title>Add new task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        placeholder="Title"
                        name="title"
                        // onChange={(event) => this.handleChange(event, 'title')}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        ref = {this.titleRef}  
                    />
                    <textarea
                        rows="4"
                        className={styles.description}
                        placeholder="Description"
                        name="description"
                        // onChange={(event) => this.handleChange(event, 'description')}
                        onChange={this.handleChange}
                    ></textarea>
                    <DatePicker
                        selected={this.state.date}
                        minDate={new Date()}
                        onChange={this.handleDateChange} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.addTasks}>
                        Add
                    </Button>
                    <Button variant="secondary" onClick={onCLose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

AddTask.propTypes = {
    onClose: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired
}