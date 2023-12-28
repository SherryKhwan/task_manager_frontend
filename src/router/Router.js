import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import AllTasks from '../pages/AllTasks'
import TaskDetails from '../pages/TaskDetails'

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/all' element={<AllTasks />} />
            <Route path='/task/:id' element={<TaskDetails />} />
            <Route path='/not-found' element={<NotFound />} />
            <Route path='*' element={<Navigate to="/not-found" replace={true} />} />
        </Routes>

    )
}

export default Router