import React, { useEffect, useState } from 'react';
import { Content } from 'antd/lib/layout/layout';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Modal, Input, Form, List } from 'antd';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  columnsGetAll,
  selectColumns,
  columnsCreate,
  columnsSetUpdate,
} from '../../features/columns/columns-slice';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import styles from './selected-board.module.scss';
import { selectTasks, taskSetUpdate } from '../../features/task-list/task-list-slice';
import { Task, TaskSetRequest } from '../../api/tasks';
import Column from '../../components/column/column';
import { Column as ColumnInterface, ColumnsSetRequest } from '../../api/сolumns';

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
    return () => {
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
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId && source.index === destination.index) {
      return;
    }

    const draggableTask = tasks.find((task) => task._id === draggableId);
    const draggableColumn = columns.find((column) => column._id === draggableId);

    if (type === 'column') {
      if (!draggableColumn) {
        return;
      }
      const unDraggedColumns = columns
        .filter((column) => column._id !== draggableId)
        .sort((a, b) => a.order - b.order);

      const columnsToUpdate: ColumnInterface[] = [{ ...draggableColumn, order: destination.index }];

      if (source.index < destination.index) {
        unDraggedColumns.forEach((column) => {
          if (column.order < source.index) {
            return;
          }
          if (column.order <= destination.index) {
            columnsToUpdate.push({
              ...column,
              order: column.order - 1,
            });
          }
        });
      } else {
        unDraggedColumns.forEach((column) => {
          if (column.order > source.index) {
            return;
          }
          if (column.order >= destination.index) {
            columnsToUpdate.push({
              ...column,
              order: column.order + 1,
            });
          }
        });
      }

      const columnsToUpdateRequest: ColumnsSetRequest[] = columnsToUpdate.map((column) => {
        const { _id, order } = column;
        return {
          _id: _id,
          order: order,
        };
      });

      dispatch(columnsSetUpdate(columnsToUpdateRequest));
    }

    if (type === 'task') {
      if (!draggableTask) {
        return;
      }
      const unDraggedTasksInSource = tasks
        .filter((task) => task.columnId === source.droppableId && task._id !== draggableId)
        .sort((a, b) => a.order - b.order);

      const tasksInDestination = tasks
        .filter((task) => task.columnId === destination.droppableId)
        .sort((a, b) => a.order - b.order);

      if (source.droppableId === destination.droppableId) {
        const tasksToUpdate: Task[] = [{ ...draggableTask, order: destination.index }];

        if (source.index < destination.index) {
          unDraggedTasksInSource.forEach((task) => {
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
          unDraggedTasksInSource.forEach((task) => {
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
      }

      if (source.droppableId !== destination.droppableId) {
        const destinationTasksToUpdate: Task[] = [
          { ...draggableTask, order: destination.index, columnId: destination.droppableId },
        ];

        const sourceTasksToUpdate: Task[] = [];

        unDraggedTasksInSource.forEach((task) => {
          if (task.order < source.index) {
            return;
          }
          if (task.order > source.index) {
            sourceTasksToUpdate.push({
              ...task,
              order: task.order - 1,
            });
          }
        });

        tasksInDestination.forEach((task) => {
          if (task.order < destination.index) {
            return;
          }
          if (task.order >= destination.index) {
            destinationTasksToUpdate.push({
              ...task,
              order: task.order + 1,
            });
          }
        });

        const tasksToUpdate = [...destinationTasksToUpdate, ...sourceTasksToUpdate];

        const tasksToUpdateRequest: TaskSetRequest[] = tasksToUpdate.map((task) => {
          const { _id, order, columnId } = task;
          return {
            _id: _id,
            order: order,
            columnId: columnId,
          };
        });

        dispatch(taskSetUpdate(tasksToUpdateRequest));
      }
    }
  };

  return (
    <Content style={{ padding: '0 50px', minHeight: '70px' }}>
      <h1>Board Title</h1>
      <Button icon={<PlusOutlined />} onClick={showModal}>
        Add Column
      </Button>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={boardId ?? ''} direction="horizontal" type="column">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <List
                className={styles.boardList}
                dataSource={columnsToSort.sort((a, b) => a.order - b.order)}
                renderItem={(column, index) => (
                  <Draggable draggableId={column._id} index={index} key={column._id}>
                    {(provided) => (
                      <List.Item
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Column title={column.title} columnId={column._id}></Column>
                      </List.Item>
                    )}
                  </Draggable>
                )}
              ></List>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
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
