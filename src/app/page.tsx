"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { FiPlusCircle } from "react-icons/fi";

import clipboardPng from "../../public/assets/Clipboard.png";
import { ActionBtn } from "../components/ActionBtn";
import { TaskCard } from "../components/TaskCard";
import { Loading } from "../components/Loading";
import { useTaskStore } from "../store/taskStore";
import { Task } from "../services/TaskService";
import { Modal } from "../components/ConfirmationModal";

export default function Home() {
  const router = useRouter();
  const store = useTaskStore();
  const [isModal, setIsModal] = useState(false);

  const modalHandler = () => {
    setIsModal((prev) => !prev);
  };

  const completedTaks = useMemo((): number => {
    if (!store.tasks.data) return 0;
    const completed = store.tasks.data.filter((task: any) => task.completed);
    return completed.length;
  }, [store.tasks.data]);

  const fetchTasks = useCallback(async (): Promise<void> => {
    await store.fetchTasks();
  }, [store.fetchTasks]);

  useEffect(() => {
    store.resetActions();
    fetchTasks();
  }, []);

  const updateTask = useCallback(
    async (id: number, completed: boolean): Promise<void> => {
      await store.updateTask(id, { completed });
      fetchTasks();
      store.resetUpdatedTaskStatus();
    },
    [store.updateTask, fetchTasks]
  );

  const createBtnHandler = useCallback((): void => {
    router.push("/create");
  }, [router]);

  const onConfirmDelete = useCallback(async (): Promise<void> => {
    if (store.selectedTask) {
      await store.deleteTask(Number(store.selectedTask.id));
      fetchTasks();
      setIsModal(false);
    }
  }, [store.selectedTask, fetchTasks]);

  if (store.tasks.loading && !store.tasks.data)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="bg-[#1A1A1A] min-h-screen  flex flex-col items-center px-5">
      <div className="relative w-full md:w-[540px] lg:w-[740px] mx-5">
        <div className="absolute w-full  top-[-25px] flex flex-col gap-[65px]">
          <ActionBtn
            onClick={createBtnHandler}
            btnName="Create Task"
            icon={
              <FiPlusCircle
                className="text-[#F2F2F2] !w-[16px] !h-[16px] !font-bold"
                width={16}
                height={16}
              />
            }
          />
          <div className="flex flex-col gap-[24px]">
            <div className="flex justify-between">
              <p className="text-[#4EA8DE] font-bold text-[14px] leading-[17px] mr-[8px]">
                Tasks{" "}
                <span className="rounded-full bg-[#333333] px-[8px] py-[2px] text-[#D9D9D9] text-[12px] leading-[14px]">
                  {!store.tasks.data ? 0 : store.tasks.data.length}
                </span>
              </p>
              <p className="text-[#8284FA] font-bold text-[14px] leading-[17px] mr-[8px]">
                Completed{" "}
                <span className="rounded-full bg-[#333333] px-[8px] py-[2px] text-[#D9D9D9] text-[12px] leading-[14px]">
                  {!store.tasks.data
                    ? 0
                    : `${completedTaks} de ${store.tasks.data.length}`}
                </span>
              </p>
            </div>
            {!store.tasks.data && !store.tasks.loading ? (
              <NoTasksView />
            ) : (
              store.tasks.data &&
              store.tasks.data.map((task: Task) => (
                <TaskCard
                  data={task}
                  key={task.id}
                  updateTask={updateTask}
                  modalHandler={modalHandler}
                />
              ))
            )}
          </div>
        </div>
      </div>
      {isModal ? (
        <Modal
          isOpen={isModal}
          onClose={modalHandler}
          onConfirm={onConfirmDelete}
        />
      ) : null}
    </div>
  );
}

const NoTasksView = () => (
  <div className="border-t border-t-[#333333] !rounded-[8px] min-h-[260px] flex flex-col items-center justify-center">
    <Image src={clipboardPng} alt="clipboard" className="w-[56px] h-[56px]" />
    <p className="text-[#808080] text-[16px] leading-10 text-center font-bold font-[Inter]">
      You don't have any tasks registered yet. <br />
      <span className="font-normal">
        {" "}
        Create tasks and organize your to-do items.
      </span>
    </p>
  </div>
);
