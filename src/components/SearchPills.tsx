import React from "react";
import { Button, type ButtonProps } from "~/components/ui/button";
import { cn } from "~/lib/utils";

interface SearchPillsProps extends ButtonProps {
  keywords: string[];
  onKeywordClick: (keyword: string) => void;
}

const SearchPills = ({
  keywords,
  onKeywordClick,
  className,
}: SearchPillsProps) => {
  return (
    <>
      {keywords.map((keyword, index) => (
        <Button
          key={index}
          onClick={() => onKeywordClick(keyword)}
          variant="outline"
          className={cn(className, "font-mono focus:ring-blue-400")}
        >
          {keyword}
        </Button>
      ))}
    </>
  );
};

export default SearchPills;
