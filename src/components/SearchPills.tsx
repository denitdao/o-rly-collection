import React from "react";
import { Button, ButtonProps } from "~/components/ui/button";
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
  const colors = ["red", "blue", "green", "yellow", "purple", "pink", "orange"];

  return (
    <>
      {keywords.map((keyword, index) => (
        <Button
          key={index}
          onClick={() => onKeywordClick(keyword)}
          variant="outline"
          color={colors[Math.floor(Math.random() * colors.length)]}
          className={cn(className, "font-mono focus:ring-blue-400")}
        >
          {keyword}
        </Button>
      ))}
    </>
  );
};

export default SearchPills;
