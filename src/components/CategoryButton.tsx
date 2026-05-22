import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CategoryButtonProps {
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const CategoryButton = ({
  icon: Icon,
  label,
  isActive = false,
  onClick,
}: CategoryButtonProps) => {
  return (
    <Button
      variant="category"
      onClick={onClick}
      className={`flex flex-col items-center gap-2 h-auto py-4 px-6 min-w-[100px] ${
        isActive
          ? "border-primary text-primary bg-primary/5"
          : ""
      }`}
    >
      <Icon className="h-6 w-6" />
      <span className="text-xs font-medium">{label}</span>
    </Button>
  );
};

export default CategoryButton;
