import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

function StepCompleted({
  setIsStepper,
}: {
  setIsStepper: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="col-span-2 self-center p-8">
      <div className="mx-auto w-9/12 2xl:w-8/12">
        <div className="mx-auto rounded-md px-16 pb-14 pt-5 shadow-md 2xl:pb-16">
          <Image
            src="/images/icons/check-icon.svg"
            alt="check-icon"
            width={100}
            height={100}
            className="mx-auto"
          />
          <h6 className="mb-1 mt-3 text-center text-[18px] font-medium text-[#101828]">
            Completed successfully
          </h6>
          {/* <p className="text-center text-sm text-[#667085]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero
            et velit interdum, ac aliquet odio mattis.
          </p> */}
        </div>
        <div className="mt-10 flex justify-end 2xl:mt-14">
          <Button
            variant="dark"
            className="w-[180px]"
            onClick={() => setIsStepper(false)}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}

export default StepCompleted;
