import locationAtom from "@/atoms/locationAtom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useAuth from "@/hooks/custom/useAuth";
import useAddLocation from "@/hooks/queries/location/useAddLocation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import CountrySelect from "@/components/shared/country-select";

const formSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .nonempty({ message: "Name must contain at least 1 character(s)" })
    .max(100, { message: "Name must contain at most 100 character(s)" }),
  country: z.string({ required_error: "Country is required" }),
  address: z.string({ required_error: "Address is required" }),
  post_code: z.string({ required_error: "Post Code is required" }).max(10),
});

export function AddLocationSheet() {
  const { userInformation } = useAuth();
  const { mutate: triggerAddLocation, isLoading } = useAddLocation();
  const [location, setLocations] = useAtom(locationAtom);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const closeSheet = () => {
    setLocations((prev) => ({ ...prev, isLocationAddSheetOpen: false }));
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = { ...values, company_uid: userInformation?.company_uid };

    triggerAddLocation(payload, {
      onSuccess: () => {
        closeSheet();
        form.reset();
      },
    });
  }

  return (
    <Sheet open={location.isLocationAddSheetOpen} onOpenChange={closeSheet}>
      <SheetContent className="w-[500px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add Location</SheetTitle>
          <SheetDescription>
            Add location to your account here. Click save when you&apos;re done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="United State " {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="1/2, City, Country" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="post_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Post Code</FormLabel>
                  <FormControl>
                    <Input placeholder="12D34" {...field} />
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
                    <CountrySelect className="w-[350px]" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SheetFooter>
              <Button
                loading={isLoading}
                type="submit"
                className="w-[140px]"
                disabled={isLoading || !form.formState.isValid}
              >
                Save
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
