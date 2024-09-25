import { type SortMode } from "~/hooks/useBookSearch";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { type SelectTriggerProps } from "@radix-ui/react-select";
import { cn } from "~/lib/utils";
import { useState } from "react";
import { GeistMono } from "geist/font/mono";

interface SortSelectProps extends SelectTriggerProps {
  value: SortMode;
  onSortModeChange: (value: SortMode) => void;
}

const SortSelect = ({
  value,
  onSortModeChange,
  className,
}: SortSelectProps) => {
  const [open, setOpen] = useState(false);
  const [showAnimation, setShowAnimation] = useState(value !== "newest");

  const handleValueChange = (v: SortMode) => {
    onSortModeChange(v);
    if (v === "newest") {
      setShowAnimation(false);
    }
  };

  return (
    <Select
      open={open}
      onOpenChange={setOpen}
      value={value}
      onValueChange={(v) => handleValueChange(v as SortMode)}
    >
      <SelectTrigger
        className={cn(className, "group relative w-[160px] font-mono")}
      >
        <SelectValue placeholder="Select a sorting mode" />
        {showAnimation && !open && value !== "newest" && (
          <>
            <div className="absolute right-0 top-0 -mr-1 -mt-1 h-2 w-2 animate-ping rounded-full bg-blue-400 group-focus:hidden" />
            <div className="absolute right-0 top-0 -mr-1 -mt-1 h-2 w-2 rounded-full bg-blue-400 group-focus:hidden" />
          </>
        )}
      </SelectTrigger>
      <SelectContent
        className={GeistMono.className}
        // Fix for mobile tap, triggering onClick for element behind the select
        // https://github.com/shadcn-ui/ui/issues/486
        ref={(ref) => {
          if (!ref) return;
          ref.ontouchstart = (e) => {
            e.preventDefault();
          };
        }}
      >
        <SelectGroup>
          <SelectLabel className="font-extrabold">Sort by</SelectLabel>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="newest">
            <div className="flex">
              Newest
              {showAnimation && open && value !== "newest" && (
                <div className="relative ml-2 flex items-center">
                  <div className="absolute h-2 w-2 animate-ping rounded-full bg-blue-400" />
                  <div className="absolute h-2 w-2 rounded-full bg-blue-400" />
                </div>
              )}
            </div>
          </SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="alphabetical">Alphabetical</SelectItem>
          <SelectItem value="color">Color</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortSelect;
