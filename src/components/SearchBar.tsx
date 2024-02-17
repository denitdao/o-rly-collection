import { Input } from "~/components/ui/input";
import { X } from "lucide-react";

const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="relative">
      <Input
        className="pr-8 font-mono focus:ring-blue-400"
        type="text"
        placeholder="Type your keywords..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-2"
          onClick={() => onChange("")}
        >
          <X />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
