"use client";

import Image from "next/image";
import { useRoyalMailParcelSizeAtom } from "@/atoms/carriersAtom";
import { ParcelSize } from "@/schema/royalmail-service";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import CarrierAccountSelect from "../carrier-account-select";

const PARCEL_SIZES = [
  {
    name: "Letter",
    value: "Letter",
    icon: "letter",
    maxWeight: 100,
    cost: 0.75,
    currency: "£",
    unit: {
      weight: "g",
      volume: "cm",
    },
    volume: {
      height: 24,
      width: 16,
      depth: 0.5,
    },
  },
  {
    name: "Large Letter",
    value: "LargeLetter",
    icon: "large-letter",
    maxWeight: 750,
    cost: 1.05,
    currency: "£",
    unit: {
      weight: "g",
      volume: "cm",
    },
    volume: {
      height: 35.3,
      width: 25,
      depth: 2.5,
    },
  },
  {
    name: "Small Parcel",
    value: "SmallParcel",
    icon: "small-parcel",
    maxWeight: 2,
    cost: 2.99,
    currency: "£",
    unit: {
      weight: "kg",
      volume: "cm",
    },
    volume: {
      height: 45,
      width: 35,
      depth: 16,
    },
  },
  {
    name: "Medium Parcel",
    value: "MediumParcel",
    icon: "medium-parcel",
    maxWeight: 20,
    cost: 4.35,
    currency: "£",
    unit: {
      weight: "kg",
      volume: "cm",
    },
    volume: {
      height: 46,
      width: 46,
      depth: 61,
    },
  },
  {
    name: "Tube",
    value: "Tube",
    icon: "tube",
    maxWeight: 20,
    cost: 4.35,
    currency: "£",
    unit: {
      weight: "kg",
      volume: "cm",
    },
    volume: {
      height: 90,
    },
    meta: {
      line1: "Length + twice the diameter must be no more than 104cm",
    },
  },

  {
    name: "Large Parcel",
    value: "Parcel",
    icon: "large-parcel",
    maxWeight: 30,
    cost: 12.12,
    currency: "£",
    unit: {
      weight: "kg",
      volume: "cm",
    },
    volume: {
      height: 150,
    },
    meta: {
      line1: "Length + girth must be no more than 300cm",
      line2: "No one dimension can exceed 150cm",
    },
  },
];

export default function ParcelSizeRadioGroup() {
  const { setRoyalMailParcelSize } = useRoyalMailParcelSizeAtom();

  function sizeChangeHandler(value: ParcelSize) {
    setRoyalMailParcelSize(value);
  }

  return (
    <>
      <section className="mb-4 flex justify-between">
        <h6 className="m-0">UK Letter and parcel sizes</h6>

        <CarrierAccountSelect carrier="CLICKANDDROP" className="w-[400px]" />
      </section>
      <RadioGroup
        defaultValue="letter"
        className="mt-2 grid grid-cols-6 gap-4 "
        onValueChange={sizeChangeHandler}
      >
        {PARCEL_SIZES?.map((size, i) => (
          <Label
            key={i}
            htmlFor={size?.value}
            className="relative h-[300px] rounded-md border-2 border-muted bg-transparent p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-slate-400 [&:has([data-state=checked])]:bg-slate-100"
          >
            <RadioGroupItem
              value={size?.value}
              id={size?.value}
              className="sr-only"
              aria-label={size?.name}
            />
            <section className="flex items-center gap-1.5">
              {size?.name}
              <Image src="/images/icons/right-arrow.svg" width={17} height={17} alt="" />
            </section>
            <section className="mt-2 text-xs font-normal text-slate-600">
              Up to{" "}
              <span className="font-bold">
                {size?.maxWeight}
                {size?.unit.weight}
              </span>{" "}
              From{" "}
              <span className="font-bold">
                {" "}
                {size?.currency}
                {size?.cost}
              </span>
            </section>

            <Image
              src={`/images/carriers/royal-mail/sizes/${size?.icon}.svg`}
              className="mx-auto mt-12"
              alt=""
              height={100}
              width={100}
            />

            <section className="absolute bottom-4">
              <p className="text-xs font-normal text-slate-600">Max size</p>
              <p className="text-xs font-bold">
                {size?.volume?.height} {size?.volume?.width && `x ${size?.volume?.width}`}
                {size?.volume?.depth && `x ${size?.volume?.depth}`}
                {size?.unit?.volume}
              </p>

              <ul className="mt-2 flex flex-wrap">
                {size?.meta?.line1 && <li className="text-xs">{size?.meta?.line1}</li>}
                {size.meta?.line2 && <li className="text-xs">{size?.meta?.line2}</li>}
              </ul>
            </section>
          </Label>
        ))}
      </RadioGroup>
    </>
  );
}
