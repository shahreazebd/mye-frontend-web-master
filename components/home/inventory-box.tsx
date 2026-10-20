import React from "react";

type TProps = {
  index: number;
  title: string;
  description: string;
};

export default function InventoryBox({ index, title, description }: TProps) {
  return (
    <div className="rounded-[10px] bg-white px-4 pb-5 pt-2">
      <p className="text-xl font-bold text-[#505D68]">0{index}</p>
      <h5 className="text-xl text-[#505D68] lg:text-2xl">{title}</h5>
      <p className="mr-10 mt-2 text-base text-[#A1AEB7] ">{description}</p>
    </div>
  );
}
