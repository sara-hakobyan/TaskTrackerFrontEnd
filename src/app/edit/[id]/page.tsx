"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";

import { ActionBtn } from "@/src/components/ActionBtn";
import { ColorBtns } from "@/src/components/ColorBtns";
import { CustomForm } from "@/src/components/CustomForm";
import { IconBtn } from "@/src/components/IconBtn";
import { useErrorMessage } from "@/src/hooks/useErrorMsg";
import { useTaskStore } from "@/src/store/taskStore";

function Edit() {
  const store = useTaskStore();
  const router = useRouter();

  const [taskContenet, setTaskContent] = useState<string>(
    store.selectedTask?.title || ""
  );
  const [selectedColor, setSelectedColor] = useState<string>(
    store.selectedTask?.color || ""
  );
  const { errMsg, setError, clearError } = useErrorMessage();
  useEffect(() => {
    if (store.taskUpdated.success || !store.selectedTask) {
      router.push("/");
    }
  }, [store.taskUpdated, store.selectedTask]);

  const back = useCallback((): void => {
    router.push("/");
  }, [router]);

  const onChange = useCallback(
    (value: string): void => {
      setTaskContent(value);
      clearError();
    },
    [clearError]
  );

  const saveHandler = useCallback(async (): Promise<void> => {
    if (!taskContenet.trim() || !store.selectedTask) {
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
    if (store.selectedTask) {
      await store.updateTask(Number(store.selectedTask.id), data);
    }
  }, [
    setError,
    clearError,
    taskContenet,
    selectedColor,
    store.selectedTask,
    store.updateTask,
  ]);

  return (
    <div className="bg-[#1A1A1A] min-h-screen  flex flex-col items-center pt-[50px] md:pt-[70px] lg:pt-[90px] px-5">
      <div className=" md:w-[540px] lg:w-[740px] flex flex-col gap-[48px]">
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
          btnName="Save"
          onClick={saveHandler}
          icon={
            <MdOutlineDone
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

export default Edit;
