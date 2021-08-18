import React, { Component, createRef } from 'react';
import { FormControl, Modal, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from 'prop-types';
import styles from './EditTaskModal.module.css';
import { connect } from 'react-redux';
import { editTask } from '../../store/actions';

class EditTaskModal extends Component {
    constructor(props) {
        super(props);
        const { date } = props.data;
        this.state = {
            ...props.data,
            date: date ? new Date(date) : new Date()
        };
        this.titleRef = createRef(null);
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSave = () => {
        const { title, date } = this.state;
        if (!title) {
            return;
        }
        const editedTask = {
            ...this.state,
            date: date.toISOString().slice(0, 10)
        };
        this.props.editTask(editedTask, this.props.from);
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleSave();
        }
    };

    handleDateChange = (date) => {
        this.setState({
            date
        });
    }

    componentDidMount = () => {
        this.titleRef.current.focus()
    }

    render() {
        const { props } = this;
        const { title, description, date } = this.state;

        return (
            <Modal
                show={true}
                onHide={props.onClose}
                centered>
                <Modal.Header>
                    <Modal.Title>Edit task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl
                        placeholder="Title"
                        name="title"
                        value={title}
                        onChange={this.handleChange}
                        onKeyDown={this.handleKeyDown}
                        ref={this.titleRef}
                    />
                    <textarea
                        rows="4"
                        className={styles.description}
                        placeholder="Description"
                        name="description"
                        value={description}
                        onChange={this.handleChange}
                    ></textarea>
                    <DatePicker
                        selected={date}
                        onChange={this.handleDateChange}
                        minDate={new Date()}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleSave}>
                        Save
                    </Button>
                    <Button variant="secondary" onClick={props.onClose}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

EditTaskModal.propTypes = {
    data: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
}

const mapDispatchToProps = {
    editTask
}

export default connect(null, mapDispatchToProps)(EditTaskModal)