import Image from "next/image";

function ContentBox(props: { image: string; content: string; title: string }) {
  const { image, content, title } = props;

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
        <p className="text-xs lg:text-base">
          <strong className="text-sm leading-4 lg:text-[16px] lg:leading-6">
            {title}
          </strong>

          {content}
        </p>
      </div>
    </div>
  );
}

export function PowerfulReportingAndAnalytics() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-x-20">
          <div className="order-2 lg:order-2">
            <h3 className="mb-8 hidden text-[40px] font-bold lg:block">
              Powerful Reporting and Analytics
            </h3>
            <p className="my-6">
              Gaining a deep understanding of your business’s performance is crucial for
              making strategic decisions. Our Powerful Reporting and Analytics tools equip
              you with the data needed to analyze sales trends, monitor inventory, and
              optimize your operations. With customizable reports and forecasting tools,
              you’ll always have a clear, real-time view of your business’s performance.
            </p>
            <div>
              <ContentBox
                image="/images/features/icon-1.svg"
                title="Tailored Reports: "
                content="Generate detailed reports on sales, inventory, orders, and more, customized to suit your specific needs."
              />
              <ContentBox
                title="Profitability Analysis: "
                content="Examine key metrics such as gross and net sales, cost of goods sold (COGS), and profit margins to evaluate your business’s financial health."
                image="/images/features/icon-1.svg"
              />
              <ContentBox
                title="Comprehensive Inventory Reports: "
                content="Track inventory movements and trends with in-depth reporting tools."
                image="/images/features/icon-1.svg"
              />
              <ContentBox
                title="Advanced Demand Forecasting: "
                content="Utilize forecasting tools to anticipate future sales and inventory requirements, allowing you to plan ahead effectively."
                image="/images/features/icon-1.svg"
              />
            </div>
          </div>

          <div className="order-1 mx-auto lg:order-1 lg:mx-0">
            <h3 className="mb-8 block text-center text-[30px] font-bold lg:hidden">
              Powerful Reporting and Analytics
            </h3>
            <Image
              src="/images/features/real-time-reporting.svg"
              alt="real-time-reporting"
              width={554}
              height={529}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
