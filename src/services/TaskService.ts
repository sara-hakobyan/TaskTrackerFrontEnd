import axios, { AxiosInstance } from "axios";

export interface Task {
  id: string;
  title: string;
  color: string;
  completed: boolean;
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

  async getTasks(): Promise<Task[]> {
    const response = await this.api.get<Task[]>("/tasks");
    console.log(response);
    return response.data;
  }

  async createTask(
    task: Omit<Task, "id" | "createdAt" | "updatedAt">
  ): Promise<Task> {
    const response = await this.api.post<Task>("/tasks", task);
    return response.data;
  }

  async updateTask(id: string, updatedTask: Partial<Task>): Promise<Task> {
    const response = await this.api.put<Task>(`/tasks/${id}`, updatedTask);
    return response.data;
  }

  async deleteTask(id: string): Promise<void> {
    await this.api.delete(`/tasks/${id}`);
  }
}

export const taskService = new TaskService();
