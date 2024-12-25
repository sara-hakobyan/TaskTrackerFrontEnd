import { MouseEventHandler } from "react";
import { FiPlusCircle } from "react-icons/fi";

const ActionBtn = ({
  onClick,
  btnName,
  icon,
}: {
  onClick: MouseEventHandler<HTMLButtonElement>;
  btnName: string;
  icon?: JSX.Element;
}) => {
  return (
    <button
      className="w-full bg-[#1E6F9F] p-[16px] rounded-[8px] flex items-center justify-center gap-[8px] font-bold"
      onClick={onClick}
    >
      <span className=" text-[14px] leading-[20px] text-[#F2F2F2]">
        {btnName}
      </span>{" "}
      {icon}
    </button>
  );
};

export { ActionBtn };
