import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { deleteTask, getAllTasks } from '../api/task';
import { useDispatch, useSelector } from 'react-redux';
import { removeTask, setTasks } from '../store/tasksSlice';

const AllTasks = () => {

  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks);

  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllTasks();
        dispatch(setTasks(res));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchData();
  }, [dispatch]);

  const handleDelete = async (id) => {
    const isSure = window.confirm("Are you sure you want to delete this task?")
    if (isSure) {
      setIsPressed(true);
      try {
        await deleteTask(id);
        dispatch(removeTask(id));
      } catch (error) {
        console.error('Error deleting task:', error);
      }
      setTimeout(() => {
        setIsPressed(false);
      }, 1000);
    }
  }

  const RenderStatus = ({ enumVal }) => {
    if (enumVal === 0) {
      return <span className='text-secondary'>Incomplete</span>
    }
    else if (enumVal === 1) {
      return <span className='text-success'>Successful</span>
    }
    else if (enumVal === 2) {
      return <span className='text-danger'>Failed</span>
    }
  }

  return (
    <>
      {tasks.length > 0 && <div className='d-flex flex-column align-items-center mx-2 mt-5'>
        <table className='table table-hover table-striped'>
          <thead style={{ borderBottom: '1px solid #6c757d' }} className='font-color' >
            <th className='text-center'>Id</th>
            <th className='text-center'>Name</th>
            <th className='text-center'>Status</th>
            <th className='text-center'>Due Date</th>
            <th className='text-center'></th>
          </thead>
          <tbody className='' style={{ fontSize: '14px' }} >
            {tasks.map((task, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #6c757d' }} >
                <td className='text-center'>{task.id}</td>
                <td className='text-center'>{task.name}</td>
                <td className='text-center'>
                  <RenderStatus enumVal={task.taskStatus} />
                </td>
                <td className='text-center'>
                  {new Date(task.dateDue).toLocaleDateString()}
                </td>
                <td className='text-center'>
                  <Link to={`/task/${task.id}`} className='btn btn-sm btn-outline-primary mx-1'>View</Link>
                  <button onClick={() => handleDelete(task.id)} className='btn btn-sm btn-outline-danger mx-1'>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
    </>
  )
}

export default AllTasks