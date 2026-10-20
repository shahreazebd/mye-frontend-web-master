import { CurrentPlan } from "./current-plan";

// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SubscriptionWrapper() {
  return (
    <div>
      <div className="mb-10 flex items-center justify-between">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-[600]">Current Plan</h2>
        </div>
      </div>
      <div className="mt-32 flex items-center justify-center">
        <CurrentPlan />
      </div>
    </div>
  );
}
