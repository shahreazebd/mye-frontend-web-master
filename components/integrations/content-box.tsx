"use client";

import React from "react";
import Image from "next/image";

// import Link from "next/link";

function ContentBox({
  logo,
  title,
}: // location,
{
  logo: string;
  title: string;
  location: string;
}) {
  return (
    <div className="rounded-[8px] border border-gray-200 p-7">
      <div className="mx-auto flex size-20 items-center">
        <Image
          src={logo}
          alt="company-logo"
          width={70}
          height={80}
          className="mx-auto size-20"
        />
      </div>
      <h6 className="mb-2 mt-4 text-center text-[18px]">{title}</h6>
      {/* <p className="text-sm text-[#86939E]">
        {location !== "" ? (
          <Link href={`/integrations/${location}`}>More info</Link>
        ) : (
          "Coming soon"
        )}
      </p> */}
    </div>
  );
}

export default ContentBox;
