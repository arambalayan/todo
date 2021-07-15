import React, { PureComponent } from 'react';
import Task from '../Task/Task';
import idGenerator from '../../helpers/idGenerator';
import { Container, Row, Col, Button } from 'react-bootstrap';
import AddTask from '../AddTask/AddTask';
import Confirm from '../Confirm';
import EditTaskModal from '../EditTaskModal/EditTaskModal';
import styles from './todoStyle.module.css';

class ToDo extends PureComponent {
    state = {
        tasks: [],
        selectedTasks: new Set(),
        showConfirm: false,
        editTask: null
    };

    addTasks = (value) => {
        const newTask = {
            text: value,
            _id: idGenerator()
        }
        const tasks = [newTask, ...this.state.tasks];
        this.setState({
            tasks: tasks
        });
    };

    removeTask = (taskId) => {
        const newTasks = this.state.tasks.filter(task => task._id !== taskId)
        this.setState({
            tasks: newTasks,
        });
    };

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
        let tasks = [...this.state.tasks];

        this.state.selectedTasks.forEach((id) => {
            tasks = tasks.filter((task) => task._id !== id)
        })
        this.setState({
            tasks,
            selectedTasks: new Set(),
            showConfirm: false
        });

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

    saveTask = (editedTask) => {
        const tasks = [...this.state.tasks];
        const foundTasksIndex = tasks.findIndex((task) => task._id === editedTask._id);
        tasks[foundTasksIndex] = editedTask;
        this.setState({
            tasks: tasks,
            editTask: null
        });
    }

    render() {

        const { tasks, selectedTasks, showConfirm, editTask } = this.state;

        const tasksArray = tasks.map((task) => {
            return (
                <Col key={task._id} xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Task
                        data={task}
                        onRemove={this.removeTask}
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
                    <Row className="justify-content-center">
                        <Col sm={10} xs={12} md={8} lg={6}>
                            <AddTask
                                onAdd={this.addTasks}
                                disabled={!!selectedTasks.size}
                            />
                        </Col>
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
                        onSave={this.saveTask}
                        onClose={() => this.toggleEdithModal(null)}
                    />
                }
            </div>
        )
    }
}

export default ToDo;