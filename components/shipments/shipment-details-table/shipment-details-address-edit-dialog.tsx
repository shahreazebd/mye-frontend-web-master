import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Address } from "@/types/shipments";
import { useUpdateOrderAddress } from "@/hooks/queries/shipments/use-update-order-address";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const addressSchema = z.object({
  buyerName: z.string().min(1, "Name is required"),
  addressLine1: z.string().min(1, "Address Line 1 is required"),
  addressLine2: z.string().optional(),
  postCode: z.string().min(1, "Post code is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  countryCode: z.string().min(1, "Country code is required"),
  phone: z.string().optional().or(z.literal("")),
  email: z.string().optional().or(z.literal("")),
});

type AddressFormValues = z.infer<typeof addressSchema>;

interface ShipmentDetailsAddressEditDialogProps {
  orderId: string;
  address: Address;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShipmentDetailsAddressEditDialog({
  orderId,
  address,
  open,
  onOpenChange,
}: Readonly<ShipmentDetailsAddressEditDialogProps>) {
  const { mutate: updateAddress, isLoading } = useUpdateOrderAddress();

  const form = useForm<AddressFormValues>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      buyerName: address.buyerName || "",
      addressLine1: address.addressLine1 || "",
      addressLine2: address.addressLine2 || "",
      postCode: address.postCode || "",
      city: address.city || "",
      country: address.country || "",
      countryCode: address.countryCode || "",
      phone: address.phone || "",
      email: address.email || "",
    },
  });

  useEffect(() => {
    form.reset({
      buyerName: address.buyerName || "",
      addressLine1: address.addressLine1 || "",
      addressLine2: address.addressLine2 || "",
      postCode: address.postCode || "",
      city: address.city || "",
      country: address.country || "",
      countryCode: address.countryCode || "",
      phone: address.phone || "",
      email: address.email || "",
    });
  }, [address, form]);

  function onSubmit(values: AddressFormValues) {
    updateAddress(
      {
        orderId,
        address: { ...address, ...values } as Address,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
        },
      }
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Shipping Address</DialogTitle>
          <DialogDescription className="sr-only">
            Edit the shipping address for this order.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-2">
            <div className="grid grid-cols-2 gap-x-6 gap-y-4">
              <FormField
                control={form.control}
                name="buyerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Buyer Name</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="addressLine2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address Line 2 (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="col-span-2">
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address Line 1</FormLabel>
                      <FormControl>
                        <Input {...field} className="rounded-sm" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Post Code</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="countryCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country Code</FormLabel>
                    <FormControl>
                      <Input {...field} className="rounded-sm" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="pt-2">
              <Button type="submit" disabled={isLoading} className="rounded-sm">
                {isLoading && <Loader2 className="mr-2 size-4 animate-spin" />}
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
