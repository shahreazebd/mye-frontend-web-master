import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FileInput from "@/components/core/file-input";

type PropsType = {
  handleContinue: () => void;
};

const FormSchema = z.object({
  location: z.string({
    required_error: "Please select a location",
  }),
  action: z.string({
    required_error: "Please select a action",
  }),
  csvFiles: z.any({ required_error: "Please select a .csv file" }).array(),
});

function CsvMapping({ handleContinue }: PropsType) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    // eslint-disable-next-line no-console
    console.log(values);
    handleContinue();
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FileInput
            accept={{
              "text/csv": [],
            }}
            name="csvFiles"
          />

          <section className="flex justify-between">
            <Button
              variant="secondary"
              type="button"
              className="bg-slate-100 text-slate-900"
            >
              CSV Demo
            </Button>

            <section className="space-x-2">
              <Button type="button" className="bg-newPrimary" onClick={handleContinue}>
                Setup Later
              </Button>
              <Button type="submit" className="w-32 bg-slate-900 text-white">
                Continue
              </Button>
            </section>
          </section>
        </form>
      </Form>
    </div>
  );
}

export default CsvMapping;
