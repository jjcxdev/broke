interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
}

export default function MenuItem(props: MenuItemProps) {
  return (
    <div className="flex flex-row items-center gap-2">
      <div className="text-2xl">{props.icon}</div>
      <div>{props.label}</div>
    </div>
  );
}
