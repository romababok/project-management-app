import React, { useEffect, useRef, useState } from 'react';
import { Content } from 'antd/lib/layout/layout';
import { PlusOutlined, BulbTwoTone } from '@ant-design/icons';
import { Button, Modal, Input, Form, List, Tour, Tooltip } from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import {
  columnsGetAll,
  selectColumns,
  columnsCreate,
  columnsSetUpdate,
} from '../../features/columns/columns-slice';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import styles from './selected-board.module.scss';
import { selectTasks, taskSetUpdate, tasksGetAll } from '../../features/task-list/task-list-slice';
import { Task, TaskSetRequest } from '../../api/tasks';
import Column from '../../components/column/column';
import { Column as ColumnInterface, ColumnsSetRequest } from '../../api/сolumns';
import { getBoardById, selectBoard, selectBoardStatus } from '../../features/boards/boards-slice';
import { useTranslation } from 'react-i18next';
import type { TourProps } from 'antd';
import { PageLoadingIndicator } from '../../components';

export const SelectedBoardPage: React.FC = () => {
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const [open, setOpen] = useState<boolean>(false);

  const { boardId } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();
  const columns = useAppSelector(selectColumns);
  const columnsStatus = useAppSelector((state) => state.columns.status);

  const [form] = Form.useForm<{ title: string }>();
  const columnTitle = Form.useWatch('title', form);
  const tasks = useAppSelector(selectTasks);
  const columnsToSort = [...columns];
  const { t } = useTranslation();
  const [tourInactive, setTourInactive] = useState(true);
  const tourRefs = { ref1, ref2, ref3, ref4 };
  const navigate = useNavigate();
  const board = useAppSelector(selectBoard);
  const boardStatus = useAppSelector(selectBoardStatus);

  useEffect(() => {
    if (boardId) {
      dispatch(getBoardById(boardId));
    }
    return () => {
      dispatch({ type: 'boards/resetCurrentBoard' });
    };
  }, []);

  useEffect(() => {
    if (board && boardId) {
      dispatch(columnsGetAll(boardId)).then((data) => {
        const cols = data.payload as ColumnInterface[];
        cols.forEach((column) => {
          dispatch(tasksGetAll({ boardId, columnId: column._id }));
        });
      });
    }
    return () => {
      dispatch({ type: 'columns/resetColumns' });
      dispatch({ type: 'tasks/resetTasks' });
    };
  }, [board]);

  useEffect(() => {
    if (boardStatus === 'failed') {
      navigate('/boards');
    }
  }, [boardStatus]);

  useEffect(() => {
    tasks.length > 0 ? setTourInactive(false) : setTourInactive(true);
  }, [tasks]);

  const steps: TourProps['steps'] = [
    {
      title: t('First slide title'),
      description: t('First slide description'),
      target: () => ref1.current,
    },
    {
      title: t('Second slide title'),
      description: t('Second slide description'),
      target: () => ref2.current,
    },
    {
      title: t('Third slide title'),
      description: t('Third slide description'),
      target: () => ref3.current,
    },
    {
      title: t('Fourth slide title'),
      description: t('Fourth slide description'),
      target: () => ref4.current,
    },
  ];

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    if (boardId) {
      dispatch(
        columnsCreate({
          boardId,
          request: { title: columnTitle || 'New Column', order: columns.length },
        })
      );
    }
    form.resetFields();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
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

      dispatch({ type: 'columns/updateColumns', payload: columnsToUpdate });

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

        dispatch({ type: 'tasks/updateTasks', payload: tasksToUpdate });

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

        dispatch({ type: 'tasks/updateTasks', payload: tasksToUpdate });
        dispatch(taskSetUpdate(tasksToUpdateRequest));
      }
    }
  };
  if (columnsStatus !== 'succeeded' || boardStatus !== 'idle') {
    return <PageLoadingIndicator />;
  }

  return (
    <Content style={{ padding: '0 50px', maxHeight: 'calc(100vh - 80px - 64px)' }}>
      <div className={styles.boardHeader}>
        <Button type="default">
          <Link to="/boards">{t('Back')}</Link>
        </Button>
        <h2>
          <p style={{ display: 'inline' }}> {t('Board title')} </p>
          {board?.title}
        </h2>
        <div className={styles.boardControllers}>
          <Button icon={<PlusOutlined />} type="primary" onClick={showModal}>
            {t('Add column')}
          </Button>
          {tourInactive ? (
            <Tooltip placement={'bottom'} title={t('Tour message')}>
              <Button
                type="default"
                onClick={() => setOpen(true)}
                disabled={tourInactive}
                icon={<BulbTwoTone />}
              >
                {t('Tour')}
              </Button>
            </Tooltip>
          ) : (
            <Button
              type="default"
              onClick={() => setOpen(true)}
              disabled={tourInactive}
              icon={<BulbTwoTone />}
            >
              {t('Tour')}
            </Button>
          )}
        </div>
      </div>
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
                        <Column
                          tourRefs={tourRefs}
                          title={column.title}
                          columnId={column._id}
                          order={column.order}
                        ></Column>
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
      <Modal
        title={t('Add column')}
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
            <Input placeholder={t('Placeholder name column') as string} maxLength={30} />
          </Form.Item>
        </Form>
      </Modal>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </Content>
  );
};
