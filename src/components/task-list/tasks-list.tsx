import { FC, useEffect, useState } from "react";
import { Content } from "antd/lib/layout/layout";
import { Button, Form, Input, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Task from "../task/task";
import "./task-list.styles.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectTasks,
  tasksCreate,
  tasksGetAll,
} from "../../features/task-list/task-list-slice";
import { useParams } from "react-router-dom";

type TaskListProps = {
  columnId: string;
};

const TasksList: FC<TaskListProps> = ({ columnId }) => {
  const { boardId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const [form] = Form.useForm<{ title: string }>();
  const taskTitle = Form.useWatch('title', form);
  const taskDesc = Form.useWatch('description', form);

  useEffect(() => {
    if (boardId) {
      dispatch(tasksGetAll({ boardId: boardId, columnId: columnId }));
    }
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    if (boardId) {
      dispatch(
        tasksCreate({
          boardId: boardId,
          columnId: columnId,
          request: {
            title: taskTitle || "New Task",
            order: 1,
            description: taskDesc || "Description",
            userId: 0,
            users: [],
          },
        })
      );
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Content>
      <div className="task-list">
        {tasks &&
          tasks
            .filter((task) => task.columnId === columnId)
            .map((task) => {
              return (
                <Task
                  key={task._id}
                  title={task.title}
                  desc={task.description}
                  columnId={columnId}
                  id={task._id}
                />
              );
            })}
        <Button icon={<PlusOutlined />} onClick={showModal}>
          Add Task
        </Button>
        <Modal
          title="Create Task"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical" autoComplete="off">
            <Form.Item name="title" label="Title">
              <Input/>
            </Form.Item>
            <Form.Item name="description" label="Description">
              <Input.TextArea/>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </Content>
  );
};

export default TasksList;
