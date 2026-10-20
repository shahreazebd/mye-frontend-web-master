type Data = {
  key: string;
  value: string;
};

type Props = {
  data: Data[];
};

export default function ShowData(props: Props) {
  return (
    <div className="space-y-2">
      {props?.data?.map((v, i) => (
        <div className="flex items-center" key={i}>
          <div className="ml-4 w-[200px] space-y-1">
            <p className="text-sm font-semibold leading-none">{v?.key}</p>
          </div>

          <div className="font-normal">{v?.value}</div>
        </div>
      ))}
    </div>
  );
}
