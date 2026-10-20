import { useEffect, useState, type ReactNode } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useOpenOrderAtomWithStorage } from "@/atoms/openOrderAtom";
import { useGetPostagePayload, usePostageAtom } from "@/atoms/postageAtom";
import { format, startOfDay } from "date-fns";
import { Boxes, PackageCheck, Truck } from "lucide-react";

import { cn } from "@/lib/utils";
import useGetChannelDetails from "@/hooks/queries/channel/useGetChannelDetails";
import { useBuyFedexShipment } from "@/hooks/queries/shipments/use-buy-fedex-shipment";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/date-picker";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";

import CarrierAccountSelect from "../carrier-account-select";
import SelectOption from "../select-option";

// Mirrors the packaging list in the FedEx Ship Manager "Create shipment" form:
// one "Your own packaging" option, then the FedEx Express packaging range.
const packageTypes = [
  {
    group: "Your own packaging",
    label: "Your Packaging",
    value: "YOUR_PACKAGING",
  },
  {
    group: "FedEx Express packaging",
    label: "FedEx Box",
    value: "FEDEX_BOX",
  },
  {
    group: "FedEx Express packaging",
    label: "FedEx Envelope",
    value: "FEDEX_ENVELOPE",
  },
  {
    group: "FedEx Express packaging",
    label: "FedEx Pak",
    value: "FEDEX_PAK",
  },
  {
    group: "FedEx Express packaging",
    label: "FedEx Tube",
    value: "FEDEX_TUBE",
  },
  {
    group: "FedEx Express packaging",
    label: "FedEx Extra Small Box",
    value: "FEDEX_EXTRA_SMALL_BOX",
  },
  {
    group: "FedEx Express packaging",
    label: "FedEx Small Box",
    value: "FEDEX_SMALL_BOX",
  },
  {
    group: "FedEx Express packaging",
    label: "FedEx Medium Box",
    value: "FEDEX_MEDIUM_BOX",
  },
  {
    group: "FedEx Express packaging",
    label: "FedEx Large Box",
    value: "FEDEX_LARGE_BOX",
  },
  {
    group: "FedEx Express packaging",
    label: "FedEx Extra Large Box",
    value: "FEDEX_EXTRA_LARGE_BOX",
  },
  {
    group: "FedEx Express packaging",
    label: "FedEx 10kg Box",
    value: "FEDEX_10KG_BOX",
  },
  {
    group: "FedEx Express packaging",
    label: "FedEx 25kg Box",
    value: "FEDEX_25KG_BOX",
  },
  {
    group: "FedEx Express packaging",
    label: "FedEx UK Pak",
    value: "FEDEX_UK_EXPRESS_PAK",
  },
];

const serviceTypes = [
  {
    label: "FedEx Priority Overnight® (Selected Markets)",
    value: "PRIORITY_OVERNIGHT",
  },
  {
    label: "FedEx First",
    value: "FEDEX_FIRST",
  },
  {
    label: "FedEx Priority Express",
    value: "FEDEX_PRIORITY_EXPRESS",
  },
  {
    label: "FedEx Priority",
    value: "FEDEX_PRIORITY",
  },
  {
    label: "FedEx Priority Express Freight",
    value: "FEDEX_PRIORITY_EXPRESS_FREIGHT",
  },
  {
    label: "FedEx Priority Freight",
    value: "FEDEX_PRIORITY_FREIGHT",
  },
  {
    label: "FedEx Economy (Only U.K.)",
    value: "FEDEX_ECONOMY_SELECT",
  },
];

const DEFAULT_SERVICE_TYPE = "FEDEX_PRIORITY";

const DEFAULT_PACKAGE_TYPE = "YOUR_PACKAGING";

const pickupTypes = [
  {
    label: "Contact FedEx to Schedule",
    value: "CONTACT_FEDEX_TO_SCHEDULE",
  },
  {
    label: "Drop off at FedEx Location",
    value: "DROPOFF_AT_FEDEX_LOCATION",
  },
  {
    label: "Use Scheduled Pickup",
    value: "USE_SCHEDULED_PICKUP",
  },
];

const DEFAULT_PICKUP_TYPE = "DROPOFF_AT_FEDEX_LOCATION";

type Option = { label: string; value: string };

function FormField({
  label,
  hint,
  className,
  children,
}: Readonly<{
  label: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}>) {
  return (
    <section className={cn("space-y-2", className)}>
      <div className="space-y-1">
        <Label className="text-sm font-medium text-slate-700">{label}</Label>
        {hint && <p className="text-xs text-slate-500">{hint}</p>}
      </div>
      {children}
    </section>
  );
}

function FormSection({
  icon,
  title,
  description,
  children,
}: Readonly<{
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
}>) {
  return (
    <section className="rounded-lg border border-slate-200 bg-slate-50/40 p-4">
      <header className="mb-4 flex items-start gap-3">
        <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-white text-slate-600 ring-1 ring-slate-200">
          {icon}
        </span>
        <div className="space-y-0.5">
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500">{description}</p>
        </div>
      </header>
      {children}
    </section>
  );
}

export default function FedexOptions() {
  const [carrierAccountUuid, setCarrierAccountUuid] = useState("");
  const [shipDate, setShipDate] = useState<Date | undefined>(undefined);
  const [serviceType, setServiceType] = useState(DEFAULT_SERVICE_TYPE);
  const [packageType, setPackageType] = useState(DEFAULT_PACKAGE_TYPE);
  const [pickupType, setPickupType] = useState(DEFAULT_PICKUP_TYPE);

  // Set after mount so the server and client cannot render a different date.
  // Defaults to today, which is also the earliest date FedEx will accept.
  const [minShipDate, setMinShipDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    const today = startOfDay(new Date());

    setMinShipDate(today);
    setShipDate(today);
  }, []);

  const { toast } = useToast();

  const searchParams = Object.fromEntries(useSearchParams()?.entries());
  const router = useRouter();

  const { data: channelDetails } = useGetChannelDetails(searchParams?.channelId);
  const { mutate: buyPostage, isLoading: isBuyPostageLoading } = useBuyFedexShipment();

  const { setOpenOrdersWithStorage } = useOpenOrderAtomWithStorage();

  const { postagePayload } = useGetPostagePayload();

  const { setPostageInfo } = usePostageAtom();

  const shipDatestamp = shipDate ? format(shipDate, "yyyy-MM-dd") : "";

  const isFormValid = !!carrierAccountUuid && !!shipDatestamp && !!serviceType;

  function findLabel(options: Option[], value: string) {
    return options.find((option) => option.value === value)?.label ?? "Not selected";
  }

  function buyPostageHandler() {
    if (channelDetails) {
      const marketplace = channelDetails?.channel_type.toUpperCase();

      const payload = {
        storeId: channelDetails?.channel_uid,
        storeName: channelDetails?.name,
        marketplace,
        carrierId: carrierAccountUuid,
        metadata: {
          serviceType,
          packagingType: packageType,
          pickupType,
          shipDatestamp,
        },
        orders: postagePayload,
      };

      toast({
        title: "Please wait",
        description: "You are redirecting to the postage page",
      });

      localStorage.setItem("postagePayloadData", JSON.stringify(payload));

      buyPostage(payload, {
        onSuccess: () => {
          setOpenOrdersWithStorage([]);

          setPostageInfo((prev) => {
            return {
              ...prev,
              isBuyPostageModalOpen: false,
            };
          });
          router.push("/shipments");
        },
      });
    }
  }

  return (
    <section className="space-y-6">
      <FormSection
        icon={<Truck className="size-4" />}
        title="Shipment details"
        description="The FedEx account to charge, when the parcel leaves your warehouse and how it travels."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="FedEx Account"
            hint="The account the label is bought from."
            className="sm:col-span-2"
          >
            <CarrierAccountSelect
              carrier="FEDEX"
              className="w-full"
              onValueChange={setCarrierAccountUuid}
            />
          </FormField>

          <FormField
            label="Ship Date"
            hint="Defaults to today. Past dates are not selectable."
          >
            <DatePicker
              className="h-10 w-full"
              align="start"
              date={shipDate}
              setDate={setShipDate}
              placeholder="Pick a ship date"
              disabled={minShipDate ? { before: minShipDate } : undefined}
            />
          </FormField>

          <SelectOption
            className="w-full"
            label="Service Type"
            hint="The FedEx service the parcel is rated on."
            placeholder="Select service type"
            defaultOption={DEFAULT_SERVICE_TYPE}
            onValueChange={(data) => setServiceType(data)}
            options={serviceTypes}
          />
        </div>
      </FormSection>

      <FormSection
        icon={<Boxes className="size-4" />}
        title="Packaging & pickup"
        description="What the parcel is packed in and how it is handed over to FedEx."
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <SelectOption
            className="w-full"
            label="Package Type"
            hint="Your own packaging needs dimensions on the request."
            placeholder="Select package type"
            defaultOption={DEFAULT_PACKAGE_TYPE}
            onValueChange={(data) => setPackageType(data)}
            options={packageTypes}
          />

          <SelectOption
            className="w-full"
            label="Pickup Type"
            hint="Drop off means you bring the parcel to a FedEx location."
            placeholder="Select pickup type"
            defaultOption={DEFAULT_PICKUP_TYPE}
            onValueChange={(data) => setPickupType(data)}
            options={pickupTypes}
          />
        </div>
      </FormSection>

      <section className="flex flex-col gap-4 border-t border-slate-200 pt-4 sm:flex-row sm:items-end sm:justify-between">
        <dl className="grid flex-1 grid-cols-1 gap-3 text-xs sm:grid-cols-3">
          <div className="min-w-0">
            <dt className="text-slate-500">Service</dt>
            <dd
              className="truncate font-medium text-slate-800"
              title={findLabel(serviceTypes, serviceType)}
            >
              {findLabel(serviceTypes, serviceType)}
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="text-slate-500">Package</dt>
            <dd
              className="truncate font-medium text-slate-800"
              title={findLabel(packageTypes, packageType)}
            >
              {findLabel(packageTypes, packageType)}
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="text-slate-500">Pickup</dt>
            <dd
              className="truncate font-medium text-slate-800"
              title={findLabel(pickupTypes, pickupType)}
            >
              {findLabel(pickupTypes, pickupType)}
            </dd>
          </div>
        </dl>

        <Button
          className="shrink-0 self-start bg-slate-900 sm:self-auto"
          onClick={buyPostageHandler}
          disabled={!isFormValid || isBuyPostageLoading}
          loading={isBuyPostageLoading}
        >
          Buy Postage
        </Button>
      </section>
    </section>
  );
}
