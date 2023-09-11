import React from "react";
import { Card } from 'antd';
import { UpCircleOutlined, MinusCircleOutlined, DownCircleOutlined } from '@ant-design/icons';
import { useDispatch } from "react-redux";
import { setSelectedTask } from "../../../Reducers/Tasks";

function TaskCard({ task, openModal = () => { } }) {
    const dispatch = useDispatch();
    const showDetails = () => {
        dispatch(setSelectedTask(task));
        openModal(true);
    }

    return (
        <>
            <Card className="fos-card" onClick={showDetails}>
                <div className="d-flex justify-content-between">
                    <div className="fos-card-heading font-bold">
                        {task.name}
                    </div>
                    <div className="fos-card-icon d-flex fos-purple">
                        {task.priority == 1 ? <UpCircleOutlined style={{ color: 'red' }} /> : null}
                        {task.priority == 2 ? <MinusCircleOutlined style={{ color: 'blue' }} /> : null}
                        {task.priority == 3 ? <DownCircleOutlined style={{ color: 'green' }} /> : null}
                    </div>
                </div>
                <p className="fos-card-description">{task.description}</p>
                <p className="fos-card-description">{task.deadline}</p>
            </Card>
        </>
    )
}
export default TaskCard;