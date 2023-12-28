import axios from 'axios'

const url = process.env.REACT_APP_BASE_URL + 'tasks';


//Create a task
const createTask = async (data) => {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {

    }
}

//Get all tasks
const getAllTasks = async () => {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {

    }
}

//Update a task
const updateTask = async (id, data) => {
    try {
        const response = await axios.put(url + '/' + id, data);
        return response.data;
    } catch (error) {

    }
}

//Delete a task
const deleteTask = async (id) => {
    try {
        const response = await axios.delete(url + '/' + id);
        return response.data;
    } catch (error) {

    }
}

//Get a task
const getTask = async (id) => {
    try {
        const response = await axios.get(url + '/' + id);
        return response.data;
    } catch (error) {

    }
}

export { createTask, getAllTasks, updateTask, deleteTask, getTask }