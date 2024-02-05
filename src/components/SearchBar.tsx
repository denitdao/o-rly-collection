import { MdOutlineClear } from "react-icons/md";

const SearchBar = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <div className="relative mb-2 w-full max-w-lg">
      <input
        className="w-full rounded-md border py-2 pl-4 pr-8 font-mono"
        type="text"
        placeholder="Type your keywords..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-xl"
          onClick={() => onChange("")}
        >
          <MdOutlineClear />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
