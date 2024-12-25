const IconBtn = ({
  icon,
  onClick,
}: {
  icon: JSX.Element;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return <button onClick={onClick}>{icon}</button>;
};

export { IconBtn };
