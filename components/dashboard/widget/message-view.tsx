import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";

export default function MessageView() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Message View</CardTitle>
        <CardDescription>Manage your report depend on this</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <div className="flex justify-center py-5">
          <div className="w-1/2 border-r-2 text-center">
            <h4>4290</h4>
            <p className="mt-2 text-sm text-muted-foreground">Message Seen </p>
          </div>{" "}
          <div className="w-1/2 text-center">
            <h4>1200</h4>
            <p className="mt-2 text-sm text-muted-foreground">Message Unseen</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
