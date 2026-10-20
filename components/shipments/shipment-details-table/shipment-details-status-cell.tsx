import { usePostageAtom } from "@/atoms/postageAtom";
import type { CellContext } from "@tanstack/react-table";
import { Eye } from "lucide-react";

import { Order, type AmazonError } from "@/types/shipments";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const STATUS_BG_COLORS: Record<string, string> = {
  SUCCESS: "bg-emerald-500",
  FAILED: "bg-red-500",
};

function getFailureErrors(failureReasons: unknown): any[] {
  const reasons = failureReasons as any;
  if (reasons?.errors) {
    return reasons.errors;
  }
  if (reasons?.items) {
    return [reasons];
  }
  return [];
}

export function ShipmentDetailsStatusCell(props: CellContext<Order, unknown>) {
  const status = props.row.original.status;

  const failureReasons = props.row.original.failureReasons;
  const { postageInfo } = usePostageAtom();

  const carrier = postageInfo.selectedPostage.carrier?.type?.toLowerCase();

  if (!status) return null;

  const statusBgColor = STATUS_BG_COLORS[status] ?? "bg-gray-500";
  const errors = getFailureErrors(failureReasons);

  function renderErrorContent(error: any) {
    switch (carrier) {
      case "amazon":
        return (
          <div className="ml-2 border-l-2 border-red-200 pl-2">
            <p className="text-sm font-semibold text-red-600">Amazon Error</p>
            {"code" in error && (
              <ErrorItem label="Code" value={(error as AmazonError).code} />
            )}
            {"details" in error && (
              <ErrorItem label="Details" value={(error as AmazonError).details} />
            )}
          </div>
        );

      case "evri":
        return (
          <div className="ml-2 border-l-2 border-red-200 pl-2">
            <p className="text-sm font-semibold text-red-600">Evri Error</p>
            {"error" in error && error.error && (
              <ErrorItem label="Error" value={error.error} />
            )}
            {"error_description" in error && error.error_description && (
              <ErrorItem label="Description" value={error.error_description} />
            )}
            {"error_paths" in error &&
              Array.isArray(error.error_paths) &&
              error.error_paths.length > 0 && (
                <ErrorItem label="Path" value={error.error_paths[0]} />
              )}
          </div>
        );

      case "royal_mail":
        return (
          <div className="ml-2 border-l-2 border-red-200 pl-2">
            <p className="text-sm font-semibold text-red-600">Royal Mail Error</p>
            {"errorCode" in error && (
              <ErrorItem label="Error Code" value={error.errorCode} />
            )}
            {Array.isArray(error.fields) &&
              error.fields.map((f: any, i: number) => (
                <div key={i} className="mt-2 space-y-1">
                  <div>
                    <Label>Field</Label>
                    <p className="text-sm text-gray-500">{f.fieldName}</p>
                  </div>
                </div>
              ))}
            {"errorMessage" in error && (
              <ErrorItem label="Message" value={error.errorMessage} />
            )}
          </div>
        );

      case "dhl":
        return (
          <>
            {"items" in error &&
              Array.isArray(error.items) &&
              error.items.map((item: any, i: number) => (
                <div key={i} className="space-y-2">
                  <p className="text-sm font-semibold text-red-600">
                    {item.sstatus?.title || "Bad Request"} ({item.sstatus?.status})
                  </p>
                  <div className="ml-2 border-l-2 border-red-200 pl-2">
                    {Array.isArray(item.validationMessages) &&
                      item.validationMessages.map((msg: any, j: number) => (
                        <div key={j}>
                          {msg.property && (
                            <ErrorItem label="Property" value={msg.property} />
                          )}
                          <ErrorItem
                            label={msg.validationState}
                            value={msg.validationMessage}
                          />
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </>
        );

      default:
        return (
          <div className="ml-2 border-l-2 border-red-200 pl-2">
            <p className="text-sm font-semibold text-red-600">Error</p>
            <ErrorItem
              label="Details"
              value={JSON.stringify(error, null, 2).slice(0, 200)}
            />
          </div>
        );
    }
  }

  return (
    <section className="flex items-center gap-4">
      <Badge
        variant="outline"
        className={cn("rounded-sm border-none font-bold text-white", statusBgColor)}
      >
        {props.row.original.status}
      </Badge>

      {status === "FAILED" && failureReasons && (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-8 px-2" size="sm">
              <Eye className="size-4 text-gray-400" />
            </Button>
          </PopoverTrigger>

          <PopoverContent className="max-h-[400px] w-[400px] space-y-4 overflow-y-auto">
            {errors.map((error: any, idx: number) => (
              <div key={idx} className="border-b pb-2 last:border-0">
                {renderErrorContent(error)}
              </div>
            ))}
          </PopoverContent>
        </Popover>
      )}
    </section>
  );
}

function ErrorItem({ label, value }: Readonly<{ label: string; value: any }>) {
  return (
    <section className="mt-2">
      <Label>{label}</Label>
      <p className="break-words text-sm text-gray-500">{String(value)}</p>
    </section>
  );
}
