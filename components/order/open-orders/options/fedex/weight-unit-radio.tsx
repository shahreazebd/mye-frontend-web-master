import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Props = {
  // eslint-disable-next-line no-unused-vars
  onValueChange?: (value: string) => void;
  className?: string;
};

export default function WeightUnitRadio(props: Props) {
  function onChangeHandler(value: string) {
    props?.onValueChange?.(value);
  }

  return (
    <section className={cn(`${props?.className && props?.className}`)}>
      <label className="mb-2 block text-sm font-medium text-gray-600">
        Select Weight Unit
      </label>

      <RadioGroup
        defaultValue="lb"
        className="flex gap-8"
        onValueChange={onChangeHandler}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="lb" id="r1" />
          <Label htmlFor="r1">Pound</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="kg" id="r2" />
          <Label htmlFor="r2">Kilogram</Label>
        </div>
      </RadioGroup>
    </section>
  );
}
