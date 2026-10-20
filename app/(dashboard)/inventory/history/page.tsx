// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { InventoryHistoryWrapper } from "@/components/inventory/history/inventory-history-wrapper";

export default function History() {
  return (
    <section>
      <InventoryHistoryWrapper />
      {/* <Tabs defaultValue="return">
        <TabsList>
          <TabsTrigger value="return">Return History</TabsTrigger>
          <TabsTrigger value="password">Return History</TabsTrigger>
        </TabsList>
        <TabsContent value="return">
          <InventoryHistoryWrapper />
        </TabsContent>
        <TabsContent value="password">
          <InventoryHistoryWrapper />
        </TabsContent>
      </Tabs> */}
    </section>
  );
}
