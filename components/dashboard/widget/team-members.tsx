"use client";

import { getInitials } from "@/utils/helpers";

import useGetAllUsers from "@/hooks/queries/user/useGetAllUsers";

import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";

export function CardsTeamMembers() {
  const { data: users } = useGetAllUsers();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Team Members</CardTitle>
        <CardDescription>Invite your team members to collaborate.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {users?.map((user) => {
          const { email, firstname, lastname } = user ?? {};
          return (
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <Avatar className="size-8">
                  <AvatarFallback>{getInitials(firstname + lastname)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {firstname} {lastname}
                  </p>
                  <p className="text-sm text-muted-foreground">{email}</p>
                </div>
              </div>

              {/* <Button variant="outline" size="sm" className="ml-auto capitalize">
                {type} <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
              </Button> */}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
