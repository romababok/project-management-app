import React, { useEffect, useState } from 'react';
import { Content } from 'antd/lib/layout/layout';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Input, Form, List } from 'antd';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { columnsGetAll, selectColumns, columnsCreate } from '../../features/columns/columns-slice';
import Column from '../../components/column/column';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styles from './selected-board.module.scss';
import { selectTasks, taskSetUpdate } from '../../features/task-list/task-list-slice';
import { Task, TaskSetRequest } from '../../api/tasks';

export const SelectedBoardPage: React.FC = () => {
  const { boardId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const columns = useAppSelector(selectColumns);
  const columnsToSort = [...columns];
  const [form] = Form.useForm<{ title: string }>();
  const columnTitle = Form.useWatch('title', form);
  const tasks = useAppSelector(selectTasks);

  useEffect(() => {
    if (boardId) {
      dispatch(columnsGetAll(boardId ?? ''));
    }
    // clear all columns and tasks when exiting Board page
    return () => {
      dispatch({ type: 'tasks/resetTasks' });
      dispatch({ type: 'columns/resetColumns' });
    };
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    if (boardId) {
      dispatch(
        columnsCreate({
          boardId: boardId,
          request: { title: columnTitle || 'New Column', order: columns.length },
        })
      );
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    console.log(source.index, destination?.index);
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && source.index === destination.index) {
      return;
    }

    const draggableTask = tasks.find((task) => task._id === draggableId);

    if (!draggableTask) {
      return;
    }
    const unDraggedTasks = tasks
      .filter((task) => task.columnId === source.droppableId && task._id !== draggableId)
      .sort((a, b) => a.order - b.order);

    const tasksToUpdate: Task[] = [{ ...draggableTask, order: destination.index }];

    if (source.index < destination.index) {
      unDraggedTasks.forEach((task) => {
        if (task.order < source.index) {
          return;
        }
        if (task.order <= destination.index) {
          tasksToUpdate.push({
            ...task,
            order: task.order - 1,
          });
        }
      });
    } else {
      unDraggedTasks.forEach((task) => {
        if (task.order > source.index) {
          return;
        }
        if (task.order >= destination.index) {
          tasksToUpdate.push({
            ...task,
            order: task.order + 1,
          });
        }
      });
    }

    const tasksToUpdateRequest: TaskSetRequest[] = tasksToUpdate.map((task) => {
      const { _id, order, columnId } = task;
      return {
        _id: _id,
        order: order,
        columnId: columnId,
      };
    });

    dispatch(taskSetUpdate(tasksToUpdateRequest));

    // if (boardId && draggableTask && source.droppableId && destination.droppableId) {
    //   if (destination.droppableId === source.droppableId) {
    //     const draggedTask = {
    //       boardId: boardId,
    //       columnId: source.droppableId,
    //       taskId: draggableId,
    //       request: {
    //         title: draggableTask.title,
    //         order: destination.index,
    //         description: draggableTask.description,
    //         columnId: source.droppableId,
    //         userId: 0,
    //         users: [],
    //       },
    //     };
    //     dispatch(tasksUpdate(draggedTask));
    // }
    // if (destination.droppableId !== source.droppableId) {
    //   const draggedTask = {
    //     boardId: boardId,
    //     columnId: source.droppableId,
    //     taskId: draggableId,
    //     request: {
    //       title: draggableTask.title,
    //       order: destination.index,
    //       description: draggableTask.description,
    //       columnId: destination.droppableId,
    //       userId: 0,
    //       users: [],
    //     },
    //   };
    //   dispatch(tasksUpdate(draggedTask));
    // }
    // }
  };

  return (
    <Content style={{ padding: '0 50px', minHeight: '70vh' }}>
      <h1>Board Title</h1>
      <Button icon={<PlusOutlined />} onClick={showModal}>
        Add Column
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <List
          className={styles.boardList}
          dataSource={columnsToSort.sort((a, b) => a.order - b.order)}
          renderItem={(column) => (
            <List.Item>
              <Column title={column.title} columnId={column._id}></Column>
            </List.Item>
          )}
        ></List>
      </DragDropContext>
      <Modal title="Add Column" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form form={form} layout="vertical" autoComplete="off">
          <Form.Item name="title" label="Title">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Content>
  );
};
