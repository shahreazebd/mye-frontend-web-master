import type { CellContext } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import type { PostageOrder } from "@/types/postage";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { Label } from "../../ui/label";

export function PostageDetailsStatusCell(props: CellContext<PostageOrder, unknown>) {
  return (
    <section className="flex items-center gap-4">
      {props.row.getValue("status") === "SUCCESS" ? (
        <Badge
          variant="outline"
          className="rounded-sm border-none bg-emerald-500 font-bold text-white"
        >
          {props.row.getValue("status")}
        </Badge>
      ) : (
        <Badge
          variant="outline"
          className="rounded-sm border-none bg-red-500 font-bold text-white"
        >
          {props.row.getValue("status")}
        </Badge>
      )}

      {props.row.getValue("status") === "FAILED" &&
        props.row.original.errors.length > 0 && (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="h-8 px-2" size="sm">
                <Eye className="size-4 text-gray-400" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[400px]">
              {props.row.original.errors?.map((e) => {
                return (
                  <div key={e.error}>
                    {e.error && (
                      <section>
                        <Label>Error</Label>
                        <p className="mb-4 text-sm font-normal text-gray-500">
                          {e.error}
                        </p>
                      </section>
                    )}

                    {e.error_description && (
                      <>
                        <Label className="mt-5">Description</Label>
                        <p className="text-sm font-normal text-gray-500">
                          {e.error_description}
                        </p>
                      </>
                    )}

                    {e.error_paths && (
                      <section className="mt-4">
                        <Label className="mt-5">Path</Label>
                        <p className="text-sm font-normal text-gray-500">
                          {e.error_paths?.[0]}
                        </p>
                      </section>
                    )}
                  </div>
                );
              })}
            </PopoverContent>
          </Popover>
        )}
    </section>
  );
}
