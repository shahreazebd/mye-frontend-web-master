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

export function MobileAppForOnTheGoManagement() {
  return (
    <section className="bg-shippingRatesBg py-12 lg:py-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-x-20">
          <div className="order-2 lg:order-1">
            <h3 className="mb-8 hidden text-[40px] font-bold lg:block">
              Mobile App for On-the-Go Management
            </h3>
            <p className="my-6">
              E-commerce doesn’t stop when you’re away from your desk. With the
              ManageYourEcommerce Mobile App, you can stay connected to your business
              operations no matter where you are. Manage orders, monitor inventory, and
              access key performance metrics directly from your mobile device, ensuring
              you’re always in control.
            </p>
            <div>
              <ContentBox
                image="/images/features/icon-2.svg"
                title="Real-Time Business Data: "
                content="Access your business’s vital data and metrics in real-time, even when you’re on the go."
              />
              <ContentBox
                title="Mobile Order and Inventory Management: "
                content="Manage orders and inventory from your mobile device, ensuring nothing slips through the cracks."
                image="/images/features/icon-2.svg"
              />
              <ContentBox
                title="Instant Alerts: "
                content="Receive notifications for critical events such as low-stock alerts or order updates."
                image="/images/features/icon-2.svg"
              />
              <ContentBox
                title="User-Friendly Interface: "
                content="Experience a seamless and intuitive interface, designed to make managing your business easy and efficient from any location."
                image="/images/features/icon-2.svg"
              />
            </div>
          </div>

          <div className="order-1 mx-auto lg:order-2 lg:mx-0">
            <h3 className="mb-8 block text-center text-[30px] font-bold lg:hidden">
              Mobile App for On-the-Go Management
            </h3>
            <Image
              src="/images/features/inventory-management.svg"
              alt="inventory-management"
              width={554}
              height={529}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
