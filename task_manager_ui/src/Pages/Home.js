import React, { useEffect, useState } from "react";
import { Button, Input, Modal } from 'antd';
import { getTasks } from "../Api";
import { useDispatch, useSelector } from "react-redux";
import { setFilteredTasks, setSelectedTask, setTasks } from "../Reducers/Tasks";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskCard from "../Components/Pages/Tasks/TaskCard";
import SearchTask from "../Components/Pages/Tasks/SearchTask";
import TaskModal from "../Components/Pages/Tasks/TaskModal";

function Home() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.filteredTasks);
  const [modalOpen, setModalOpen] = useState(false);

  const refreshTasks = () => {
    getTasks().then((out) => {
      console.log("REFRESHHH TASK",out);
      if (out.data) {
        dispatch(setTasks(out.data));
        dispatch(setFilteredTasks(out.data));
      }
    })
  }

  useEffect(() => {
    refreshTasks();
  }, []);

  return (
    <>
      <div className='d-flex justify-content-between'>
        <div className="fos-heading">Task Manager</div>
        <div className="fos-heading d-flex">
          <SearchTask />
          <Button onClick={() => { dispatch(setSelectedTask(null)); setModalOpen(true) }}>Add New Task</Button>
        </div>
      </div>
      <div className="row mt-3">
        {tasks && tasks.map((task) => <div className="col-md-3"><TaskCard task={task} openModal={setModalOpen} /></div>)}
      </div>
      <ToastContainer />
      <TaskModal isOpen={modalOpen} cancel={() => setModalOpen(false)} ok={() => { setModalOpen(false); refreshTasks() }} />
    </>
  )
}
export default Home;