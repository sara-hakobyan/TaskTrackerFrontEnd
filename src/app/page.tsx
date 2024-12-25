"use client";
import Image from "next/image";
import clipboardPng from "../../public/assets/Clipboard.png";
import { useRouter } from "next/navigation";
import { ActionBtn } from "../components/ActionBtn";
import { FiPlusCircle } from "react-icons/fi";
import { useEffect } from "react";
import { taskService } from "../services/TaskService";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await taskService.getTasks();
      console.log(data);
      return;
    };
    fetchTasks();
  }, []);

  const createBtnHandler = () => {
    router.push("/create");
  };
  return (
    <div className="bg-[#1A1A1A] h-screen justify-center flex ">
      <div className="relative w-[740px] ">
        <div className="absolute w-full top-[-25px] flex flex-col gap-[65px]">
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
                  0
                </span>
              </p>
              <p className="text-[#8284FA] font-bold text-[14px] leading-[17px] mr-[8px]">
                Completed{" "}
                <span className="rounded-full bg-[#333333] px-[8px] py-[2px] text-[#D9D9D9] text-[12px] leading-[14px]">
                  0
                </span>
              </p>
            </div>
            <NoTasksView />
          </div>
        </div>
      </div>
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
