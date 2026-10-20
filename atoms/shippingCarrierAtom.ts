import { atom, useAtom } from "jotai";

type ShipFromType = {
  city: string;
  postalCode: string;
  countryCode: string;
  streetLines: string;
  stateOrProvinceCode: string;
};

type AdditionalDataType = {
  pickup_type: string;
  package_type: string;
  service_type: string;
};

export type EditCarrierType = {
  carrier_meta_data: {
    ship_from: ShipFromType;
    additional_data: AdditionalDataType;
  };
  uuid: string;
  name: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  company_uid: string;
  is_default: boolean;
  email: string | null;
  credential_type: string;
  shipping_service_name: string;
};

const shippingCarrierAtom = atom({
  carrierDeleteAlert: false,
  deleteCarrierId: "",
  isOpenEditSheet: false,
  editCarrierData: {} as EditCarrierType,
});

export function useShippingCarrierAtom() {
  const [carrier, setCarrier] = useAtom(shippingCarrierAtom);

  const handleCarrier = (value: Partial<typeof carrier>) => {
    setCarrier((prev) => ({ ...prev, ...value }));
  };

  return { carrier, handleCarrier };
}
