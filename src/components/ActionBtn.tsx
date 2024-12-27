import React, { MouseEventHandler } from "react";
import { FiPlusCircle } from "react-icons/fi";

interface ActionBtnProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
  btnName: string;
  icon?: JSX.Element;
  isDisabled?: boolean;
}

const ActionBtn: React.FC<ActionBtnProps> = React.memo(
  ({ onClick, btnName, icon, isDisabled }) => {
    return (
      <button
        disabled={isDisabled}
        className="w-full bg-[#1E6F9F] p-[16px] rounded-[8px] flex items-center justify-center gap-[8px] font-bold"
        onClick={onClick}
        aria-label={btnName}
      >
        <span className=" text-[14px] leading-[20px] text-[#F2F2F2]">
          {btnName}
        </span>{" "}
        {icon}
      </button>
    );
  }
);

export { ActionBtn };
