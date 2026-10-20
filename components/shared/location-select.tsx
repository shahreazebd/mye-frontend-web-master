"use client";

import { useEffect } from "react";
import locationAtom from "@/atoms/locationAtom";
import { Location } from "@/schema/location";
import { useAtom } from "jotai";

import useGetLocations from "@/hooks/queries/location/useGetLocations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  disabled?: boolean;
  onValueChange?: (locationId: string) => void;
};

export default function LocationSelect({ disabled, onValueChange }: Props) {
  const { data: locations, isLoading } = useGetLocations();
  const [locationState, setValue] = useAtom(locationAtom);

  useEffect(() => {
    if (isLoading || !locations?.length) return;

    const selectedId = locationState.locationId || String(locations[0].id);
    const selectedLocation =
      locations.find((l) => String(l.id) === selectedId) || locations[0];

    setValue((prev) => ({
      ...prev,
      locationId: selectedId,
      singleLocation: selectedLocation,
    }));

    // Always call onValueChange with the current value
    onValueChange?.(selectedId);
  }, [isLoading, locations]);

  const handleChangeLocation = (value: string) => {
    const selectedLocation = locations?.find((location) => String(location.id) === value);

    if (selectedLocation) {
      setValue((prev) => ({
        ...prev,
        locationId: value,
        singleLocation: selectedLocation as Location,
      }));
      onValueChange?.(value);
    }
  };

  return (
    <>
      {locations && (
        <Select
          disabled={disabled}
          onValueChange={handleChangeLocation}
          value={locationState.locationId || ""}
        >
          <SelectTrigger className="h-8 w-auto bg-white text-sm font-medium">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location.id} value={String(location.id)}>
                {location.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </>
  );
}
