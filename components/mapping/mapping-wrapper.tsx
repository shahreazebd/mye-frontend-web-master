"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import mappingAtom from "@/atoms/mappingAtom";
import { useAtom } from "jotai";
import { Loader2 } from "lucide-react";

import useSmartMapping from "@/hooks/queries/mapping/useSmartMapping";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import CSVMapping from "./csv-mapping";
import CSVUnmapping from "./csv-unmapping";
import LocalProductTable from "./local-product-table";
import RemoteProductTable from "./remote-product-table";

export default function MappingWrapper() {
  const channelUuid = useParams().channel_uid as string;

  const [mapping, setMapping] = useAtom(mappingAtom);
  const { refetch, isFetching } = useSmartMapping(channelUuid);

  useEffect(() => {
    setMapping((prev) => ({
      ...prev,
      channelUUid: channelUuid,
    }));
  }, []);

  const smartMapping = () => {
    refetch();
  };

  return (
    <>
      <div className="grid grid-cols-5 gap-8">
        <RemoteProductTable />
        <LocalProductTable />
      </div>

      <Dialog
        open={mapping.isSmartMappingProductModalOpen}
        onOpenChange={() => {
          setMapping((prev) => ({
            ...prev,
            isSmartMappingProductModalOpen: !prev.isSmartMappingProductModalOpen,
          }));
        }}
      >
        <DialogContent className="w-[500px] sm:max-w-[90%]">
          <DialogHeader>
            <DialogTitle>Advance Options</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="csvMapping">
            <TabsList>
              <TabsTrigger value="csvMapping">CSV Mapping</TabsTrigger>
              <TabsTrigger value="csvUnmapping">CSV Unmapping</TabsTrigger>
              <TabsTrigger value="smartMapping">Smart Mapping</TabsTrigger>
            </TabsList>
            <TabsContent value="csvMapping">
              <CSVMapping channel_uid={channelUuid} />
            </TabsContent>
            <TabsContent value="csvUnmapping">
              <CSVUnmapping />
            </TabsContent>
            <TabsContent value="smartMapping" className="mx-auto mt-4">
              <Button
                onClick={smartMapping}
                disabled={isFetching}
                className="flex w-[160px] items-center gap-1"
              >
                {isFetching && <Loader2 className="size-4 animate-spin" />}
                Smart Mapping
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
}
