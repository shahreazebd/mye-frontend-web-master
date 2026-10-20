interface Props {
  currentStep: number;
  totalSteps?: number;
}

const MultiStepProgressBar = ({ currentStep, totalSteps = 2 }: Props) => {
  const stepPercentage =
    totalSteps > 1
      ? Math.min(100, Math.max(0, ((currentStep - 1) / (totalSteps - 1)) * 100))
      : 100;

  return (
    <div className="relative my-2 flex h-[10px] w-full items-center justify-between rounded-[10px] bg-[rgba(211,211,211,0.6)]">
      <div
        className="absolute bottom-0 left-0 top-0 rounded-[10px] bg-[rgba(6,80,137,1)] transition-all duration-300 ease-in-out"
        style={{ width: `${stepPercentage}%` }}
      />
      {Array.from({ length: totalSteps }, (_, index) => {
        const stepNumber = index + 1;
        const position = totalSteps > 1 ? (index / (totalSteps - 1)) * 100 : 0;
        const accomplished = currentStep >= stepNumber;

        return (
          <div
            key={stepNumber}
            className="absolute z-10 flex -translate-x-1/2 items-center justify-center transition-all duration-300"
            style={{ left: `${position}%` }}
          >
            <div className={`indexedStep ${accomplished ? "accomplished" : ""}`}>
              {stepNumber}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MultiStepProgressBar;
