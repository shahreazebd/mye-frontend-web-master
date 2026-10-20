"use client";

import React from "react";

const integrations = [
  { id: 1, name: "Shipping" },
  { id: 2, name: "Ecommerce platforms" },
  { id: 3, name: "Marketplaces" },
  { id: 4, name: "Messaging" },
];

function ExploreIntegrations() {
  return (
    <section className="container mt-16">
      <h6 className="mb-14 text-center text-xl lg:text-[34px]">Explore integrations</h6>
      <div className="mx-auto flex flex-col justify-center gap-8 md:flex-row xl:w-8/12">
        {integrations.map((e) => {
          return (
            <div
              key={e.id}
              className="rounded-full border border-[#297FD3] px-5 py-1 text-[#3D5263] dark:text-white"
            >
              {e.name}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ExploreIntegrations;
