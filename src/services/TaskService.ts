import axios, { AxiosInstance } from "axios";
import { IDataResponse } from "../store/taskStore";

export interface Task {
  id: string;
  title: string;
  color?: string;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

class TaskService {
  private api: AxiosInstance;

  constructor() {
    const baseURL = process.env.NEXT_PUBLIC_API_URL;
    this.api = axios.create({
      baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getTasks(): Promise<IDataResponse<Task[]>> {
    const response = await this.api.get<IDataResponse<Task[]>>("/tasks");
    return response.data;
  }

  async createTask(
    task: Omit<Task, "id" | "createdAt" | "updatedAt">
  ): Promise<IDataResponse<Task>> {
    const response = await this.api.post<IDataResponse<Task>>("/tasks", task);
    return response.data;
  }

  async updateTask(
    id: number,
    updatedTask: Partial<Task>
  ): Promise<IDataResponse<Task>> {
    const response = await this.api.put<IDataResponse<Task>>(
      `/tasks/${id}`,
      updatedTask
    );
    return response.data;
  }

  async deleteTask(id: number): Promise<IDataResponse<boolean>> {
    const response = await this.api.delete<IDataResponse<boolean>>(
      `/tasks/${id}`
    );
    return response.data;
  }
}

export const taskService = new TaskService();
