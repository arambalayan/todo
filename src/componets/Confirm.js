import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Confirm(props) {
    return (
        <Modal show={true} onHide={props.onClose} centered>
            <Modal.Header>
                <Modal.Title>Are you sure to remove {props.count} tasks</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="danger" onClick={props.onSubmit}>
                    Remove
                </Button>
                <Button variant="secondary" onClick={props.onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

Confirm.propTypes = {
    count: PropTypes.number.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
}