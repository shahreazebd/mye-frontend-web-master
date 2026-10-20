import { useSearchParams } from "next/navigation";

export default function useGetSearchParams() {
  return Object.fromEntries(useSearchParams().entries());
}
