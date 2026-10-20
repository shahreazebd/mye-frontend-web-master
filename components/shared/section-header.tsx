interface Props {
  title: string;
  description: string;
  className?: string;
}

export default function SectionHeader({
  title,
  description,
  className: width = "lg:w-1/3 xl:w-2/3",
}: Props) {
  return (
    <div className="text-center ">
      <h3>{title}</h3>
      <p className={`mx-auto mt-5 ${width}`}>{description}</p>
    </div>
  );
}
