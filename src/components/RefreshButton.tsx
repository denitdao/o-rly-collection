import React from "react";
import { Button, type ButtonProps } from "~/components/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "~/lib/utils";

interface RefreshButtonProps extends ButtonProps {
  onRefresh: () => void;
}

const RefreshButton = ({ onRefresh, className }: RefreshButtonProps) => {
  return (
    <Button
      onClick={onRefresh}
      variant="outline"
      className={cn(
        className,
        "bg-white hover:border-blue-300 focus:ring-blue-400",
      )}
      size="icon"
    >
      <RefreshCw className="h-4 w-4" />
    </Button>
  );
};

export default RefreshButton;
