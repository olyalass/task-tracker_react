import classNames from 'classnames';
import { memo } from 'react';
import task from './style.module.scss';
import { TaskDataObj, Status } from '../../types';

type ComponentProps = {
  taskInfo: TaskDataObj;
  onTaskDelete: (id: number) => void;
  onTaskUpdate: (updatedTask: TaskDataObj) => void;
};

const Task = memo(
  ({ taskInfo, onTaskDelete, onTaskUpdate }: ComponentProps) => {
    const altStatus = taskInfo.status === 'active' ? 'done' : 'active';

    return (
      <div className={task.element}>
        <div className={task.wrap}>
          <div>
            <h2 className={task.text}>{taskInfo.text}</h2>
            <div className={task.buttons_container}>
              <button
                className={classNames(task.button, {
                  [task.button_done]: taskInfo.status === 'done',
                })}
                onClick={() => {
                  onTaskUpdate({
                    ...taskInfo,
                    id: taskInfo.id,
                    status: altStatus,
                  });
                }}
              >
                {taskInfo.status === 'active' ? 'Done' : 'Undo'}
              </button>
              <button
                className={classNames(task.button, {
                  [task.button_done]: taskInfo.status === 'done',
                })}
                onClick={() => {
                  onTaskDelete(taskInfo.id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
          <div>
            <p
              className={classNames(task.status, {
                [task.status_active]: taskInfo.status === 'active',
                [task.status_done]: taskInfo.status === 'done',
              })}
            >
              {taskInfo.status}
            </p>
            <p className={task.date}>{taskInfo.date}</p>
          </div>
        </div>
      </div>
    );
  }
);

export default Task;
