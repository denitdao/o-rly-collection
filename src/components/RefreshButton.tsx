import React from "react";
import { Button, ButtonProps } from "~/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { cn } from "~/lib/utils";

interface RefreshButtonProps extends ButtonProps {
  onRefresh: () => void;
}

const RefreshButton = ({ onRefresh, className }: RefreshButtonProps) => {
  return (
    <Button
      onClick={onRefresh}
      variant="outline"
      className={cn(className, "focus:ring-blue-400")}
      size="icon"
    >
      <RefreshCcw className="h-4 w-4" />
    </Button>
  );
};

export default RefreshButton;
