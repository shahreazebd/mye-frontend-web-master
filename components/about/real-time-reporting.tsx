import React from "react";
import Image from "next/image";

function RealTimeReporting() {
  return (
    <section className="real-time-reporting -mb-20 bg-faqBg pb-24 pt-12 lg:-mb-40 lg:py-40">
      <div className="container items-center">
        <h3 className="mb-8 block text-[30px] font-bold lg:text-[40px]">
          Why one should choose to Manage Your eCommerce?
        </h3>
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
          <div className="order-1 mx-auto lg:order-2 lg:mx-0">
            <Image
              src="/images/features/manage-shipment.svg"
              alt="manage shipment"
              width={620}
              height={500}
            />
          </div>
          <div className="order-2 lg:order-1">
            <div className="mb-4 flex space-x-2 lg:mb-3">
              <p className="text-xs lg:text-base">
                MYE is one of the best eCommerce management companies. Easy-to-use
                interface for users to manage their eCommerce businesses very efficiently.
                MYE offers various functionalities inventory management, order management
                and Smart SKU mapping is one of them. MYE was built in the dream to make
                things easier for sellers. Sellers have easy-to-use software to manage
                their business.
              </p>
            </div>

            <div className="mb-4 flex space-x-2 lg:mb-3">
              <p className="text-xs lg:text-base">
                MYE is one of the best eCommerce management companies. Easy-to-use
                interface for users to manage their eCommerce businesses very efficiently.
                MYE offers various functionalities inventory management, order management
                and Smart SKU mapping is one of them. MYE was built in the dream to make
                things easier for sellers. Sellers have easy-to-use software to manage
                their business.
              </p>
            </div>

            <div className="flex space-x-2 ">
              <p className="text-xs lg:text-base">
                MYE is one of the best eCommerce management companies. Easy-to-use
                interface for users to manage their eCommerce businesses very efficiently.
                MYE offers various functionalities inventory management, order management
                and Smart SKU mapping is one of them. MYE was built in the dream to make
                things easier for sellers. Sellers have easy-to-use software to manage
                their business.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default RealTimeReporting;
