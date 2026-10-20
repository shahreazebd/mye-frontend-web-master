"use client";

import { Location } from "@/schema/location";
import { useQuery } from "@tanstack/react-query";
import useAuth from "hooks/custom/useAuth";

import fetch from "@/config/xior";

const fetchLocationData = (company_uid: string) => {
  return fetch
    .get(`/miams/api/v1/location/get/all-location/${company_uid}/`)
    .then<Location[]>(({ data }) => data.data);
};

export default function useGetLocations() {
  const { userInformation } = useAuth();

  return useQuery(
    ["fetch-location-data"],
    () => fetchLocationData(userInformation?.company_uid as string),
    {
      enabled: !!userInformation?.company_uid,
    }
  );
}
