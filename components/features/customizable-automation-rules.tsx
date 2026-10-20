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

export function CustomizableAutomationRules() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-x-20">
          <div className="order-2 lg:order-2">
            <h3 className="mb-8 hidden text-[40px] font-bold lg:block">
              Customizable Automation Rules
            </h3>
            <p className="my-6">
              Automation is key to scaling your e-commerce business efficiently. Our
              Customizable Automation Rules feature empowers you to automate a variety of
              tasks, from order routing and inventory management to invoicing and
              shipping. Establish rules that align with your business’s unique needs and
              let ManageYourEcommerce take care of the rest.
            </p>
            <div>
              <ContentBox
                image="/images/features/icon-1.svg"
                title="Automated Order Routing: "
                content="Direct orders to the best fulfillment location based on pre-set criteria."
              />
              <ContentBox
                title="Inventory Management Automation: "
                content="Streamline stock updates, restocking alerts, and other inventory tasks through automation."
                image="/images/features/icon-1.svg"
              />
              <ContentBox
                title="Shipping Process Automation: "
                content="Establish rules for carrier selection, label generation, and order tracking updates to simplify shipping."
                image="/images/features/icon-1.svg"
              />
              <ContentBox
                title="Automated Invoicing and Billing: "
                content="Simplify your invoicing and billing processes with tailored automation workflows."
                image="/images/features/icon-1.svg"
              />
            </div>
          </div>

          <div className="order-1 mx-auto lg:order-1 lg:mx-0">
            <h3 className="mb-8 block text-center text-[30px] font-bold lg:hidden">
              Customizable Automation Rules
            </h3>
            <Image
              src="/images/features/order-management.svg"
              alt="order-management"
              width={554}
              height={529}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
