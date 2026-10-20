import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { usePostagePreviewAtom } from "@/atoms/postageAtom";
import { MappedOpenOrder } from "@/schema/open-order";
import { kgAndGmToKgAndGm, lbAndOzToLbAndOz } from "@/utils/postage";

import { InputWithLevel } from "../input-with-level";

export function AmazonTotalWeightCell({ data }: { data: MappedOpenOrder }) {
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
      {country === "united states of america" || country === "bangladesh" ? (
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
