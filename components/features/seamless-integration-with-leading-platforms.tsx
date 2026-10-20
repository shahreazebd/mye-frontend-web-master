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

export function SeamlessIntegrationWithLeadingPlatforms() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-x-20">
          <div className="order-2 lg:order-2">
            <h3 className="mb-8 hidden text-[40px] font-bold lg:block">
              Seamless Integration with Leading Platforms
            </h3>
            <p className="my-6">
              ManageYourEcommerce integrates effortlessly with top e-commerce platforms,
              marketplaces, and shipping carriers, ensuring your business runs smoothly.
              Our platform’s flexibility and compatibility allow you to connect all the
              tools you need, from product listing to order fulfillment.
            </p>
            <div>
              <ContentBox
                image="/images/features/icon-1.svg"
                title="Platform Integrations: "
                content="Seamlessly integrate with leading platforms like Amazon, eBay, WooCommerce, and more."
              />
              <ContentBox
                title="Shipping Carrier Integrations: "
                content="Connect with over many shipping carriers to streamline your fulfillment process."
                image="/images/features/icon-1.svg"
              />
              <ContentBox
                title="Third-Party App Integrations: "
                content="Enhance your business operations with integrations to third-party apps for accounting, marketing, and customer service."
                image="/images/features/icon-1.svg"
              />
              <ContentBox
                title="API Access: "
                content="Take advantage of our API to create custom integrations that cater to your specific business needs."
                image="/images/features/icon-1.svg"
              />
            </div>
          </div>

          <div className="order-1 mx-auto lg:order-1 lg:mx-0">
            <h3 className="mb-8 block text-center text-[30px] font-bold lg:hidden">
              Seamless Integration with Leading Platforms
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
