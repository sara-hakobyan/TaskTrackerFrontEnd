"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";

import { ActionBtn } from "@/src/components/ActionBtn";
import { ColorBtns } from "@/src/components/ColorBtns";
import { CustomForm } from "@/src/components/CustomForm";
import { IconBtn } from "@/src/components/IconBtn";
import { useErrorMessage } from "@/src/hooks/useErrorMsg";
import { useTaskStore } from "@/src/store/taskStore";

function CreateTask() {
  const store = useTaskStore();
  const router = useRouter();
  const [taskContenet, setTaskContent] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const { errMsg, setError, clearError } = useErrorMessage();

  const onChange = useCallback(
    (value: string): void => {
      setTaskContent(value);
      clearError();
    },
    [clearError]
  );

  const back = useCallback((): void => {
    router.push("/");
  }, [router]);


  useEffect(() => {
    if (store.taskCreated.success) {
      router.push("/");
    }
  }, [store.taskCreated, router]);

  const addBtnHandler = useCallback(async (): Promise<void> => {
    if (!taskContenet.trim()) {
      setError("Task content is required!");
      return;
    }
    clearError();
    let data = {
      title: taskContenet,
    };
    if (selectedColor) {
      data = { ...data, ...{ color: selectedColor } };
    }
    await store.createNewTask(data);
    await store.fetchTasks();
  }, [taskContenet, selectedColor, setError, clearError]);

  return (
    <div className="bg-[#1A1A1A] h-screen  flex justify-center pt-[50px] md:pt-[70px] lg:pt-[90px] px-5">
      <div className="w-full md:w-[540px] lg:w-[740px] flex flex-col gap-[48px]">
        <IconBtn
          icon={<FaArrowLeft className="text-[#FFFFFF] w-[14px] h-[14px]" />}
          onClick={back}
        />
        <div className="flex flex-col gap-[24px]">
          <CustomForm
            errMsg={errMsg}
            onChange={onChange}
            value={taskContenet}
            placeholder="Ex. My task here"
          />

          <ColorBtns
            updateColor={setSelectedColor}
            defaultColor={selectedColor}
          />
        </div>
        <ActionBtn
          isDisabled={store.taskCreated.loading}
          btnName="Add task"
          onClick={addBtnHandler}
          icon={
            <FiPlusCircle
              className="text-[#F2F2F2] !w-[16px] !h-[16px] !font-bold"
              width={16}
              height={16}
            />
          }
        />
      </div>
    </div>
  );
}

export default CreateTask;
