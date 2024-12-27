import React, { useCallback } from "react";

interface ICustomForm {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  errMsg?: string;
}

const CustomForm: React.FC<ICustomForm> = ({
  placeholder,
  value,
  onChange,
  errMsg,
}) => {
  const inputHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const strValue = e.target.value;
      onChange(strValue);
    },
    [onChange]
  );

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex flex-col gap-[14px]">
        <label className="text-[#4EA8DE] font-bold text-[14px] leading-[17px]">
          Title
        </label>

        <input
          className="min-h-[52px] bg-[#333333] p-[16px] rounded-[8px] placeholder-[#F2F2F2] placeholder:opacity-40 text-[14px] text-[#F2F2F2] leading-[20px] font-normal focus-within:ring-[#1E6F9F] focus-within:outline-none"
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={inputHandler}
        />
        <p className="text-[#FF0000] text-[12px]">{errMsg}</p>
      </div>
    </div>
  );
};

export { CustomForm };
