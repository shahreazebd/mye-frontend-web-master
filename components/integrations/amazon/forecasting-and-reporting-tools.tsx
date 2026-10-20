import Image from "next/image";

function ContentBox(props: { image: string; content: string }) {
  const { image, content } = props;

  return (
    <div className="mb-4 flex items-start gap-x-2 md:gap-x-3">
      <Image
        src={image}
        alt="icon"
        width={50}
        height={50}
        className="size-4 md:size-6 lg:mt-px"
      />
      <div>
        <p className="text-xs lg:text-base">{content}</p>
      </div>
    </div>
  );
}

export function ForecastingAndReportingTools() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-x-20">
          <div className="order-2 lg:order-2">
            <h3 className="mb-8 hidden text-[40px] font-bold lg:block">
              Forecasting and Reporting Tools
            </h3>
            <p className="my-6">
              Empower your business with our sophisticated Forecasting and Reporting
              Tools, offering full visibility across all your selling channels. Our
              platform provides a range of customizable reports, including Open Order
              Reports, Sales Reports by specific date ranges, and Inventory Reports, which
              can be easily downloaded for further analysis. These tools enable you to
              make informed decisions by analyzing trends, predicting future demand, and
              identifying potential growth opportunities based on previous sales history.
              The upcoming Daily Order Prediction feature will further enhance your
              forecasting capabilities, offering insights that allow you to plan your
              inventory and marketing strategies more effectively.
            </p>
            <div>
              <ContentBox
                image="/images/features/icon-1.svg"
                content="Use accurate data to predict customer demand"
              />
              <ContentBox
                content="Avoid overstocking or running out of items with our system"
                image="/images/features/icon-1.svg"
              />
              <ContentBox
                content="Easily identify low-stock items with daily reports and restock them swiftly."
                image="/images/features/icon-1.svg"
              />
            </div>
          </div>

          <div className="order-1 mx-auto lg:order-1 lg:mx-0">
            <h3 className="mb-8 block text-center text-[30px] font-bold lg:hidden">
              Forecasting and Reporting Tools
            </h3>
            <Image
              src="/images/features/smart-communication.svg"
              alt="smart-communication"
              width={554}
              height={529}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
