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

export function MYECompanionMobileApp() {
  return (
    <section className="bg-faqBg py-12 lg:py-20">
      <div className="container items-center">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-x-20">
          <div className="order-2 lg:order-1">
            <h3 className="mb-8 hidden text-[40px] font-bold lg:block">
              MYE Companion Mobile App
            </h3>
            <p className="my-6">
              Stay connected to your business at all times with the MYE Mobile App. This
              convenient tool allows you to monitor key performance metrics, manage
              orders, and access inventory data from anywhere, ensuring that you can make
              critical decisions on the go. The app provides a real-time overview of your
              operations, keeping you informed and in control, no matter where you are.
            </p>
            <div>
              <ContentBox
                image="/images/features/icon-2.svg"
                content=" Easy to use informative Dashboard"
              />

              <ContentBox
                content="Monitor Order History, Stock History, Inventory Sync Status "
                image="/images/features/icon-2.svg"
              />

              <ContentBox
                content="See all the connected sales channels"
                image="/images/features/icon-2.svg"
              />

              <ContentBox
                content="Real time Notifications to keep you updated"
                image="/images/features/icon-2.svg"
              />

              <ContentBox
                content="Activity Log keeps all track of all activity "
                image="/images/features/icon-2.svg"
              />
            </div>
          </div>

          <div className="order-1 mx-auto lg:order-2 lg:mx-0">
            <h3 className="mb-8 block text-center text-[30px] font-bold lg:hidden">
              MYE Companion Mobile App
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
