import { CheckSquare, Copy } from "lucide-react";

import { cn } from "@/lib/utils";
// import Image from "next/image";

import useSkuCopy from "@/hooks/custom/useSkuCopy";

// import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

interface Props {
  className?: string;
  titleClassName?: string;
  subTitleClassName?: string;
  title: string | number;
  subTitle?: string;
  copy?: string;
  hasAvatar?: string;
  hoverText?: string;
  shouldSplit?: boolean;
}

export function TextTableCell({
  className,
  titleClassName,
  subTitleClassName,
  title,
  subTitle,
  copy,
  hasAvatar,
  shouldSplit,
  hoverText,
}: Props) {
  const { handleCopy, isClicked } = useSkuCopy();
  return (
    <div className={cn(className, hasAvatar, copy && "group")}>
      {shouldSplit ? (
        <div className={cn("relative flex items-end justify-center gap-1", className)}>
          <p className={cn("text-xs", titleClassName)}>{title} </p>
          {subTitle && (
            <p className={cn("text-[11px] leading-4 text-slate-500", subTitleClassName)}>
              {subTitle}
            </p>
          )}
          {copy ? (
            isClicked ? (
              <CheckSquare className="absolute right-0 top-1 size-3 shrink-0 text-green-700 transition ease-in-out" />
            ) : (
              <Copy
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopy(copy);
                }}
                className="absolute right-0 top-1 hidden size-3 shrink-0 animate-pulse cursor-pointer text-orange-500 transition ease-in-out hover:duration-0 group-hover:block"
              />
            )
          ) : (
            ""
          )}
        </div>
      ) : (
        <div>
          {/* {hasAvatar && (
            <HoverCard openDelay={50} closeDelay={0}>
              <HoverCardTrigger>
                <div className="size-8 shrink-0 cursor-zoom-in overflow-hidden rounded-full border border-gray-300 bg-white px-0.5">
                  <Image
                    src={hasAvatar}
                    className="size-full shrink-0"
                    alt="no-image"
                    width={60}
                    height={100}
                  />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className="ml-6">
                <Image
                  src={hasAvatar}
                  className="h-80 w-min shrink-0 rounded-sm border"
                  alt="no-image"
                  width={250}
                  height={320}
                />
              </HoverCardContent>
            </HoverCard>
          )} */}
          <div className={cn(copy && "relative flex w-max items-center gap-x-1 pr-4")}>
            <p
              className={cn("truncate text-xs font-medium", titleClassName)}
              {...(hoverText && { title: hoverText })}
              {...(copy && {
                onClick: (e) => {
                  e.stopPropagation();
                  handleCopy(copy);
                },
                className: cn(
                  "cursor-pointer truncate text-xs font-medium",
                  titleClassName
                ),
              })}
            >
              {title}
            </p>
            {copy ? (
              isClicked ? (
                <CheckSquare className="absolute -right-1 top-0.5 size-3 shrink-0 text-green-700 transition ease-in-out" />
              ) : (
                <Copy
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCopy(copy);
                  }}
                  className="absolute -right-1 top-0.5 hidden size-3 shrink-0 animate-pulse cursor-pointer text-orange-500 transition ease-in-out hover:duration-0 group-hover:block"
                />
              )
            ) : (
              ""
            )}
          </div>
          {subTitle && (
            <p className={cn("text-[11px] leading-5 text-slate-600", subTitleClassName)}>
              {subTitle}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
