import ContentBox from "./content-box";

const cloudContent = [
  {
    id: 1,
    logo: "./images/integrations/google-drive.svg",
    title: "Google Drive",
    location: "google-drive",
  },
  {
    id: 2,
    logo: "./images/integrations/drop-box.svg",
    title: "Drop Box",
    location: "drop-box",
  },
];

function Cloud() {
  return (
    <section className="container py-20 lg:py-10">
      <h5 className="text-xl lg:text-[35px]">Cloud</h5>
      <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-3 md:gap-10 lg:grid-cols-4 lg:gap-x-8 lg:gap-y-10 xl:grid-cols-5 xl:gap-x-14 xl:gap-y-16">
        {cloudContent.map((e) => {
          return <ContentBox key={e.id} {...e} />;
        })}
      </div>
    </section>
  );
}

export default Cloud;
