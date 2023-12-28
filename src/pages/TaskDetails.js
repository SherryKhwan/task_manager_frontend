import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getTask, updateTask } from '../api/task';

const TaskDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [isEditable, setIsEditable] = useState(false);
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [duedate, setDueDate] = useState('')
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [taskStatus, setTaskStatus] = useState('');

    const getTaskById = async () => {
        const task = await getTask(id);
        setName(task.name);
        setDescription(task.description);
        setDueDate(new Date(task.dateDue).toISOString().split('T')[0]);
        setTaskStatus(task.taskStatus);
    }

    const isValid = () => {
        return true;
    }

    const objectMaker = () => {
        return {
            id: id,
            name: name,
            taskStatus: parseInt(taskStatus),
            description: description,
            dateDue: duedate,
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitted(true);
        try {
            if (isValid()) {
                const data = objectMaker();
                await updateTask(id, data)
            }
        } catch (error) {

        } finally {
            setTimeout(() => {
                alert("Task Updated Successfully")
                setIsSubmitted(false)
                setIsEditable(false)
                navigate('/all')
            }, 1000);
        }
    }

    useEffect(() => {
        getTaskById();
    }, [id])

    return (
        <>
            {name !== "" && <div className='container font-color'>
                <div className='row'>
                    <div className='col-md-9 mt-4'>
                        <div className='align-items-center d-flex justify-content-between'>
                            <h4>Task # {id}</h4>
                            <button onClick={() => setIsEditable(!isEditable)} className='btn btn-sm btn-outline-light'>Edit</button>
                        </div>
                        <form className='font-color'>
                            <div className="row mb-3">
                                <div className="col-sm-12">
                                    <label htmlFor="task" className="col-sm-3 col-form-label">Name</label>
                                    <input disabled={!isEditable} type="text" value={name} onChange={e => setName(e.target.value)} className='form-control' required id="task" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <div className="col-sm-12">
                                    <label htmlFor="status" className="col-sm-3 col-form-label">Status</label>
                                    <select disabled={!isEditable} value={taskStatus} onChange={e => setTaskStatus(e.target.value)} className='form-select' required id="status">
                                        <option value="0">Incomplete</option>
                                        <option value="1">Successful</option>
                                        <option value="2">Failed</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="duedate" className="col-sm-3 col-form-label">Due Date</label>
                                <div className="col-sm-12">
                                    <input disabled={!isEditable} type="date" value={duedate} onChange={e => setDueDate(e.target.value)} className="form-control" required id="duedate" />
                                </div>
                            </div>
                            <div className="row mb-3">
                                <label htmlFor="description" className="col-sm-3 col-form-label">Description</label>
                                <div className="col-sm-12">
                                    <textarea disabled={!isEditable} rows={3} type="text" value={description} onChange={e => setDescription(e.target.value)} className="form-control" placeholder='Enter Description*' required id="description" ></textarea>
                                </div>
                            </div>

                            {isEditable && <div className='d-flex justify-content-end'>
                                <div className='d-grid w-25 gap-2'>
                                    <button disabled={isSubmitted} onClick={handleSubmit} className='btn btn-block btn-outline-light'>Update</button>
                                </div>
                            </div>}
                        </form>
                    </div>
                </div>
            </div>}
        </>
    )
}

export default TaskDetails