import React from "react";
import Image from "next/image";

function SmartCommunication() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container items-center">
        <h3 className="mb-8 text-right text-[30px] font-bold lg:block lg:text-[40px]">
          Our mission is to make your life easier.
        </h3>
        <div className="grid grid-cols-1 items-center gap-5 lg:grid-cols-2">
          <div className="mx-auto lg:mx-0">
            <Image
              src="/images/about/make-life-easier.png"
              alt="make life easier"
              width={552}
              height={466}
            />
          </div>
          <div>
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
        <p className="mt-10 text-xs lg:text-base">
          MYE is one of the best eCommerce management companies. Easy-to-use interface for
          users to manage their eCommerce businesses very efficiently. MYE offers various
          functionalities inventory management, order management and Smart SKU mapping is
          one of them. MYE was built in the dream to make things easier for sellers.
          Sellers have easy-to-use software to manage their business. MYE offers various
          functionalities inventory management, order management and Smart SKU mapping is
          one of them. MYE was built in the dream to make things easier for sellers.
          Sellers have easy-to-use software to manage their business.
        </p>
      </div>
    </section>
  );
}

export default SmartCommunication;
