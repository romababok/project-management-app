import { FC, useEffect, useState, useMemo } from 'react';
import { Content } from 'antd/lib/layout/layout';
import { Button, Form, Input, List, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Task from '../task/task';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTasks, tasksCreate, tasksGetAll } from '../../features/task-list/task-list-slice';
import { useParams } from 'react-router-dom';
import styles from './task-list.module.scss';
import { Draggable, Droppable } from 'react-beautiful-dnd';

interface TaskListProps {
  columnId: string;
}

const TasksList: FC<TaskListProps> = ({ columnId }) => {
  const { boardId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);

  const tasksPerColumn = useMemo(() => {
    return tasks.filter((task) => task.columnId === columnId);
  }, [tasks, columnId]);

  const sortedTasks = useMemo(() => {
    return tasksPerColumn.sort((a, b) => a.order - b.order);
  }, [tasksPerColumn]);

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
            title: taskTitle || 'New Task',
            order: tasksPerColumn.length,
            description: taskDesc || 'Description',
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
    <Content className={styles.taskContent}>
      <Droppable droppableId={columnId}>
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <List
              className={styles.taskList}
              dataSource={sortedTasks}
              renderItem={(task, index) => {
                console.log(snapshot);
                return (
                  <Draggable draggableId={task._id} index={index} key={task._id}>
                    {(provided) => (
                      <List.Item
                        //TODO: add snapshot.isDragginOver
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Task
                          title={task.title}
                          desc={task.description}
                          columnId={columnId}
                          taskId={task._id}
                        />
                      </List.Item>
                    )}
                  </Draggable>
                );
              }}
            ></List>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Button icon={<PlusOutlined />} onClick={showModal}>
        Add Task
      </Button>
      <Modal title="Create Task" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item name="title" label="Title">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
};

export default TasksList;
