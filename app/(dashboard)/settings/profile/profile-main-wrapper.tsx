"use client";

import { ReactNode } from "react";
import { getInitials } from "@/utils/helpers";
import { Mail, MapPin, Phone } from "lucide-react";

import useAuth from "@/hooks/custom/useAuth";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProfileMainWrapper() {
  const { userInformation } = useAuth();

  return (
    <div className="h-[calc(100vh-170px)] bg-gradient-to-br from-gray-50 to-gray-100 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="mx-auto max-w-2xl shadow-lg">
        <CardHeader className="pb-0">
          <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Avatar className="size-24">
              <AvatarFallback>
                {getInitials(userInformation?.Name as string)}
              </AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-3xl font-bold">
                {userInformation?.Name}
              </CardTitle>
              <p className="text-base capitalize text-gray-500">
                {userInformation?.type}
              </p>
              <p className="text-base text-gray-500">Company: {userInformation?.name}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-6 space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <InfoItem
              icon={<Mail className="size-5" />}
              label="Email"
              value={userInformation?.user_email as string}
            />
            <InfoItem
              icon={<Phone className="size-5" />}
              label="Phone"
              value={userInformation?.phone as string}
            />
            <InfoItem
              icon={<MapPin className="size-5" />}
              label="Address"
              value={userInformation?.address as string}
            />
            <InfoItem
              icon={<MapPin className="size-5" />}
              label="Country"
              value={userInformation?.country as string}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
function InfoItem({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100">
      <div className="shrink-0 text-gray-500">{icon}</div>
      <div>
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-sm text-gray-900">{value}</p>
      </div>
    </div>
  );
}
