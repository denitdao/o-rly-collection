import React from "react";
import { Button, type ButtonProps } from "~/components/ui/button";
import { cn } from "~/lib/utils";
import { type BookColor } from "~/server/storage/books";

export type PillData = {
  keyword: string;
  colors: BookColor[];
};

interface SearchPillsProps extends ButtonProps {
  activeKeyword: string;
  pillDataArray: PillData[];
  onKeywordClick: (keyword: string) => void;
}

const SearchPills = ({
  activeKeyword,
  pillDataArray,
  onKeywordClick,
  className,
}: SearchPillsProps) => {
  const bgColors = new Map<BookColor, string>([
    ["gray", "bg-gray-50 hover:bg-gray-50"],
    ["red", "bg-red-50 hover:bg-red-50"],
    ["orange", "bg-orange-50 hover:bg-orange-50"],
    ["yellow", "bg-yellow-50 hover:bg-yellow-50"],
    ["lime", "bg-lime-50 hover:bg-lime-50"],
    ["green", "bg-green-50 hover:bg-green-50"],
    ["teal", "bg-teal-50 hover:bg-teal-50"],
    ["cyan", "bg-cyan-50 hover:bg-cyan-50"],
    ["sky", "bg-sky-50 hover:bg-sky-50"],
    ["blue", "bg-blue-50 hover:bg-blue-50"],
    ["indigo", "bg-indigo-50 hover:bg-indigo-50"],
    ["violet", "bg-violet-50 hover:bg-violet-50"],
    ["fuchsia", "bg-fuchsia-50 hover:bg-fuchsia-50"],
    ["pink", "bg-pink-50 hover:bg-pink-50"],
  ]);

  const fromColors = new Map<BookColor, string>([
    ["gray", "from-gray-50"],
    ["red", "from-red-50"],
    ["orange", "from-orange-50"],
    ["yellow", "from-yellow-50"],
    ["lime", "from-lime-50"],
    ["green", "from-green-50"],
    ["teal", "from-teal-50"],
    ["cyan", "from-cyan-50"],
    ["sky", "from-sky-50"],
    ["blue", "from-blue-50"],
    ["indigo", "from-indigo-50"],
    ["violet", "from-violet-50"],
    ["fuchsia", "from-fuchsia-50"],
    ["pink", "from-pink-50"],
  ]);

  const viaColors = new Map<BookColor, string>([
    ["gray", "via-gray-50"],
    ["red", "via-red-50"],
    ["orange", "via-orange-50"],
    ["yellow", "via-yellow-50"],
    ["lime", "via-lime-50"],
    ["green", "via-green-50"],
    ["teal", "via-teal-50"],
    ["cyan", "via-cyan-50"],
    ["sky", "via-sky-50"],
    ["blue", "via-blue-50"],
    ["indigo", "via-indigo-50"],
    ["violet", "via-violet-50"],
    ["fuchsia", "via-fuchsia-50"],
    ["pink", "via-pink-50"],
  ]);

  const toColors = new Map<BookColor, string>([
    ["gray", "to-gray-50"],
    ["red", "to-red-50"],
    ["orange", "to-orange-50"],
    ["yellow", "to-yellow-50"],
    ["lime", "to-lime-50"],
    ["green", "to-green-50"],
    ["teal", "to-teal-50"],
    ["cyan", "to-cyan-50"],
    ["sky", "to-sky-50"],
    ["blue", "to-blue-50"],
    ["indigo", "to-indigo-50"],
    ["violet", "to-violet-50"],
    ["fuchsia", "to-fuchsia-50"],
    ["pink", "to-pink-50"],
  ]);

  const gradient = (colors: BookColor[]) => {
    if (colors.length === 1) {
      return bgColors.get(colors[0]!);
    }
    if (colors.length === 2) {
      return cn(
        "bg-gradient-to-r",
        fromColors.get(colors[0]!),
        toColors.get(colors[1]!),
      );
    }
    if (colors.length === 3) {
      return cn(
        "bg-gradient-to-r",
        fromColors.get(colors[0]!),
        viaColors.get(colors[1]!),
        toColors.get(colors[2]!),
      );
    }
    return bgColors.get("gray");
  };

  return (
    <>
      {pillDataArray.map((pillData, index) => (
        <Button
          key={index}
          onClick={() => onKeywordClick(pillData.keyword)}
          variant="outline"
          className={cn(
            className,
            "font-mono hover:border-primary",
            pillData.keyword === activeKeyword.trim().toLowerCase() &&
              "border-blue-300",
            gradient(pillData.colors),
          )}
        >
          {pillData.keyword}
        </Button>
      ))}
    </>
  );
};

export default SearchPills;
