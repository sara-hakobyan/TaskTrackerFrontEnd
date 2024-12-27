import React from "react";

interface IconBtnProps {
  icon: JSX.Element;
  onClick: () => void;
}
const IconBtn: React.FC<IconBtnProps> = ({ icon, onClick }) => {
  return <button onClick={onClick}>{icon}</button>;
};

export { IconBtn };
