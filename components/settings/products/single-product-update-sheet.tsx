import productsAtom from "@/atoms/productsAtom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useAuth from "@/hooks/custom/useAuth";
import useUpdateProduct from "@/hooks/queries/product/use-update-product";
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
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const floatRegex = /^\d+(\.\d{1,5})?$/;

const formSchema = z.object({
  name: z
    .string({ required_error: "Name is required." })
    .nonempty({ message: "Name must contain at least 1 character(s)" })
    .max(100, { message: "Name must contain at most 100 character(s)" }),

  sku: z
    .string({ required_error: "SKU is required." })
    .regex(/^[A-Za-z0-9-]+$/, "SKU must contain only letters, numbers, or dashes")
    .nonempty({ message: "SKU must contain at least 1 character(s)" })
    .max(100, { message: "SKU must contain at most 100 character(s)" }),

  barcode: z
    .string({ required_error: "Barcode is required." })
    .max(100, { message: "Barcode must contain at most 100 character(s)" })
    .optional(),

  purchase_price: z
    .string({ required_error: "Purchase price is required" })
    .nonempty({ message: "Purchase price is required" })
    .max(20, { message: "Purchase price must contain at most 20 digits" })
    .regex(floatRegex, { message: "Invalid Number!" }),

  selling_price: z
    .string({ required_error: "Selling price is required" })
    .nonempty({ message: "Selling price is required" })
    .max(20, { message: "Selling price must contain at most 20 digits" })
    .regex(floatRegex, { message: "Invalid Number!" }),

  weight: z
    .string({ required_error: "Weight is required" })
    .nonempty({ message: "Weight is required" })
    .max(20, { message: "Weight must contain at most 20 digits" })
    .regex(floatRegex, { message: "Invalid Number!" }),

  width: z
    .string({ required_error: "Width is required" })
    .nonempty({ message: "Width is required" })
    .max(20, { message: "Width must contain at most 20 digits" })
    .regex(floatRegex, { message: "Invalid Number!" }),

  height: z
    .string({ required_error: "Height is required" })
    .nonempty({ message: "Height is required" })
    .max(20, { message: "Height must contain at most 20 digits" })
    .regex(floatRegex, { message: "Invalid Number!" }),

  depth: z
    .string({ required_error: "Length is required" })
    .nonempty({ message: "Length is required" })
    .max(20, { message: "Length must contain at most 20 digits" })
    .regex(floatRegex, { message: "Invalid Number!" }),
});

export default function SingleProductUpdateSheet() {
  const { userInformation } = useAuth();
  const [product, setProduct] = useAtom(productsAtom);
  const { mutate: updateProduct, isLoading } = useUpdateProduct();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      name: product.singleProduct.name,
      sku: product.singleProduct.sku,
      barcode: product.singleProduct.barcode ?? "",
      purchase_price: product.singleProduct.purchase_price,
      selling_price: product.singleProduct.selling_price,
      weight: product.singleProduct.weight,
      width: product.singleProduct.width,
      height: product.singleProduct.height,
      depth: product.singleProduct.depth,
    },
  });

  const sheetClose = () => {
    setProduct((prev) => ({
      ...prev,
      isSingleProductEditSheet: false,
    }));
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const indentifier = {
      company_uuid: userInformation?.company_uid as string,
      id: product.singleProduct.id,
      sku: product.singleProduct.sku,
    };

    const payload = {
      indentifier,
      data: values,
    };

    updateProduct(payload, {
      onSuccess: () => {
        form.reset();
        sheetClose();
      },
    });
  }

  return (
    <Sheet open={product.isSingleProductEditSheet} onOpenChange={sheetClose}>
      <SheetContent className="w-[500px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Update Product</SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your name.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>SKU*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Sku.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="barcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Barcode</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your barcode.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (cm)*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your height.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Width (cm)*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your width.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="depth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Length (cm)*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Length.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="purchase_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Purchase Price*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your purchase price.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="selling_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selling Price*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your selling price.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (gm)*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your weight.." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* <FormField
                control={form.control}
                name="product_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Type</FormLabel>
                    <FormControl>
                      <Select {...field}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a product_type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="simple">Simple</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}

            <SheetFooter>
              <Button
                loading={isLoading}
                disabled={isLoading}
                className="w-[140px]"
                type="submit"
              >
                Submit
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
