import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import styles from './EditTaskModal.module.css';

export default class EditTaskModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props.data
        };
    }

    handleChange = (event) => {
        this.setState({
            text: event.target.value
        });
    };

    handleSave = () => {
        const { text } = this.state;
        if (!text) {
            return;
        }
        this.props.onSave(this.state)

    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            this.handleSave();
        }
    };

    render() {
        const { props } = this;
        const { text } = this.state
        return (
            <Modal
                onKeyUp={this.handleKeyDown}
                show={true}
                onHide={props.onClose}
                centered>
                <Modal.Header>
                    <Modal.Title>Edith tasks</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        className={styles.taskInput}
                        value={text}
                        onChange={this.handleChange}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleSave} >
                        Save
                    </Button>
                    <Button variant="secondary" onClick={props.onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

EditTaskModal.propTypes = {
    data: PropTypes.object.isRequired,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}