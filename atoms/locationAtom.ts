import { Location } from "@/schema/location";
import { atom, useAtom } from "jotai";

const locationAtom = atom({
  locationId: "",
  singleLocation: {} as Location,
  isLocationAddSheetOpen: false,
  isLocationEditSheetOpen: false,
});

export function useLocationAtom() {
  const [locationDetails, setLocationDetails] = useAtom(locationAtom);

  return { locationDetails, setLocationDetails };
}

export default locationAtom;
