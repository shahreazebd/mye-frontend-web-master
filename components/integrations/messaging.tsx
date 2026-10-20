import ContentBox from "./content-box";

const messagingContent = [
  {
    id: 2,
    logo: "./images/integrations/ebay.svg",
    title: "eBay",
    location: "ebay",
  },
  {
    id: 1,
    logo: "./images/integrations/amazon.svg",
    title: "Amazon",
    location: "",
  },
];

function Messaging() {
  return (
    <section className="container pt-20">
      <h5 className="text-xl lg:text-[35px]">Messaging</h5>
      <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-3 md:gap-10 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-10 xl:grid-cols-5 xl:gap-x-14 xl:gap-y-16">
        {messagingContent.map((e) => {
          return <ContentBox key={e.id} {...e} />;
        })}
      </div>
    </section>
  );
}

export default Messaging;
