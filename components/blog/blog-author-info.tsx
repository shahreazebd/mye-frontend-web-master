"use client";

import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import dayjs from "dayjs";

type Props = {
  author: string;
  createdAt: string;
  className?: string;
};

export function BlogAuthorInfo(props: Props) {
  return (
    <section className={`flex items-center gap-3 ${props?.className}`}>
      <Avatar className="size-10">
        <AvatarImage
          src={`https://api.dicebear.com/6.x/initials/svg?seed=${props?.author}&backgroundColor=FED7AA&size=100&radius=50&textColor=0C273C&fontWeight=900`}
        />
      </Avatar>
      <div>
        <p className="text-sm font-semibold">{props?.author}</p>
        <p className="text-sm font-normal">
          {dayjs(props?.createdAt).format("MMMM DD, YYYY")}
        </p>
      </div>
    </section>
  );
}
