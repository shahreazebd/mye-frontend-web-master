import { useState } from "react";
import { CheckIcon, CopyIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function CopyText({ text, className }: { text: string; className?: string }) {
  const [isClicked, setIsClicked] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 2000);
  };

  return (
    <span className={cn(className)}>
      {isClicked ? (
        <CheckIcon className="size-4 cursor-pointer text-green-600" />
      ) : (
        <CopyIcon
          onClick={(e) => {
            e.stopPropagation();
            handleCopy();
          }}
          className="size-3 cursor-pointer opacity-0 transition-opacity group-hover:opacity-100"
        />
      )}
    </span>
  );
}
