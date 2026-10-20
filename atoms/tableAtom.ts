import { useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const selectedTableRowsAtom = atomWithStorage<any[]>("selectedTableRows", []);

export function useSelectedTableRowsAtom() {
  const [selectedTableRows, setSelectedTableRows] = useAtom(selectedTableRowsAtom);

  return { selectedTableRows, setSelectedTableRows };
}
