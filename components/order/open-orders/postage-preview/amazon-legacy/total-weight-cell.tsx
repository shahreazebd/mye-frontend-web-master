import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { usePostagePreviewAtom } from "@/atoms/postageAtom";
import { MappedOpenOrder } from "@/schema/open-order";
import { CellContext } from "@tanstack/react-table";

import { InputWithLevel } from "../input-with-level";

// function gramsToPoundsOunces(grams: number) {
//   const pounds = grams * 0.00220462;
//   const wholePounds = Math.floor(pounds);
//   const ounces = (pounds - wholePounds) * 16;
//   return { lb: wholePounds, oz: ounces.toFixed(3) };
// }

// function gramsToKilogramsGrams(grams: number) {
//   const kilograms = Math.floor(grams / 1000);
//   const remainingGrams = grams % 1000;
//   return { kg: kilograms, g: remainingGrams };
// }

// function poundsAndOuncesToGrams(lb: number, oz: number) {
//   // If pounds is 0, just convert ounces to grams
//   const totalPoundsInGrams = lb ? lb * 453.59237 : 0;
//   const totalOuncesInGrams = oz ? oz * 28.3495 : 0;
//   return Math.ceil(totalPoundsInGrams + totalOuncesInGrams);
// }

// function kilogramsAndGramsToGrams(kg: number, g: number) {
//   // If kilograms is 0, just return grams
//   const totalKilogramsInGrams = kg ? kg * 1000 : 0;
//   return Math.ceil(totalKilogramsInGrams + g);
// }

function lbAndOzToLbAndOz(lb: number, oz: number) {
  let newLb = lb;
  let newOz = oz;

  if (oz >= 16) {
    newLb = Math?.floor(oz / 16) + lb;
    newOz = oz % 16;
  }

  return { lb: newLb, oz: newOz };
}

function kgAndGmToKgAndGm(kg: number, gm: number) {
  let newKg = kg;
  let newGm = gm;

  if (gm >= 1000) {
    newKg = Math?.floor(gm / 1000) + kg;
    newGm = gm % 1000;
  }

  return { kg: newKg, gm: newGm };
}

type Props = { cell: CellContext<MappedOpenOrder, unknown> };

export function TotalWeightCell({ cell }: Props) {
  const data = cell?.row?.original;

  const searchParams = useSearchParams();
  const { handlePostagePreviewInfo } = usePostagePreviewAtom();
  const { setOpenOrdersWithStorage } = useOpenOrderAtomWithStorage();
  const [weightKg, setWeightKg] = useState({ kg: data?.kg, gm: data?.gm });
  const [weightLb, setWeightLb] = useState({ lb: data?.lb, oz: data?.oz });

  useEffect(() => {
    setWeightKg({ kg: data?.kg, gm: data?.gm });
  }, [data?.kg, data?.gm]);

  useEffect(() => {
    setWeightLb({ lb: data?.lb, oz: data?.oz });
  }, [data?.lb, data?.oz]);

  const country = searchParams.get("country") || "";

  const handelKgChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWeightKg((prev) => ({ ...prev, [name]: value }));
  };

  const handelLbChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setWeightLb((prev) => ({ ...prev, [name]: value }));
  };

  const handleKgBlur = () => {
    setOpenOrdersWithStorage((prev) => {
      const updatedOrders = prev.map((row) => {
        if (row?.id === data?.id) {
          const { kg, gm } = kgAndGmToKgAndGm(Number(weightKg?.kg), Number(weightKg?.gm));

          row.kg = kg;
          row.gm = gm;

          setWeightKg((prev) => ({ ...prev, kg, gm }));
          handlePostagePreviewInfo({ lastUpdatePostage: row });
        }

        return row;
      });
      return updatedOrders as MappedOpenOrder[];
    });
  };

  const handelLbBlur = () => {
    setOpenOrdersWithStorage((prev) => {
      const updatedOrders = prev?.map((row) => {
        if (row?.id === data?.id) {
          const { lb, oz } = lbAndOzToLbAndOz(Number(weightLb.lb), Number(weightLb.oz));

          row.lb = lb;
          row.oz = oz;

          setWeightLb((prev) => ({ ...prev, lb, oz }));
          handlePostagePreviewInfo({ lastUpdatePostage: row });
        }

        return row;
      });
      return updatedOrders as MappedOpenOrder[];
    });
  };

  const handelKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <section>
      {country === "united states of america" ? (
        <section className="flex gap-x-2">
          <InputWithLevel
            label="LB"
            name="lb"
            value={weightLb?.lb}
            onBlur={handelLbBlur}
            onChange={handelLbChange}
            onKeyDown={handelKeyDown}
          />
          <InputWithLevel
            label="OZ"
            name="oz"
            value={weightLb?.oz}
            onBlur={handelLbBlur}
            onChange={handelLbChange}
            onKeyDown={handelKeyDown}
            // className="min-w-14 !max-w-20"
          />
        </section>
      ) : (
        <section className="flex gap-x-2">
          <InputWithLevel
            label="KG"
            name="kg"
            value={weightKg?.kg}
            onBlur={handleKgBlur}
            onChange={handelKgChange}
            onKeyDown={handelKeyDown}
          />
          <InputWithLevel
            label="G"
            name="gm"
            value={weightKg?.gm}
            onBlur={handleKgBlur}
            onChange={handelKgChange}
            onKeyDown={handelKeyDown}
          />
        </section>
      )}
    </section>
  );
}
