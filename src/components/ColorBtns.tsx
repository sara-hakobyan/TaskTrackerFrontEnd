import React from "react";
import { colors } from "../constants";
import clsx from "clsx";

interface ColorBtnsProps {
  defaultColor?: string;
  updateColor: (color: string) => void;
}

const ColorBtns: React.FC<ColorBtnsProps> = ({ defaultColor, updateColor }) => {
  return (
    <div className="flex flex-col gap-[14px]">
      <label className="text-[#4EA8DE] font-bold text-[14px] leading-[17px] ">
        Color
      </label>
      <form className="flex gap-[16px] flex-wrap">
        {colors.map((color) => (
          <button
            key={color.name}
            type="button"
            aria-label={`Select ${color.name} color`}
            className={clsx(
              `w-[25px] h-[25px] md:w-[42px]  lg:w-[52px] md:h-[42px] lg:h-[52px] rounded-full bg-[${
                color.color
              }] ${
                defaultColor === color.name.toLowerCase()
                  ? "border-2 border-[#FFFFFF]"
                  : ""
              }`
            )}
            onClick={() => updateColor(color.name.toLowerCase())}
          ></button>
        ))}
      </form>
    </div>
  );
};

export { ColorBtns };
