import Image from "next/image";

function ContentBox({ title, description }: { title: string; description: string }) {
  return (
    <div className="mb-6">
      <h6 className="mb-1 leading-6 lg:text-[20px]">{title}</h6>
      <p className="text-sm text-[#3D5263] lg:text-[18px]">{description}</p>
    </div>
  );
}

function Fulfillment() {
  return (
    <section className="bg-shippingRatesBg py-12 lg:py-16">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="mx-auto lg:mx-0">
            <h3 className="mb-8 block text-center text-[18px] font-bold lg:hidden">
              Fulfillment by Amazon (FBA) integrated
            </h3>
            <Image
              src="/images/single-integration/fulfillment.svg"
              alt="feature"
              width={554}
              height={529}
              className="xl:ml-10"
            />
          </div>
          <div>
            <h3 className="mb-2 hidden text-[22px]  font-bold lg:mr-10 lg:block">
              Fulfillment by Amazon (FBA) integrated
            </h3>

            <div className="lg:mr-36">
              <ContentBox
                title="FBA for every channel you sell on"
                description="Fulfill orders from any channel using your FBA inventory in mye."
              />
              <ContentBox
                title="Make better purchasing decisions and streamline your
                accounting"
                description="View local inventory alongside FBA inventory to get a true picture of
                your stock."
              />
              <ContentBox
                title="100% Valid Tracking Rates"
                description="Generate sales reports from FBA alongside all your sales channels to
                see a complete picture of sales and profits across you business."
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Fulfillment;
