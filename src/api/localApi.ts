import { TaskDataObj } from '../types';
import getPrettyDate from '../utils/getPrettyDate';

export default class LocalApi {
  getAll() {
    const jsonTasks = localStorage.getItem('tasks');
    let taskList: TaskDataObj[] = [];

    if (jsonTasks) {
      taskList = JSON.parse(jsonTasks);
    } else {
      const date = new Date();
      taskList = [
        {
          id: 1,
          text: 'Create new task',
          status: 'active',
          date: getPrettyDate(date),
        },
      ];
    }
    this.updateStoredData(taskList);
    return Promise.resolve(taskList);
  }

  add(newTask: TaskDataObj) {
    const jsonTasks = localStorage.getItem('tasks');
    let taskList: TaskDataObj[] = [];

    if (jsonTasks) {
      taskList = JSON.parse(jsonTasks);
    }
    taskList.push(newTask);
    this.updateStoredData(taskList);
    return Promise.resolve(newTask);
  }

  remove(id: number) {
    const jsonTasks = localStorage.getItem('tasks');
    let taskList: TaskDataObj[] = [];

    if (jsonTasks) {
      taskList = JSON.parse(jsonTasks);
    }
    taskList = taskList.filter((task) => task.id !== id);
    this.updateStoredData(taskList);

    return Promise.resolve(id);
  }

  update(updatedTask: TaskDataObj) {
    const jsonTasks = localStorage.getItem('tasks');
    let taskList: TaskDataObj[] = [];

    if (jsonTasks) {
      taskList = JSON.parse(jsonTasks);
    }

    const task = taskList.find((task) => task.id === updatedTask.id);

    if (task) task.status = updatedTask.status;

    this.updateStoredData(taskList);

    return Promise.resolve(updatedTask);
  }

  private updateStoredData(array: TaskDataObj[]) {
    localStorage.setItem('tasks', JSON.stringify(array));
  }
}
