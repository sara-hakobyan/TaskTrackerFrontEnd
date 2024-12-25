"use client";
import { ActionBtn } from "@/src/components/ActionBtn";
import { IconBtn } from "@/src/components/IconBtn";
import { colors } from "@/src/constants";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";

function CreateTask() {
  const router = useRouter();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const back = () => {
    router.push("/");
  };

  const btnHandler = () => {
    console.log("add functionality");
  };
  return (
    <div className="bg-[#1A1A1A] h-full flex justify-center pt-[90px]">
      <div className="min-w-[740px] flex flex-col gap-[48px]">
        <IconBtn
          icon={<FaArrowLeft className="text-[#FFFFFF] w-[14px] h-[14px]" />}
          onClick={back}
        />
        <div className="flex flex-col gap-[24px]">
          <CustomForm
            onChange={onChange}
            value=""
            plascerholder="Ex. My task here"
          />
          <ColorBtns />
        </div>
        <ActionBtn
          btnName="Add task"
          onClick={btnHandler}
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
interface ICustomForm {
  plascerholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CustomForm = (props: ICustomForm) => {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[14px]">
        <label className="text-[#4EA8DE] font-bold text-[14px] leading-[17px]">
          Title
        </label>

        <input
          className="min-h-[52px] bg-[#333333] p-[16px] rounded-[8px] placeholder-[#F2F2F2] placeholder:opacity-40 text-[14px] text-[#F2F2F2] leading-[20px] font-normal focus-within:ring-[#1E6F9F] focus-within:outline-none"
          type="text"
          placeholder={props.plascerholder}
          // value={props.value}
          onChange={props.onChange}
        />
      </div>
    </div>
  );
};

const ColorBtns = () => {
  return (
    <div className="flex flex-col gap-[14px]">
      <label className="text-[#4EA8DE] font-bold text-[14px] leading-[17px]">
        {" "}
        Color
      </label>
      <div className="flex gap-[16px]">
        {colors.map(
          (color) => (
            console.log(color),
            (
              <button
                key={color.name}
                className={`w-[52px] h-[52px] rounded-full bg-[${color.color}]`}
              ></button>
            )
          )
        )}
      </div>
    </div>
  );
};

export default CreateTask;
