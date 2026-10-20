import { Button } from "@/components/ui/button";

const stepperContent = [
  {
    id: 0,
    title: "Store/ Channel Selection",
    description: "Lorem consectetur adipiscing elit.",
  },
  {
    id: 1,
    title: "Import Product",
    description: "Lorem consectetur adipiscing elit.",
  },
  {
    id: 2,
    title: "Select Product Mapping Path",
    description: "Lorem consectetur adipiscing elit.",
  },
  {
    id: 3,
    title: "Shipping Career Integration",
    description: "Lorem consectetur adipiscing elit.",
  },
  {
    id: 4,
    title: "Drive Account Integration",
    description: "Lorem consectetur adipiscing elit.",
  },
];

function Stepper({ current }: { current: number }) {
  return (
    <div className="h-full rounded-md px-10 py-8 shadow-md">
      {/* stepper */}
      <ol className="relative border-l-2 border-gray-200 dark:border-gray-700">
        {stepperContent.map((step) => {
          return (
            <li key={step.id} className="mb-10 ml-6">
              <span
                className={`absolute -left-4 flex size-7 items-center justify-center rounded-full border-[10px] ${
                  current > step.id &&
                  "border-[#020246] bg-white ring-4 ring-gray-200 dark:border-[black] dark:bg-white dark:ring-gray-900"
                } ${
                  current < step.id &&
                  "border-gray-200 bg-white dark:border-gray-200 dark:bg-white dark:ring-gray-600"
                } ${
                  current === step.id &&
                  "border-gray-200 bg-white ring-2 ring-[#020246] dark:border-gray-200 dark:bg-white dark:ring-gray-600"
                }`}
              ></span>
              <h6 className="text-sm font-medium">{step.title}</h6>
              <p className="text-xs">{step.description}</p>
            </li>
          );
        })}
      </ol>
      {/* footer  */}
      <div className="mt-32">
        <p className="text-base font-medium">Having Trouble?</p>
        <p className="mb-3 text-sm  text-[#667085]">
          Feel Free to contract us and We will always help you through the process
        </p>
        <Button variant="outline">Contact Us</Button>
      </div>
    </div>
  );
}

export default Stepper;
