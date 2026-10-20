import Image from "next/image";

function BiggestRange() {
  return (
    <section className="bg-faqBg pb-80 pt-12 lg:pt-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="order-1 mx-auto lg:order-2 lg:mx-0">
            <h3 className="mb-8 block text-center text-[20px] font-bold lg:hidden">
              Biggest Range Of Couriers
            </h3>
            <Image
              src="/images/single-integration/biggest-range.svg"
              alt="manage shipment"
              width={554}
              height={529}
            />
          </div>
          <div className="order-2 lg:order-1">
            <h3 className="mb-8 hidden text-[36px]  font-bold lg:block">
              Biggest Range Of Couriers
            </h3>
            <p className="text-sm text-[#212B36] lg:text-base">
              Discover the widest range of courier services at your fingertips! We offer
              an extensive selection of shipping options, ensuring you have access to the
              biggest range of couriers to meet your specific delivery needs. From express
              services to international shipping, choose from our diverse lineup for
              seamless and efficient delivery solutions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BiggestRange;
