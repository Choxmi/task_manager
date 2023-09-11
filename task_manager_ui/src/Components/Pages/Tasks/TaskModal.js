import { Button, DatePicker, Form, Input, Modal, Segmented } from "antd";
import { useSelector } from "react-redux";
import { UpCircleOutlined, DownCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { createTask, deleteTask, updateTask } from "../../../Api";

const TaskModal = ({ isOpen = false, ok = () => { }, cancel = () => { } }) => {
    const task = useSelector((state) => state.tasks.selectedTask);
    const [isLoading, setIsLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success:', values);
        values.user_id = 1;
        if (task) {
            updateTask(task.id, values).then((val) => {
                alert("Ticket updated");
                ok();
            })
        } else {
            createTask(values).then((val) => {
                alert("Ticket added");
                ok();
            })
        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const deleteItem = () => {
        deleteTask(task.id).then((val) => {
            alert("Ticket deleted");
            ok();
        })
    }

    useEffect(() => {
        if (task) {
            Object.keys(task).forEach(function (key) {
                if (key == "deadline" && task[key]) {
                    // form.setFieldValue(key, task[key]);
                } else {
                    form.setFieldValue(key, task[key]);
                }
            });
        } else {
            form.resetFields();
        }
    }, [isOpen]);

    return <Modal open={isOpen} onOk={isLoading ? () => { } : ok} onCancel={isLoading ? () => { } : cancel} title={task ? "Update/ Delete Task" : "Add New Task"} footer={null}>
        <Form
            form={form}
            name="basic"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout='vertical'
        >
            <Form.Item
                label='Task Name'
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input taskname',
                    },
                ]}
            >
                <Input placeholder="Task Name" />
            </Form.Item>

            <Form.Item
                label='Description'
                name="description"
                rules={[
                    {
                        required: true,
                        message: 'Please input your description',
                    },
                ]}
            >
                <Input.TextArea placeholder="Description" />
            </Form.Item>
            <div className="row mt-12">
                <div className="col-md-6"><Form.Item
                    label='Deadline'
                    name="deadline"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your deadline',
                        },
                    ]}
                >
                    <DatePicker placeholder="Deadline" style={{ width: '100%' }} />
                </Form.Item></div>
                <div className="col-md-6">
                    <Form.Item
                        label='Priority'
                        name="priority"
                    >
                        <Segmented
                            options={[
                                {
                                    label: 'High',
                                    value: 1,
                                    icon: <UpCircleOutlined style={{ color: 'red' }} />,
                                },
                                {
                                    label: 'Normal',
                                    value: 2,
                                    icon: <MinusCircleOutlined style={{ color: 'blue' }} />,
                                },
                                {
                                    label: 'Low',
                                    value: 3,
                                    icon: <DownCircleOutlined style={{ color: 'green' }} />,
                                }
                            ]}
                        />
                    </Form.Item></div>
            </div>
            {task ? <div className="row mt-12">
                <div className="col-md-6">
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                        style={{ marginTop: 20 }}
                    >
                        <Button loading={isLoading} type="primary" htmlType="submit" className='fos-btn-primary mb-1 ml-4'>
                            Update Task
                        </Button>
                    </Form.Item>
                </div>
                <div className="col-md-6">
                    <Form.Item
                        wrapperCol={{
                            span: 16,
                        }}
                        style={{ marginTop: 20 }}
                    >
                        <Button loading={isLoading} className='fos-btn-danger mb-1 ml-4' onClick={() => deleteItem()}>
                            Delete Task
                        </Button>
                    </Form.Item>
                </div>
            </div> :
                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                    style={{ marginTop: 20 }}
                >
                    <Button type="primary" htmlType="submit" className='fos-btn-primary mb-1 ml-4'>
                        Add Task
                    </Button>
                </Form.Item>}
        </Form>
    </Modal>
}

export default TaskModal;