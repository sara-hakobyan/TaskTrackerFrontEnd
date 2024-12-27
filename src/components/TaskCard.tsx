import React, { useCallback, useMemo, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { Task } from "../services/TaskService";
import { useRouter } from "next/navigation";
import { useTaskStore } from "../store/taskStore";

interface ITaskCard {
  data: Task;
  updateTask: (id: number, completed: boolean) => void;
  modalHandler: () => void;
}

const TaskCard: React.FC<ITaskCard> = React.memo(
  ({ data, updateTask, modalHandler }) => {
    const [isChecked, setIsChecked] = useState(data.completed);
    const router = useRouter();
    const store = useTaskStore();

    const toggleCheck = useCallback(async (): Promise<void> => {
      setIsChecked(!isChecked);
      updateTask(Number(data.id), !isChecked);
    }, [isChecked, data.id, updateTask]);

    const deletBtnHandler = useCallback((): void => {
      store.setSelectedTask(data);
      modalHandler();
    }, [store.setSelectedTask, data, modalHandler]);

    const onTaskClick = useCallback((): void => {
      store.setSelectedTask(data);
      router.push(`/edit/${data.id}`);
    }, [store.setSelectedTask, data, router]);

    return (
      <div className="flex w-full bg-[#262626] rounded-lg justify-between items-center px-[10px]">
        <div className="inline-flex items-center h-auto py-[16px] ">
          <label className="flex items-center cursor-pointer relative">
            <input
              type="checkbox"
              checked={isChecked}
              onChange={toggleCheck}
              className="peer h-4 w-4 cursor-pointer transition-all appearance-none rounded-full shadow hover:shadow-md border border-[#4EA8DE] checked:bg-[#5E60CE] checked:border-[#5E60CE]"
            />
            <span className="absolute text-[#F2F2F2] opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-2.5 w-2.5"
                viewBox="0 0 20 20"
                fill="currentColor"
                stroke="currentColor"
              >
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
              </svg>
            </span>
          </label>
        </div>
        <div
          onClick={onTaskClick}
          className={`flex justify-between items-center w-full  py-[16px] flex-1 cursor-pointer transition-all`}
        >
          <p
            className={`ml-4 text-start text-[14px] leading-[19px] font-normal  ${
              isChecked ? "text-[#808080] line-through" : "text-[#F2F2F2]"
            }`}
          >
            {data.title}
          </p>
          <div
            className={`h-[6px] w-[6px] rounded-full mr-[12px]`}
            style={{ backgroundColor: data.color }}
          ></div>
        </div>
        <button onClick={deletBtnHandler}>
          <HiOutlineTrash className="text-[#808080] w-auto h-[14px]" />
        </button>
      </div>
    );
  }
);

export { TaskCard };
