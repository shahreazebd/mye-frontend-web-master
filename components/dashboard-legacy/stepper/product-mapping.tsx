import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import CsvMapping from "./csv-mapping";
import SmartMapping from "./smart-mapping";

type PropsType = {
  handleContinue: () => void;
};

function ProductMapping({ handleContinue }: PropsType) {
  return (
    <div className="col-span-2 mx-auto mt-5 p-8 xl:w-9/12">
      <h5 className="mb-1 text-2xl">Select Product Mapping Path</h5>
      <p className="text-sm text-[#71717A]">
        Make changes to your account here. Click save when you are done.
      </p>

      <Tabs defaultValue="mapping_with_csv" className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mapping_with_csv">Mapping With CSV</TabsTrigger>
          <TabsTrigger value="smart_mapping">Smart Mapping</TabsTrigger>
        </TabsList>

        <TabsContent value="mapping_with_csv">
          <CsvMapping handleContinue={handleContinue} />
        </TabsContent>
        <TabsContent value="smart_mapping">
          <SmartMapping handleContinue={handleContinue} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProductMapping;
