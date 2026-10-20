import { useState } from "react";

export default function useSkuCopy() {
  const [isClicked, setIsClicked] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsClicked(true);

    setTimeout(() => {
      setIsClicked(false);
    }, 2000);
  };

  return { isClicked, handleCopy };
}
