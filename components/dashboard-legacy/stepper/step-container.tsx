"use client";

import React, { useState } from "react";

import AddProduct from "./add-product";
import Carriers from "./carriers";
import Drives from "./drives";
import Marketplaces from "./marketplaces";
import ProductMapping from "./product-mapping";
import StepCompleted from "./step-completed";
import Stepper from "./stepper";

function StepContainer({
  setIsStepper,
}: {
  setIsStepper: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [current, setCurrent] = useState(0);

  const handleContinue = () => {
    setCurrent((prev) => prev + 1);
  };

  return (
    <>
      <div className="mb-7">
        <h2 className="text-[30px] font-bold">Primary Setup</h2>
        <p className="text-[17px] text-[#ABABAB]">
          Before Start Basic Information need to be setup
        </p>
      </div>

      <div className="grid grid-cols-3 rounded shadow-sm">
        {current === 0 && <Marketplaces handleContinue={handleContinue} />}
        {current === 1 && <AddProduct handleContinue={handleContinue} />}
        {current === 2 && <ProductMapping handleContinue={handleContinue} />}
        {current === 3 && <Carriers handleContinue={handleContinue} />}
        {current === 4 && <Drives handleContinue={handleContinue} />}
        {current === 5 && <StepCompleted setIsStepper={setIsStepper} />}
        <Stepper current={current} />
      </div>
    </>
  );
}

export default StepContainer;
