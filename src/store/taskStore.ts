import { create, useStore } from "zustand";
import { Task, taskService } from "../services/TaskService";
import { stringifyingErrMsg } from "../utils/stringifyErrorMsg";

type IRemoteData<T> = {
  data: T;
  loading: boolean;
  error: string;
  message: string;
};

export type ISuccessRemoteData = Omit<IRemoteData<boolean>, "data"> & {
  success: boolean;
};

export type IDataResponse<T> = {
  error: string;
  data: T;
  message: string;
};

interface ITaskstore {
  tasks: IRemoteData<Task[] | null>;
  taskCreated: ISuccessRemoteData;
  taskUpdated: ISuccessRemoteData;
  taskDeleted: ISuccessRemoteData;
  fetchTasks: () => Promise<void>;
  createNewTask: (data: {
    title: string;
    color?: string;
    completed?: boolean;
  }) => Promise<void>;
  updateTask: (id: number, updatedTask: Partial<Task>) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;
  selectedTask: Task | null;
  setSelectedTask: (task: Task) => void;
  resetActions: () => void;
  resetUpdatedTaskStatus: () => void;
}

const taskStore = create<ITaskstore>((set) => ({
  selectedTask: null,
  tasks: {
    data: null,
    loading: false,
    error: "",
    message: "",
  },
  taskCreated: { success: false, loading: false, error: "", message: "" },
  taskUpdated: { success: false, loading: false, error: "", message: "" },
  taskDeleted: { success: false, loading: false, error: "", message: "" },
  setSelectedTask: (task: Task) => {
    set((state) => ({ selectedTask: task }));
  },

  fetchTasks: async () => {
    set((state) => ({ tasks: { ...state.tasks, loading: true } }));
    try {
      let errMsg: string;
      let result: Task[];
      let msg: string;
      const response: IDataResponse<Task[]> = await taskService.getTasks();
      if (response.error) {
        errMsg = response.error;
        msg = response.message;
      } else {
        result = response.data;
        msg = response.message;
      }
      set((state) => ({
        ...state,
        tasks: {
          ...state.tasks,
          data: result,
          loading: false,
          error: errMsg,
          message: msg,
        },
      }));
    } catch (error) {
      const errMsg = stringifyingErrMsg(error);
      set((state) => ({
        ...state,
        tasks: {
          ...state.tasks,

          loading: false,
          error: errMsg,
          message: "An error occurred while fetching tasks",
        },
      }));
    }
  },

  createNewTask: async (data: {
    title: string;
    color?: string;
    completed?: boolean;
  }) => {
    set((state) => ({
      ...state,
      taskCreated: { ...state.taskCreated, loading: true },
    }));
    let errMsg: string;
    let msg: string;
    let result: boolean;
    try {
      const response: IDataResponse<Task> = await taskService.createTask(data);
      if (response.error) {
        errMsg = response.error;
        msg = response.message;
      } else {
        result = true;
        msg = response.message;
      }

      set((state) => ({
        ...state,
        taskCreated: {
          success: result,
          loading: false,
          error: errMsg,
          message: msg,
        },
      }));
    } catch (error) {
      const errMsg = stringifyingErrMsg(error);
      set((state) => ({
        ...state,
        taskCreated: {
          success: false,
          loading: false,
          error: errMsg,
          message: "An error occurred while creating a task",
        },
      }));
    }
  },

  updateTask: async (id: number, updatedTask: Partial<Task>) => {
    set((state) => ({
      ...state,
      taskUpdated: { ...state.taskUpdated, loading: true },
    }));

    let err: string;
    let msg: string;
    let result: boolean;
    try {
      set((state) => ({
        ...state,
        taskUpdated: { ...state.taskUpdated, loading: true },
      }));
      const response: IDataResponse<Task> = await taskService.updateTask(
        id,
        updatedTask
      );
      if (response.error) {
        err = response.error;
        msg = response.message;
      } else {
        result = true;
        msg = response.message;
      }
      set((state) => ({
        ...state,
        taskUpdated: {
          success: result,
          loading: false,
          error: err,
          message: msg,
        },
      }));
    } catch (error) {
      const errMsg = stringifyingErrMsg(error);
      set((state) => ({
        ...state,
        taskUpdated: {
          success: false,
          loading: false,
          error: errMsg,
          message: "An error occurred while updating a task",
        },
      }));
    }
  },

  deleteTask: async (id: number) => {
    set((state) => ({
      ...state,
      taskDeleted: { ...state.taskDeleted, loading: true },
    }));
    let errMsg: string;
    let msg: string;
    let result: boolean;

    try {
      const response: IDataResponse<boolean> = await taskService.deleteTask(id);
      if (response.error) {
        errMsg = response.error;
        msg = response.message;
      } else {
        result = response.data;
        msg = response.message;
      }
      set((state) => ({
        ...state,
        taskDeleted: {
          success: result,
          loading: false,
          error: errMsg,
          message: msg,
        },
      }));
    } catch (error) {
      const errMsg = stringifyingErrMsg(error);
      set((state) => ({
        ...state,
        taskDeleted: {
          success: false,
          loading: false,
          error: errMsg,
          message: "An error occurred while deleting a task",
        },
      }));
    }
  },

  resetActions: () => {
    set((state) => ({
      ...state,
      tasks: { ...state.tasks, loading: false, error: "", message: "" },
      taskCreated: { success: false, loading: false, error: "", message: "" },
      taskUpdated: { success: false, loading: false, error: "", message: "" },
      taskDeleted: { success: false, loading: false, error: "", message: "" },
      selectedTask: null,
    }));
  },

  resetUpdatedTaskStatus: () => {
    set((state) => ({
      ...state,
      taskUpdated: { success: false, loading: false, error: "", message: "" },
    }));
  },
}));

export const useTaskStore = (): ITaskstore => useStore(taskStore);
