import { Input } from "~/components/ui/input";
import { X } from "lucide-react";
import { type HTMLAttributes } from "react";
import { cn } from "~/lib/utils";

interface SearchBarProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  onInputChange: (value: string) => void;
}

const SearchBar = ({ value, onInputChange, className }: SearchBarProps) => {
  return (
    <div className={cn(className, "relative")}>
      <Input
        className="pr-8 font-mono"
        type="text"
        placeholder="Type your keywords..."
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
      />
      {value && (
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-2"
          onClick={() => onInputChange("")}
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
