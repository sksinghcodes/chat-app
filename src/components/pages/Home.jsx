import { useEffect, useState } from 'react';
import axios from '../../api/axios';

const Home = () => {
    const [ allTasks, setAllTasks ] = useState([]);
    const [ allTasksState, setAllTasksState ] = useState({});
    const [ loadingAll, setLoadingAll ] = useState(false);
    const [ loadingOne, setLoadingOne ] = useState(false);
    const [ task, setTask ] = useState('');

    const handleResponse = (res, err, next) => {
        if(res.data.success){
            const newAllTasksState = JSON.parse(JSON.stringify(allTasksState))
            res.data.tasks.forEach(task => {
                if(!newAllTasksState[task._id]){
                    newAllTasksState[task._id] = {};
                }
                newAllTasksState[task._id].isLoading = allTasksState[task._id]?.isLoading || false;
                newAllTasksState[task._id].isEditing = allTasksState[task._id]?.isEditing || false;
            })
            setAllTasks(res.data.tasks);
            setAllTasksState(newAllTasksState);
            if(next) next(true);
        } else {
            console.log(err || res.data.error);
            if(next) next(false);
        }
    }

    useEffect(() => {
        setLoadingAll(true);
        const next = () => setLoadingAll(false);
        axios.get('/task/all').then((req, res) => handleResponse(req, res, next));
    }, [handleResponse])

    const addTask = e => {
        e.preventDefault();
        if(task.trim()){
            setLoadingOne(true);
            const next = () => {
                setLoadingOne(false);
                setTask('');
            }
            axios.post('/task', {task: task.trim()}).then((req, res) => handleResponse(req, res, next))
        }
    }

    const deleteTask = id => {
        const newAllTasksState = JSON.parse(JSON.stringify(allTasksState))
        newAllTasksState[id].isLoading = true;
        setAllTasksState(newAllTasksState);
        const next = (deleted) => {
            const newAllTasksState = JSON.parse(JSON.stringify(allTasksState))
            if(deleted){
                delete newAllTasksState[id];
            } else {
                newAllTasksState[id].isLoading = false;
            }
            setAllTasksState(newAllTasksState);
        }
        axios.delete(`/task/${id}`).then((res, err) => handleResponse(res, err, next));
    }

    const updateTask = task => {
        const newAllTasksState = JSON.parse(JSON.stringify(allTasksState))
        newAllTasksState[task._id].isLoading = true;
        setAllTasksState(newAllTasksState);
        const next = () => {
            const newAllTasksState = JSON.parse(JSON.stringify(allTasksState))
            newAllTasksState[task._id].isLoading = false;
            newAllTasksState[task._id].isEditing = false;
            setAllTasksState(newAllTasksState);
        }
        axios.put(`/task`, {task}).then((res, err) => handleResponse(res, err, next));
    }

    const handleEditing = (e, id) => {
        const newAllTasksState = JSON.parse(JSON.stringify(allTasksState))
        newAllTasksState[id].isEditing = true;
        setAllTasksState(newAllTasksState);
        e.currentTarget.previousSibling.focus();
    }

    const handleChange = e => {
        const { id, value } = e.currentTarget;
        setAllTasks(allTasks.map(task => {
            if(task._id === id) {
                return {...task, text: value}
            } else {
                return task;
            }
        }))
    }

    const handleTaskCompletion = task => {
        updateTask({
            ...task,
            isComplete: !task.isComplete
        })
    }

    const renderClassName = task => {
        let className = "form-control border shadow-none";
        if(allTasksState[task._id].isEditing) {
            className = "form-control";
        }
        if(task.isComplete) {
            className += " opacity-50 text-decoration-line-through" 
        }
        return className
    }

    return (
        <div className="container">
            <div className="py-4">
                <div className="p-3 bg-white rounded shadow">

                    <form className="input-group mb-3" onSubmit={addTask}>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter a task..."
                            value={task}
                            onChange={e => setTask(e.target.value)}
                        />
                        <button
                            className="btn btn-primary"
                            type="submit"
                            disabled={loadingOne}
                        >
                            {loadingOne ? 'Adding Task...' : 'Add Task' }
                            {loadingOne && 
                                <span className="ms-2 spinner-border spinner-border-sm"></span>
                            }
                        </button>
                    </form>

                    {!!allTasks.length &&
                        <div className="list-group">
                            {allTasks.map(task => 
                                <div key={task._id} className="list-group-item px-2">
                                    <div className="input-group">
                                        <label className="input-group-text">
                                            <input
                                                className="form-check-input mt-0"
                                                type="checkbox"
                                                checked={task.isComplete}
                                                onChange={() => handleTaskCompletion(task)}
                                            />
                                        </label>
                                        <input
                                            type="text"
                                            className={renderClassName(task)}
                                            id={task._id}
                                            readOnly={!allTasksState[task._id].isEditing}
                                            value={task.text}
                                            onChange={handleChange}
                                        />
                                        {allTasksState[task._id].isLoading && 
                                            <div
                                                className="position-absolute
                                                            h-100
                                                            w-100
                                                            justify-content-center
                                                            align-items-center
                                                            rounded
                                                            d-flex"
                                                style={{
                                                    left: 0,
                                                    top: 0,
                                                    backgroundColor: '#0003',
                                                    zIndex: 9,
                                                }}
                                            >
                                                <div className="spinner-border text-secondary"></div>
                                            </div>
                                        }
                                        {allTasksState[task._id].isEditing ?
                                            <button
                                                className="btn btn-success"
                                                onClick={() => updateTask(task)}
                                            >Save</button>
                                            :
                                            <button
                                                className="btn btn-warning"
                                                onClick={e => handleEditing(e, task._id)}
                                            >Edit</button>
                                        }
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => deleteTask(task._id)}
                                        >Delete</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    }

                    {loadingAll &&
                        "Loading..."
                    }

                </div>
            </div>
        </div>
    );
}

export default Home;