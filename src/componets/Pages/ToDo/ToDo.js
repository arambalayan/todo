import React, { PureComponent } from 'react';
import Task from '../../Task/Task';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddTask from '../../AddTask/AddTask';
import Confirm from '../../Confirm';
import EditTaskModal from '../../EditTaskModal/EditTaskModal';
import Search from '../../Search/Search';
import styles from './todoStyle.module.css';
import { connect } from 'react-redux';
import { getTasks, removeSelected } from '../../../store/actions';

class ToDo extends PureComponent {
    state = {
        selectedTasks: new Set(),
        showConfirm: false,
        editTask: null,
        openNewTaskModal: false
    };

    componentDidMount() {
        this.props.getTasks();
    }

    componentDidUpdate(prevProps) {
        if (!prevProps.addTaskSuccess && this.props.addTaskSuccess) {
            this.toggleNewTaskModal();
        }
        if (!prevProps.removeTasksSuccess && this.props.removeTasksSuccess) {
            this.setState({
                selectedTasks: new Set(),
                showConfirm: false
            });
        }
        if (!prevProps.editTaskSuccess && this.props.editTaskSuccess) {
            this.setState({
                editTask: null
            });
        }
    }

    handleCheck = (taskId) => {
        const selectedTasks = new Set(this.state.selectedTasks);
        if (selectedTasks.has(taskId)) {
            selectedTasks.delete(taskId)
        }
        else {
            selectedTasks.add(taskId)
        }
        this.setState({
            selectedTasks
        });
    }

    removeSelected = () => {
        const taskIds = [...this.state.selectedTasks];
        this.props.removeSelected(taskIds)
    }

    toggleConfirm = () => {
        this.setState({
            showConfirm: !this.state.showConfirm
        });
    }

    toggleEdithModal = (task) => {
        this.setState({
            editTask: task
        });
    }

    toggleNewTaskModal = () => {
        this.setState({
            openNewTaskModal: !this.state.openNewTaskModal
        })
    }

    render() {

        const { selectedTasks, showConfirm, editTask, openNewTaskModal } = this.state;
        const { tasks } = this.props;

        const tasksArray = tasks.map((task) => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Task
                        data={task}
                        onCheck={this.handleCheck}
                        disabled={!!selectedTasks.size}
                        onEdit={this.toggleEdithModal}
                    />
                </Col>
            )
        });

        return (
            <div className={styles.toDo}>
                <Container>
                    <Row>
                        <Search />
                    </Row>
                    <Row className="justify-content-center text-center">
                        {/* <Col sm={10} xs={12} md={8} lg={6}> */}
                        <Button
                            variant="outline-primary"
                            onClick={this.toggleNewTaskModal}
                            disabled={!!selectedTasks.size}
                        >Add New task
                        </Button>
                        {/* </Col> */}
                    </Row>
                    <Row>
                        {tasksArray}
                    </Row>
                    <Row className="justify-content-center">
                        {/* <Col xs={4}> */}
                        <Button
                            variant="outline-danger"
                            onClick={this.toggleConfirm}
                            disabled={!selectedTasks.size}
                        >
                            Remove Seelected
                        </Button>
                        {/* </Col> */}
                    </Row>
                </Container>
                {
                    showConfirm &&
                    <Confirm
                        onSubmit={this.removeSelected}
                        onClose={this.toggleConfirm}
                        count={selectedTasks.size}
                    />
                }
                {
                    !!editTask &&
                    <EditTaskModal
                        data={editTask}
                        from='tasks'
                        onClose={() => this.toggleEdithModal(null)}
                    />
                }
                {openNewTaskModal &&
                    <AddTask
                        onCLose={this.toggleNewTaskModal}
                    />
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        addTaskSuccess: state.addTaskSuccess,
        removeTasksSuccess: state.removeTasksSuccess,
        editTaskSuccess: state.editTaskSuccess
    };
}

const mapDispatchToProps = {
    getTasks: getTasks,
    removeSelected
}

export default connect(mapStateToProps, mapDispatchToProps)(ToDo);