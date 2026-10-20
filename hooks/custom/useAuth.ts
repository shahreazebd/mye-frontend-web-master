"use client";

import { useEffect, useState } from "react";

import { decodeToken } from "@/lib/auth";

interface Permission {
  id: string;
  name: string;
  url: string;
  service: string;
}

export interface TAuth {
  phone: string;
  address: string;
  name: string;
  status: boolean;
  id: string;
  access_token: string;
  company_uid: string;
  type: string;
  firstname: string;
  email: string;
  lastname: string;
  permissions: Permission[];
  verified: boolean;
  restrictions: { restrictions: []; subscribed: boolean };
  avater_url: string;
  country: string;
}

const useAuth = () => {
  // Lazy initializer ensures the decoded token is read once on mount,
  // matching the server-rendered output and preventing hydration mismatches.
  const [userInformation, setUserInfo] = useState<ReturnType<typeof decodeToken>>(() =>
    decodeToken()
  );

  const [packageClick, setPackageClick] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const pClick = localStorage.getItem("packageClick");
    const email = localStorage.getItem("userEmail");

    setUserInfo(decodeToken());

    setUserEmail(() => email || "");
    setPackageClick(() => pClick || "");
  }, []);

  return { userInformation, packageClick, userEmail };
};

export default useAuth;
