import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import InventoryTab from "@/components/inventory/inventory-tab";
import ProductTab from "@/components/inventory/product-tab";

type PropsType = {
  handleContinue: () => void;
};

function AddProduct({ handleContinue }: PropsType) {
  return (
    <div className="col-span-2 mx-auto mt-5 p-8 xl:w-9/12">
      <h5 className="mb-1 text-2xl">Select Product Import Path</h5>
      <p className="text-sm text-[#71717A]">
        Make changes to your account here. Click save when you are done.
      </p>

      <Tabs defaultValue="inventory" className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="product">Product</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory">
          <InventoryTab dashboard={true} handleContinue={handleContinue} />
        </TabsContent>
        <TabsContent value="product">
          <ProductTab dashboard={true} handleContinue={handleContinue} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default AddProduct;
