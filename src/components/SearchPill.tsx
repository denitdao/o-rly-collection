import React from "react";
import { Button } from "~/components/ui/button";
import { RefreshCcw } from "lucide-react";

type SearchPillProps = {
  keywords: string[];
  onKeywordClick: (keyword: string) => void;
  onRefresh: () => void;
};

const SearchPill = ({
  keywords,
  onKeywordClick,
  onRefresh,
}: SearchPillProps) => {
  return (
    <div className="flex space-x-2">
      {keywords.map((keyword, index) => (
        <Button
          key={index}
          onClick={() => onKeywordClick(keyword)}
          variant="outline"
          className="focus:ring-blue-400"
        >
          {keyword}
        </Button>
      ))}
      <Button
        onClick={onRefresh}
        variant="secondary"
        className="focus:ring-blue-400"
      >
        <RefreshCcw className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SearchPill;
