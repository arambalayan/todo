import React, { useState, memo, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../../helpers/utils';
import EditTaskModal from '../../EditTaskModal/EditTaskModal';
import Spinner from '../../Spinner/Spinner';

function SingleTask(props){

    const [task, setTask] = useState(null);
    const [openEditModal, setopenEditModal] = useState(false);

    const onRemove = () => {
        const taskId = task._id;
        fetch("http://localhost:3001/task/" + taskId, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then(response => {
                if (response.error) {
                    throw response.error;
                }
                props.history.push('/');
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const toggleEdithModal = () => {
        setopenEditModal(!openEditModal);
    }

    const saveTask = (editedTask) =>{ 
        fetch("http://localhost:3001/task/" + editedTask._id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(editedTask)
        })
            .then((res) => res.json())
            .then(response => {
                if (response.error) {
                    throw response.error;
                }
                setTask(response)
                setopenEditModal(false)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    useEffect(() => {
        const taskId = props.match.params.id;
        fetch(`http://localhost:3001/task/${taskId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((res) => res.json())
            .then(response => {
                if (response.error) {
                    throw response.error;
                }
                setTask(response)
            })
            .catch((error) => {
                console.log(error);
            })
    },[]);

    return (
        <Container>
            {!!task ?
                <div>
                    <h2>{task.title}</h2>
                    <p>Description: {task.description}</p>
                    <p>Date: {formatDate(task.date)}</p>
                    <p>Created at: {formatDate(task.created_at)}</p>
                    <Button
                        variant="warning"
                        onClick={toggleEdithModal}
                    >
                        <FontAwesomeIcon icon={faEdit} />
                    </Button>
                    <Button
                        variant="danger"
                        onClick={onRemove}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </Button>
                </div> :
                <Spinner />
            }
            {
                 openEditModal &&
                <EditTaskModal
                    data={task}
                    onSave={saveTask}
                    onClose={toggleEdithModal}
                />
            }
        </Container>
    );

}

export default memo(SingleTask);