"use client";

import ChannelSelect2 from "../shared/channel-select-2";

type Props = {
  title: string;
  description: string;
};

export function CustomerTableToolbar({ title, description }: Props) {
  return (
    <section>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="flex items-center justify-end gap-2">
          <ChannelSelect2 />
        </div>
      </div>
    </section>
  );
}
