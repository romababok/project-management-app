import { FC, useEffect, useState } from "react";
import { Content } from "antd/lib/layout/layout";
import { Button, Input, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Task from "../task/task";
import "./task-list.styles.scss";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectTasks,
  tasksCreate,
  tasksGetAll,
} from "../../features/task-list/task-list-slice";

type TaskListProps = {
  board: string;
  columnId: string;
};

const TasksList: FC<TaskListProps> = ({ board, columnId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDesc, setNewTaskDesc] = useState("");
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);

  useEffect(() => {
    dispatch(tasksGetAll({ boardId: board ?? "", columnId: columnId }));
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);

    dispatch(
      tasksCreate({
        boardId: board ?? "",
        columnId: columnId,
        request: {
          title: newTaskTitle || "New Task",
          order: 1,
          description: newTaskDesc || "Description",
          userId: 0,
          users: [],
        },
      })
    );
    setNewTaskTitle("");
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
                  board={board}
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
          <form>
            <Input
              placeholder="Add title"
              defaultValue="New Task"
              onChange={(e) => setNewTaskTitle(e.target.value)}
            />
            <Input.TextArea
              placeholder="Add Description"
              onChange={(e) => setNewTaskDesc(e.target.value)}
            />
          </form>
        </Modal>
      </div>
    </Content>
  );
};

export default TasksList;
