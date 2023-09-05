import React, { useReducer, useState } from 'react';
import "./App.css";

const actions = {
    ADDNEWTASK: "addNewTask",
    TOGGLE_COMPLETE: "toggleComplete",
    DELETETASK: "deleteTask"
}

function reducer(tasks, action) {
    switch (action.type) {
        case actions.ADDNEWTASK:
            return [...tasks, addNewTask(action.payload.name)];

        case actions.TOGGLE_COMPLETE:
            return tasks.map((task) => {
                if (task.id === action.payload.id) {
                    return { ...task, complete: !task.complete }
                }
                return task;
            })
        case actions.DELETETASK:
            return tasks.filter(task => task.id !== action.payload.id)

        default:
            return tasks;
    }
}

function addNewTask(task) {
    return {
        id: Date.now(),
        name: task,
        complete: false
    }
}

export default function MyApp() {

    const [tasks, dispatch] = useReducer(reducer, []);
    const [taskName, setTaskName] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        dispatch({ type: actions.ADDNEWTASK, payload: { name: taskName } });
        setTaskName("");
    }

    return (
        <div className='app'>
            <h1>Enter your task below</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />
            </form>

            <div className="taskContainer">
                {tasks.map(task =>
                    <Task task={task} key={task.id} dispatch={dispatch} />)
                }
            </div>
        </div>
    )
}

function Task({ task, dispatch }) {
    return (
        <div className='task'>
            <span className={task.complete ? "complete" : "incomplete"}>{task.name}</span>
            <button onClick={() => dispatch({ type: actions.TOGGLE_COMPLETE, payload: { id: task.id } })}>toggle</button>
            <button onClick={() => dispatch({ type: actions.DELETETASK, payload: { id: task.id } })}>delete</button>
        </div>
    );
}
