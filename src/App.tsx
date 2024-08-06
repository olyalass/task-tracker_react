import React, { useState, useCallback, useEffect } from 'react';
import app from './App.module.scss';
import Nav from './components/Nav';
import Task from './components/Task';
import Form from './components/Form';
import { Filter, TaskDataObj } from './types';
import getPrettyDate from './utils/getPrettyDate';
import formatNewTask from './utils/formatNewTask';
import { api } from './api';

export default function App() {
  const [isReversed, setIsReversed] = useState(false);
  const [filter, setFilter] = useState<Filter>('all');
  const [taskList, setTaskList] = useState<TaskDataObj[]>([]);

  useEffect(() => {
    api.getAll().then((tasks) => setTaskList(tasks));
  }, []);

  let processedTasks = taskList.slice();

  if (isReversed) {
    processedTasks.reverse();
  }

  if (filter !== 'all') {
    processedTasks = processedTasks.filter((task) => task.status === filter);
  }

  function handleTaskDelete(id: number) {
    api.remove(id).then((idNum) => {
      const newTaskList = taskList.filter((task) => task.id !== idNum);
      setTaskList(newTaskList);
    });
  }

  function handleTaskUpdate(updatedTask: TaskDataObj) {
    api.update(updatedTask).then((freshTask) => {
      setTaskList(
        taskList.map((task) => (task.id === freshTask.id ? freshTask : task))
      );
    });
  }

  const handleReverseClick = useCallback(() => {
    setIsReversed(!isReversed);
  }, [isReversed]);

  const handleFilterChange = useCallback((newFilter: Filter) => {
    setFilter(newFilter);
  }, []);

  function handleNewTaskAdd(text: string) {
    let id = 1;

    if (taskList.length > 0) {
      id = taskList[taskList.length - 1].id + 1;
    }

    const date = new Date();
    text = formatNewTask(text);
    const newTask: TaskDataObj = {
      text,
      status: 'active',
      id,
      date: getPrettyDate(date),
    };

    api.add(newTask).then((addedTask) => {
      setTaskList([...taskList, addedTask]);
    });
  }

  return (
    <div className={app.element}>
      <h1 className={app.title}>TaskTrack 2.0</h1>
      <div className={app.container}>
        <Nav
          onReverseClick={handleReverseClick}
          onFilterChange={handleFilterChange}
          filter={filter}
          isReversed={isReversed}
        />
        <div className={app.list}>
          <div className={app.list_wrap}>
            {processedTasks.map((task) => (
              <Task
                key={task.id}
                taskInfo={task}
                onTaskDelete={handleTaskDelete}
                onTaskUpdate={handleTaskUpdate}
              />
            ))}
          </div>
        </div>
        <Form onFormSubmit={handleNewTaskAdd} />
      </div>
    </div>
  );
}
