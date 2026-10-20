import { Star } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  name: string;
  brand: string;
  description: string;
  rating: number;
  image: string;
  designation: string;
};

export default function SingleTestimonial({
  name,
  designation,
  brand,
  description,
  rating,
  image,
}: Props) {
  return (
    <div className="rounded-lg bg-[#FFEBEB] px-7 pb-5 pt-4 md:mx-8 dark:bg-white">
      <div className="mb-4 flex justify-between">
        <Avatar className="-mt-12 size-[70px]">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name}</AvatarFallback>
        </Avatar>

        <div className="flex gap-x-1">
          {[...new Array(rating)].map((e, idx) => (
            <Star key={idx} fill="blue" color="blue" size="20" />
          ))}
        </div>
      </div>
      <p className="my-6 text-base leading-[30px] md:text-[20px] dark:text-gray-800">
        {description}
      </p>
      <div className="flex items-center justify-between">
        <div>
          <h5 className="text-sm dark:text-gray-600">{name}</h5>
          <p className="text-[10px] lg:-mt-2 dark:text-gray-500">{designation}</p>
        </div>
        <p className="text-xs dark:text-gray-500">{brand}</p>
      </div>
    </div>
  );
}
