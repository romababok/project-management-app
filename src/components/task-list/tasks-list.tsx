import { useState, useMemo } from 'react';
import { Content } from 'antd/lib/layout/layout';
import { Button, Form, Input, List, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Task from '../task/task';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectTasks, tasksCreate } from '../../features/task-list/task-list-slice';
import { useParams } from 'react-router-dom';
import styles from './task-list.module.scss';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useTranslation } from 'react-i18next';

interface TaskListProps {
  columnId: string;
  tourRefs?: {
    ref1: React.MutableRefObject<null>;
    ref2: React.MutableRefObject<null>;
    ref3: React.MutableRefObject<null>;
    ref4: React.MutableRefObject<null>;
  };
}

const TasksList: React.FC<TaskListProps> = ({ columnId, tourRefs }) => {
  const { boardId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const tasks = useAppSelector(selectTasks);
  const { t } = useTranslation();

  const tasksPerColumn = useMemo(() => {
    return tasks.filter((task) => task.columnId === columnId);
  }, [tasks, columnId]);

  const sortedTasks = useMemo(() => {
    return tasksPerColumn.sort((a, b) => a.order - b.order);
  }, [tasksPerColumn]);

  const [form] = Form.useForm<{ title: string }>();
  const taskTitle = Form.useWatch('title', form);
  const taskDesc = Form.useWatch('description', form);

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
      form.resetFields();
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <Content className={styles.taskContent} ref={tourRefs?.ref4}>
      <Droppable droppableId={columnId} type="task">
        {(provided, snapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <List
              className={styles.taskList}
              dataSource={sortedTasks}
              renderItem={(task, index) => {
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
                          tourRefs={tourRefs}
                          title={task.title}
                          desc={task.description}
                          order={task.order}
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
        {t('Add task')}
      </Button>
      <Modal
        title={t('Create task')}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            {t('Cancel button')}
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            OK
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item name="title" label={t('Title')}>
            <Input maxLength={30} />
          </Form.Item>
          <Form.Item name="description" label={t('Description')}>
            <Input.TextArea maxLength={150} />
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
};

export default TasksList;
