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

const SortSelect = ({
  value,
  onChange,
}: {
  value: SortMode;
  onChange: (value: SortMode) => void;
}) => {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as SortMode)}>
      <SelectTrigger className="w-[160px] font-mono">
        <SelectValue placeholder="Select a sorting mode" />
      </SelectTrigger>
      <SelectContent className="font-mono">
        <SelectGroup>
          <SelectLabel>Sorting Modes</SelectLabel>
          <SelectItem value="default">Default</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
          <SelectItem value="alphabetical">Alphabetical</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SortSelect;
