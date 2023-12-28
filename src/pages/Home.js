import React, { useEffect, useState } from 'react'
import { createTask, getAllTasks } from '../api/task';
import { addTask, setTasks } from '../store/tasksSlice';
import { useDispatch } from 'react-redux';

const Home = () => {

    const dispatch = useDispatch();

    const today = new Date();

    const [task, setTask] = useState("");
    const [description, setDescription] = useState("");
    const [duedate, setDueDate] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const isValid = () => {
        if (task.trim() === "") {
            return false;
        }
        if (duedate.trim() === "") {
            return false;
        }
        if (new Date(duedate) < today) {
            return false;
        }
        if (description.trim() === "") {
            return false;
        }
        return true;
    }

    const objectMaker = () => {
        return {
            name: task,
            description: description,
            dateDue: duedate,
        }
    }

    const resetToDefault = () => {
        setTask("");
        setDescription("");
        setDueDate("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        try {
            if (isValid()) {
                const data = objectMaker();
                const res = await createTask((data));
                dispatch(addTask(res));
                alert("Task Created Successfully");
                setIsSubmitted(false)
                resetToDefault();
            }
            else {
                setTimeout(() => {
                    setIsSubmitted(false)
                }, 1000);
            }
        } catch (error) {
            console.error('Error creating task:', error);
        } finally {
        }
    }

    const isDateValid = () => {
        if (duedate.trim() === "") {
            return false;
        }
        if (new Date(duedate) < today) {
            return false;
        }
        return true;
    }

    return (
        <div className='container pb-3'>
            <div style={{ height: '500px' }} className='row align-items-center justify-content-center'>
                <div className='col-md-6'>
                    <h2 className='text-center mb-4 font-color'>Task Creator</h2>
                    <form className='font-color'>
                        <div className="row mb-3">
                            <label htmlFor="task" className="col-sm-3 col-form-label">Task</label>
                            <div className="col-sm-9">
                                <input type="text" value={task} onChange={e => setTask(e.target.value)} className={(isSubmitted && task.trim() === "" ? "is-invalid form-control" : "form-control")} placeholder='Enter Task Name*' required id="task" />
                                <div className="invalid-feedback">
                                    Please choose the task name.
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="duedate" className="col-sm-3 col-form-label">Due Date</label>
                            <div className="col-sm-9">
                                <input type="date" value={duedate} onChange={e => setDueDate(e.target.value)} className={`form-control ${isSubmitted && !isDateValid() ? "is-invalid" : ""}`} placeholder='Enter Due Date*' required id="duedate" />
                                <div className="invalid-feedback">
                                    Due date cannot be empty or less than today.
                                </div>
                            </div>
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="description" className="col-sm-3 col-form-label">Description</label>
                            <div className="col-sm-9">
                                <textarea rows={3} type="text" value={description} onChange={e => setDescription(e.target.value)} className={(isSubmitted && description.trim() === "" ? "is-invalid form-control" : "form-control")} placeholder='Enter Description*' required id="description" ></textarea>
                                <div className="invalid-feedback">
                                    Description cannot be empty.
                                </div>
                            </div>
                        </div>

                        <div className='d-flex justify-content-end'>
                            <div className='d-grid w-25 gap-2'>
                                <button disabled={isSubmitted} onClick={handleSubmit} className='btn btn-block btn-outline-light'>Create</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Home