import { Skeleton } from "@/components/ui/skeleton";

export default function SkeletonLoader({ count = 5 }: { count?: number }) {
  const skeleton = new Array(count).fill(0);

  return (
    <div className="my-5">
      {skeleton.map((_, index) => (
        <Skeleton key={index} className="mt-4 h-[20px] w-full rounded-full" />
      ))}
    </div>
  );
}
