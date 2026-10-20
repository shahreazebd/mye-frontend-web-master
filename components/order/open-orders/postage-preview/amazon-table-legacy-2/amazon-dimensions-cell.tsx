import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { usePostagePreviewAtom } from "@/atoms/postageAtom";
import { MappedOpenOrder } from "@/schema/open-order";
import { ChevronDown } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { InputWithLevel } from "../input-with-level";

interface Props {
  id: number;
  dimensions: string;
  inches: string;
}

export function AmazonDimensionsCell({ id, dimensions, inches }: Props) {
  const [hCM, wCM, lCM] = dimensions?.split(", ") || [0, 0, 0];
  const [hI, wI, lI] = inches?.split(", ") || [0, 0, 0];

  const searchParams = useSearchParams();
  const { handlePostagePreviewInfo } = usePostagePreviewAtom();
  const { setOpenOrdersWithStorage } = useOpenOrderAtomWithStorage();
  const [dimensionsCM, setDimensionsCM] = useState({ h: hCM, w: wCM, l: lCM });
  const [dimensionsInches, setDimensionsInches] = useState({ h: hI, w: wI, l: lI });

  useEffect(() => {
    setDimensionsCM({ h: hCM, w: wCM, l: lCM });
    setDimensionsInches({ h: hI, w: wI, l: lI });
  }, [id, dimensions, inches]);

  const country = searchParams.get("country") || "";

  const handleCMChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDimensionsCM((prev) => ({ ...prev, [name]: value }));
  };

  const handleInchesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDimensionsInches((prev) => ({ ...prev, [name]: value }));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  const handleCMBlur = () => {
    setOpenOrdersWithStorage((prev) => {
      const updatedOrders = prev?.map((row) => {
        if (row?.id === id) {
          row.dimensions = `${dimensionsCM?.h}, ${dimensionsCM?.w}, ${dimensionsCM?.l}`;

          handlePostagePreviewInfo({ lastUpdatePostage: row });
        }

        return row;
      });
      return updatedOrders as MappedOpenOrder[];
    });
  };

  const handleInchesBlur = () => {
    setOpenOrdersWithStorage((prev) => {
      const updatedOrders = prev?.map((row) => {
        if (row?.id === id) {
          row.dimensionsInches = `${dimensionsInches?.h}, ${dimensionsInches?.w}, ${dimensionsInches?.l}`;

          handlePostagePreviewInfo({ lastUpdatePostage: row });
        }

        return row;
      });
      return updatedOrders as MappedOpenOrder[];
    });
  };

  let text = "Custom Package ";

  if (["united states of america", "bangladesh"]?.includes(country)) {
    text += `${dimensionsInches?.l} x ${dimensionsInches?.w} x ${dimensionsInches?.h} (IN)`;
  } else {
    text += `${dimensionsCM?.l} x ${dimensionsCM?.w} x ${dimensionsCM?.h} (CM)`;
  }

  return (
    <section>
      <Popover
        onOpenChange={(value) => {
          if (!value) {
            if (country === "united states of america") {
              handleInchesBlur();
            } else {
              handleCMBlur();
            }
          }
        }}
      >
        <PopoverTrigger asChild>
          <span className="mt-2 flex w-fit cursor-pointer items-center gap-2 rounded-md border border-gray-300 bg-gray-100 px-2 py-1.5 text-xs">
            {text}
            <ChevronDown className="size-3.5" />
          </span>
        </PopoverTrigger>
        <PopoverContent>
          {["united states of america", "bangladesh"]?.includes(country) ? (
            <div className="flex gap-x-2">
              <InputWithLevel
                label="L"
                name="l"
                value={dimensionsInches?.l}
                onChange={handleInchesChange}
                onKeyDown={handleKeyDown}
              />

              <InputWithLevel
                label="W"
                name="w"
                value={dimensionsInches?.w}
                onChange={handleInchesChange}
                onKeyDown={handleKeyDown}
              />

              <InputWithLevel
                label="H"
                name="h"
                value={dimensionsInches?.h}
                onChange={handleInchesChange}
                onKeyDown={handleKeyDown}
              />
            </div>
          ) : (
            <div className="flex gap-x-2">
              <InputWithLevel
                label="L"
                name="l"
                value={dimensionsCM?.l}
                onChange={handleCMChange}
                onKeyDown={handleKeyDown}
                // onBlur={handleCMBlur}
              />

              <InputWithLevel
                label="W"
                name="w"
                value={dimensionsCM?.w}
                onChange={handleCMChange}
                onKeyDown={handleKeyDown}
                // onBlur={handleCMBlur}
              />

              <InputWithLevel
                label="H"
                name="h"
                value={dimensionsCM?.h}
                onChange={handleCMChange}
                onKeyDown={handleKeyDown}
                // onBlur={handleCMBlur}
              />
            </div>
          )}
        </PopoverContent>
      </Popover>
    </section>
  );
}
