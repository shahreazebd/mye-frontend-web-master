import Image from "next/image";

import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  title?: string;
};

export function NoDataPlaceholder({ className, title }: Props) {
  return (
    <div
      className={cn(
        "mx-auto flex h-[270px] flex-col items-center justify-center",
        className
      )}
    >
      <Image src="/images/no-data.png" alt="no-data" width={150} height={150} priority />
      {title ? (
        <p className="mt-2 text-sm text-[#8ba7b2]">{title}</p>
      ) : (
        <p className="mt-2 text-sm text-[#8ba7b2]">Not found</p>
      )}
    </div>
  );
}
