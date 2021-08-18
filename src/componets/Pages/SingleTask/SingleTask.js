import React, { PureComponent } from 'react';
import { Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faCheck, faHistory } from '@fortawesome/free-solid-svg-icons';
import { formatDate } from '../../../helpers/utils';
import EditTaskModal from '../../EditTaskModal/EditTaskModal';
import { connect } from 'react-redux';
import { getSingleTask, removeTask, changeTaskStatus } from '../../../store/actions';
import styles from './singleTaskStyle.module.css';

class SingleTask extends PureComponent {
    state = {
        openEditModal: false
    }

    onRemove = () => {
        const taskId = this.state.task._id;
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
                this.props.history.push('/');
            })
            .catch((error) => {
                console.log(error);
            })
    };

    toggleEdithModal = () => {
        this.setState({
            openEditModal: !this.state.openEditModal
        });
    }

    componentDidMount() {
        const taskId = this.props.match.params.id;
        this.props.getSingleTask(taskId);
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
            this.setState({
                openEditModal: false
            });
        }
        if (!prevProps.removeTaskSuccess && this.props.removeTaskSuccess) {
            this.props.history.push('/');
        }
    }

    render() {
        const { openEditModal } = this.state;
        const { task } = this.props;
        return (
            <Container>
                {!!task ?
                    <div>
                        <h2>{task.title}</h2>
                        <p>Description: {task.description}</p>
                        <p> Status: {task.status}</p>
                        <p>Date: {formatDate(task.date)}</p>
                        <p>Created at: {formatDate(task.created_at)}</p>
                        {
                            task.status === "active" ?
                                <Button
                                    className={styles.actionButton}
                                    variant="success"
                                    onClick={() => this.props.changeTaskStatus(task._id, { status: 'done' }, 'single')}
                                >
                                    <FontAwesomeIcon icon={faCheck} />
                                </Button> :
                                <Button
                                    className={styles.actionButton}
                                    variant="warning"
                                    onClick={() => this.props.changeTaskStatus(task._id, { status: 'active' }, 'single')}
                                >
                                    <FontAwesomeIcon icon={faHistory} />
                                </Button>
                        }
                        <Button
                            className={styles.actionButton}
                            variant="primary"
                            onClick={this.toggleEdithModal}
                        >
                            <FontAwesomeIcon icon={faEdit} />
                        </Button>
                        <Button
                            className={styles.actionButton}
                            variant="danger"
                            onClick={() => this.props.removeTask(task._id, "single")}
                        >
                            <FontAwesomeIcon icon={faTrash} />
                        </Button>
                    </div> :
                    <h3>No task found!!!</h3>
                }
                {
                    openEditModal &&
                    <EditTaskModal
                        data={task}
                        from='single'
                        onSave={this.saveTask}
                        onClose={this.toggleEdithModal}
                    />
                }
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        task: state.task,
        editTaskSuccess: state.editTaskSuccess,
        removeTaskSuccess: state.removeTaskSuccess
    };
}

const mapDispatchToProps = {
    getSingleTask,
    removeTask,
    changeTaskStatus
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleTask)