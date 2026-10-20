import { usePostagePreviewAtom } from "@/atoms/postageAtom";
import { MappedOpenOrder } from "@/schema/open-order";
import { HeaderContext } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/core/data-table/data-table-column-header";

interface Props {
  header: HeaderContext<MappedOpenOrder, unknown>;
  title: "Weight" | "Dimensions";
}

export function WeightAndDimensionsHeader({ header, title }: Props) {
  const { postagePreviewInfo } = usePostagePreviewAtom();

  let heading = "";

  if (title === "Weight") {
    heading = `Total Weight (${postagePreviewInfo?.filters?.weight})`;
  } else {
    heading = `Dimensions (${postagePreviewInfo?.filters?.dimensions})`;
  }

  return <DataTableColumnHeader column={header?.column} title={heading} />;
}
