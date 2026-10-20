import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";

export default function OrderTrackerSummery() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Order Tracker Summary</CardTitle>
        <CardDescription>Manage your report depend on this</CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <div className="flex justify-center py-5">
          <div className="w-1/2 border-r-2 text-center">
            <h4>350</h4>
            <p className="mt-2 text-sm text-muted-foreground">PRODUCT DELIVERY </p>
          </div>{" "}
          <div className="w-1/2 text-center">
            <h4>350</h4>
            <p className="mt-2 text-sm text-muted-foreground">PRODUCT DELIVERY </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
