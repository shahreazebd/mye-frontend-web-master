import productsAtom, { useCompositeProductsAtom } from "@/atoms/productsAtom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtom } from "jotai";
import { useForm } from "react-hook-form";
import { z } from "zod";

import useAuth from "@/hooks/custom/useAuth";
import useAddSingleLocalProduct from "@/hooks/queries/product/useAddSingleLocalProduct";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import CompositeProductsTable from "./composite-products-table/composite-products-add-table";

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

  product_type: z.string().optional(),

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

export default function SingleProductAddSheet() {
  const { userInformation } = useAuth();
  const [product, setProduct] = useAtom(productsAtom);
  const { mutate, isLoading } = useAddSingleLocalProduct();

  const { compositeProductsState } = useCompositeProductsAtom();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "all",
  });

  const sheetClose = () => {
    setProduct((prev) => ({
      ...prev,
      isSingleProductAddSheet: false,
    }));
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const compositeChildProducts = compositeProductsState.compositeProduct
      .filter((e) =>
        compositeProductsState.selectedCompositeProduct.map((e) => e.sku).includes(e.sku)
      )
      .map((e) => ({ child_product_id: e.id, quantity: e.composite_quantity }));

    const products = {
      ...values,
      is_composite: values.product_type === "composite",
      company_uid: userInformation?.company_uid,
      ...(values.product_type === "composite" && {
        composite_child_product: compositeChildProducts,
      }),
    };

    for (let key in products) {
      // @ts-ignore
      if (products[key] === undefined) {
        // @ts-ignore
        delete products[key];
      }
    }

    mutate(products, {
      onSuccess: () => {
        form.reset();
        sheetClose();
      },
    });
  }

  return (
    <Sheet open={product.isSingleProductAddSheet} onOpenChange={sheetClose}>
      <SheetContent className="w-[750px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Product</SheetTitle>
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
                    <Input placeholder="CARGO JEANS" {...field} />
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
                    <Input placeholder="M-ELS-OLV-38-30-SB22" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* composite product ================================================== */}

            <FormField
              control={form.control}
              name="product_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Type*</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="simple">Simple</SelectItem>
                      <SelectItem value="composite">Composite</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("product_type") === "composite" ? (
              <>
                <CompositeProductsTable rowClickSelection={false} />
              </>
            ) : (
              ""
            )}

            <FormField
              control={form.control}
              name="barcode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Barcode</FormLabel>
                  <FormControl>
                    <Input placeholder="A35H6" {...field} />
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
                    <Input placeholder="34" {...field} />
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
                    <Input placeholder="20" {...field} />
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
                    <Input placeholder="12" {...field} />
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
                    <Input placeholder="12.99" {...field} />
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
                    <Input placeholder="15.99" {...field} />
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
                    <Input placeholder="3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
