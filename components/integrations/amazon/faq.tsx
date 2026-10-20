"use client";

import React from "react";

function FAQ() {
  return (
    <section className="faq mt-20 bg-faqBg pb-10 pt-12 lg:pb-32 lg:pt-20">
      <div className="container">
        <h5 className="text-center text-3xl text-[#171717] lg:text-4xl dark:text-white">
          Frequently asked questions
        </h5>

        <div className="my-10 grid gap-x-24 gap-y-8 lg:my-16 lg:grid-cols-2 ">
          <div className="flex flex-col gap-8">
            <div>
              <h6 className="mb-1 text-xl leading-7">1. How does the free trial work?</h6>
              <p className="text-base">
                The free trial gives you access to Manage Your eCommerce for 30 days. This
                gives you complete unlimited access to all our features, no credit card
                required. You can take this time to be sure all your channel connections
                are set up right – and test out your key business processes. That way
                you’ll know Manage Your eCommerce is the right choice for you and your
                business.
              </p>
            </div>
            <div>
              <h6 className="mb-1 text-xl leading-7">
                2. If I sign up, can I upgrade or downgrade my subscription later?
              </h6>
              <p className="text-base">
                Of course. As your business grows and requires additional features and
                order capacity, upgrading can be done in a snap. Based on the new plan,
                you’ll be charged for the difference at the time of the adjustment.
              </p>
            </div>
            <div>
              <h6 className="mb-1 text-xl leading-7">
                3. Do I have to pay extra for support?
              </h6>
              <p className="text-base">
                No. No extra payments are required. Regardless of your plan, you will have
                access to our support team.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <h6 className="mb-1 text-xl leading-7">
                4. Do I need to give my Credit/Debit Card details to start the trial
                period?
              </h6>
              <p className="text-base">
                No. The free trial lets you get comfortable with the software without
                worrying about any payments.
              </p>
            </div>
            <div>
              <h6 className="mb-1 text-xl leading-7">5. How complicated is the setup?</h6>
              <p className="text-base">
                We work hard to make our products simple to use and customise. However,
                because each customer is unique, we have a large team of professionals on
                hand to assist you.
              </p>
            </div>
            <div>
              <h6 className="mb-1 text-xl leading-7">
                6. I need help, what can I expect
              </h6>
              <p className="text-base">
                We offer a FREE, one-to-one onboarding for our customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
