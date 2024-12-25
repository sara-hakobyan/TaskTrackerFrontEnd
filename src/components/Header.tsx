import Image from "next/image";
import rocketPng from "../../public/assets/rocket.png";

function Header() {
  return (
    <div className="w-full bg-[#0D0D0D] min-h-[200px] flex  items-center justify-center p-4">
      <div className="flex gap-[12px]">
        <Image
          src={rocketPng}
          alt="Logo"
          className="w-[22px] h-[36px] self-end"
        />

        <h1 className="text-[40px] leading-[48px] font-black  text-[#4EA8DE]">
          Todo <span className="text-[#5E60CE]">App</span>
        </h1>
      </div>
    </div>
  );
}

export default Header;
